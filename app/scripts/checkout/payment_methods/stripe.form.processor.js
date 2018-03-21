(function () {

    'use strict';

    angular.module('app.checkout').factory('stripeFormProcessor', method);

    method.$inject = ['$q', '$timeout', 'angularLoad', 'AppContext'];

    function method($q, $timeout, angularLoad, AppContext) {

        var stripeReady = false,
            stripe = stripeAsPromise();

        var processor = {
            process: process
        };

        return processor;

        function process(formData, session) {
            var paymentData = {
                number: formData.cardNumber,
                exp: formData.validThru,
                name: formData.cardHolderName,
                address_line1: session.billingAddress.address1,
                address_line2: session.billingAddress.address2,
                address_city: session.billingAddress.city,
                address_zip: session.billingAddress.postcode,
                address_state: session.billingAddress.state,
                address_country: session.billingAddress.country

            };
            return stripe.card.createToken(paymentData).then(function (result) {
                return {
                    'stripe_token': result.id
                };
            });
        }

        function loadStripe() {
            if (stripeReady) {
                return $q.resolve();
            } else {
                return angularLoad.loadScript('https://js.stripe.com/v2/').then(function () {
                    Stripe.setPublishableKey(AppContext['STRIPE_KEY']);
                    stripeReady = true;
                });
            }
        }

        function stripeAsPromise() {
            return {
                card: {
                    createToken: promisifyStripeMethod('Stripe.card.createToken'),
                    validateCardNumber: promisifyStripeHelper('Stripe.card.validateCardNumber'),
                    validateExpiry: promisifyStripeHelper('Stripe.card.validateExpiry'),
                    validateCVC: promisifyStripeHelper('Stripe.card.validateCVC'),
                    cardType: promisifyStripeHelper('Stripe.card.cardType')
                }
            };
        }

        function promisifyStripeMethod(stripeMethodPath) {
            return promisifyStripe(stripeMethodPath, true);
        }

        function promisifyStripeHelper(stripeHelperPath) {
            return promisifyStripe(stripeHelperPath, false);
        }

        function promisifyStripe(stripeMethodPath, hasCallback) {
            return function promisified() {
                var deferred = $q.defer(),
                    // convert arguments to array
                    args = Array.prototype.slice.call(arguments),
                    originalMethod;

                loadStripe().then(function () {
                    if (hasCallback) {
                        args.push(function (status, response) {
                            $timeout(function () {
                                if (response.error) {
                                    deferred.reject(response.error);
                                } else {
                                    deferred.resolve(response);
                                }
                            });
                        });
                    }
                    originalMethod = resolveMethodByPath(stripeMethodPath);
                    if (originalMethod && typeof originalMethod === 'function') {
                        if (!hasCallback) {
                            deferred.resolve(originalMethod.apply(Stripe, args));
                        } else {
                            originalMethod.apply(Stripe, args);
                        }
                    } else {
                        deferred.reject('Stripe method not found');
                    }

                }).catch(function () {
                    deferred.reject('Stripe is not available');
                });

                return deferred.promise;
            };
        }

        function resolveMethodByPath(stripeMethodPath) {
            var pathArray = stripeMethodPath.split('.'),
                currentNode = window[pathArray.shift()];

            while (pathArray.length && currentNode) {
                currentNode = currentNode[pathArray.shift()];
            }

            return currentNode;
        }
    }

})();