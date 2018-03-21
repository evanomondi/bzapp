(function () {

    'use strict';

    angular.module('app.plugin.service').factory('checkoutService', checkoutService);

    checkoutService.$inject = ['$q', '$http', '$timeout', '$localStorage', '$httpParamSerializerJQLike', 'woocommerceService', 'shoppingCartService', 'CartTotals', 'cartTotalsAdapter', 'AppContext', 'PluginContext'];

    function checkoutService($q, $http, $timeout, $localStorage, $httpParamSerializerJQLike, service, shoppingCartService, CartTotals, cartTotalsAdapter, AppContext, PluginContext) {

        var paymentReceivedURL = AppContext.SHOP.rawData['order_received_url'];

        return {
            getTotals: getTotals,
            createOrder: createOrder
        };

        function getTotals(checkoutSession) {
            /* jshint unused: false */
            return service.callAuth('shopping_cart').then(function (result) {
                return CartTotals.build(result.data, cartTotalsAdapter);
            });
        }

        function createOrder(checkoutSession) {
            if (checkoutSession.paymentMethod) {

                var headers = {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    params = {
                        'billing_first_name': checkoutSession.billingAddress.firstName,
                        'billing_last_name': checkoutSession.billingAddress.lastName,
                        'billing_company': '',
                        'billing_email': checkoutSession.billingAddress.email,
                        'billing_phone': checkoutSession.billingAddress.phone,
                        'billing_country': checkoutSession.billingAddress.country,
                        'billing_address_1': checkoutSession.billingAddress.address1,
                        'billing_address_2': checkoutSession.billingAddress.address2,
                        'billing_city': checkoutSession.billingAddress.city,
                        'billing_state': checkoutSession.billingAddress.state || checkoutSession.billingAddress.city,
                        'billing_postcode': checkoutSession.billingAddress.postcode,
                        'ship_to_different_address': 1,
                        'shipping_first_name': checkoutSession.shippingAddress.firstName,
                        'shipping_last_name': checkoutSession.shippingAddress.lastName,
                        'shipping_company': '',
                        'shipping_email': checkoutSession.shippingAddress.email,
                        'shipping_phone': checkoutSession.shippingAddress.phone,
                        'shipping_country': checkoutSession.shippingAddress.country,
                        'shipping_address_1': checkoutSession.shippingAddress.address1,
                        'shipping_address_2': checkoutSession.shippingAddress.address2,
                        'shipping_city': checkoutSession.shippingAddress.city,
                        'shipping_state': checkoutSession.shippingAddress.state || checkoutSession.shippingAddress.city,
                        'shipping_postcode': checkoutSession.shippingAddress.postcode,
                        'shipping_method[0]': checkoutSession.shippingMethod.id,
                        'payment_method': checkoutSession.paymentMethod.id,
                        '_wp_http_referer': '/checkout/?wc-ajax=update_order_review'
                    };

                angular.extend(params, checkoutSession.paymentData);

                return service.callAuth('order/process', 'post', {
                        'wc-ajax': true
                    },
                    $httpParamSerializerJQLike(params),
                    headers
                ).then(function (result) {

                    var data = result.data;

                    if (data.result === 'failure') {
                        return handleOrderProcessingError(data);
                    } else {
                        // open window
                        return handleCheckoutRedirection(data.redirect, data.order_id);
                    }
                }).catch(function (err) {
                    if (!err || !err.hasOwnProperty('allowRetry')) {
                        return $q.reject({
                            orderId: null,
                            allowRetry: true
                        });
                    } else {
                        return $q.reject(err);
                    }
                });
            } else {
                return $q.reject({
                    orderId: null,
                    allowRetry: true
                });
            }
        }

        function handleCheckoutRedirection(url, orderId) {
            var deferred = $q.defer();

            if (window.cordova && window.cordova.InAppBrowser) {
                var ref = cordova.InAppBrowser.open(url, '_blank', 'location=no,hidden=yes,toolbar=no');

                ref.addEventListener('loadstop', onLoadStop);
                ref.addEventListener('exit', onExit);
            } else {
                deferred.reject({
                    orderId: orderId,
                    message: 'error.deviceRequired',
                    allowRetry: true
                });
            }

            return deferred.promise;

            function onLoadStop(e) {
                var url = e.url;
                // close the window if WC payment received page was loaded 
                if (url.indexOf(paymentReceivedURL) !== -1) {
                    removeListeners();
                    ref.close();

                    clearShoppingCart().finally(function () {
                        deferred.resolve(orderId);
                    });
                }
                // when landing on any other WC page 
                else if (url.indexOf(PluginContext['API_HOST']) !== -1) {

                    // check if the order has been canceled
                    checkIfCanceled(url, orderId).then(function () {
                        exitWithCancelation();
                    }, function () {
                        exitWithInterruption();
                    });

                } else {
                    // show hidden window if we were navigated to a page different from WC
                    // assuming this is the page provided by the payment gateway page
                    ref.show();
                }
            }

            function onExit() {
                removeListeners();
                exitWithInterruption();
            }

            function exitWithInterruption() {
                removeListeners();
                ref.close();
                deferred.reject({
                    orderId: orderId,
                    message: 'checkout.errors.paymentInterrupted',
                    allowRetry: true
                });
            }

            function exitWithCancelation() {
                removeListeners();
                ref.close();
                return $q.all([clearShoppingCart(), cancelOrder(orderId)]).finally(function () {
                    deferred.reject({
                        orderId: orderId,
                        message: 'checkout.errors.paymentCanceled',
                        allowRetry: false
                    });
                });
            }

            function removeListeners() {
                ref.removeEventListener('loadstop', onLoadStop);
                ref.removeEventListener('exit', onExit);
            }
        }

        function checkIfCanceled(url, orderId) {
            if (url.indexOf('cancel_order') !== -1 && url.indexOf('order_id=' + orderId) !== -1) {
                return $q.resolve();
            } else {
                return $q.reject();
            }
        }

        function cancelOrder(orderId) {
            return service.callAuth('order/' + orderId, 'delete').then(function (result) {
                if (!result.data.canceled) {
                    return $q.reject();
                }
            });
        }

        function clearShoppingCart() {
            return service.callAuth('shopping_cart', 'delete');
        }

        function handleOrderProcessingError(err) {
            if (err && err.messages) {
                return $q.reject({
                    orderId: null,
                    message: err.messages,
                    allowRetry: true
                });
            } else {
                return $q.reject();
            }
        }
    }


})();