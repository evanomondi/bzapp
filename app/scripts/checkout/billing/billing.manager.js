(function () {
    'use strict';

    angular.module('app.checkout').factory('billingManager', billingManager);

    billingManager.$inject = [
        '$q',
        '$injector',
        'billingService',
        'shopManager',
        'checkoutManager',
        'shoppingCartManager',
        'Address',
        '$state',
        '$ionicPopup',
        '$translate',
        'userManager',
        'authErrorHandler',
        'analytics',
        'AnalyticsEvent'
    ];

    function billingManager(
        $q,
        $injector,
        billingService,
        shopManager,
        checkoutManager,
        shoppingCartManager,
        Address,
        $state,
        $ionicPopup,
        $translate,
        userManager,
        authErrorHandler,
        analytics,
        AnalyticsEvent
    ) {
        var manager = {
                viewData: {
                    checkoutSession: null,
                    paymentMethods: null,
                    payment: null,
                    hasCCForm: false,
                    countries: [],
                    currency: shopManager.getShop().currency,
                    total: 0,
                    showContent: false,
                    useShippingAddressForBilling: true,
                    isProcessing: false
                },
                init: init,
                reset: reset,
                selectPaymentMethod: selectPaymentMethod,
                addressChanged: addressChanged,
                onBillingAddressToggled: onBillingAddressToggled,
                processBilling: processBilling
            },
            checkoutSession,
            billingAddress;

        buildCountries();

        function init() {
            var user = userManager.getUser();

            // reaquire session from manager if one is not present
            if (!checkoutSession) {
                checkoutSession = manager.viewData.checkoutSession = checkoutManager.getSession();
                checkoutManager.onSessionEnded().then(resetViewData);
            }

            // when billing address has not been initialized, create an empty address
            if (!checkoutSession.billingAddress) {
                // if shipping address should be used for billing and shipping address is present in the checkout session,
                // point billing address to billing address
                if (manager.viewData.useShippingAddressForBilling && checkoutSession.shippingAddress) {
                    checkoutSession.billingAddress = checkoutSession.shippingAddress;
                }
                // otherwise create a new empty address for billing
                else {
                    if (user) {
                        checkoutSession.billingAddress = billingAddress = user.billingAddress.clone();
                    } else {
                        checkoutSession.billingAddress = billingAddress = Address.build();
                    }
                }
            }

            // get payment methods options
            manager.viewData.paymentMethods = checkoutSession.paymentMethods;

            // select the first payment method available by default
            if (checkoutSession.paymentMethods.length) {
                selectPaymentMethod(manager.viewData.paymentMethods[0]);
                manager.viewData.payment = {};
            }


            setBillingAddress();
            checkoutManager.goForward();
            manager.viewData.showContent = true;
        }

        function resetViewData() {
            var viewData = manager.viewData;
            viewData.useShippingAddressForBilling = true;
            viewData.total = 0;
            manager.viewData.checkoutSession = checkoutSession = null;
            manager.viewData.showContent = false;
        }

        function reset() {
            checkoutManager.goBack();
            manager.viewData.showContent = false;
        }

        function selectPaymentMethod(method) {
            checkoutSession.paymentMethod = method;
            // toggle CC form
            manager.viewData.hasCCForm = method.tokenizable;
        }

        function addressChanged() {
            setBillingAddress();
        }

        function onBillingAddressToggled() {
            var user = userManager.getUser(),
                billingAddressSource;

            if (manager.viewData.useShippingAddressForBilling) {
                // reset billing address back to shipping
                checkoutSession.billingAddress = checkoutSession.shippingAddress;
                // send billing address to the backend, 
                // when toggling off this is not required since in that case addressChanged will be triggered
                setBillingAddress();
            } else {
                if (user && user.billingAddress) {
                    billingAddressSource = user.billingAddress;
                } else {
                    billingAddressSource = checkoutSession.shippingAddress;
                }

                // local billingAddress variable which stores billing address diffrerent from the shipping one
                if (!billingAddress) {
                    billingAddress = billingAddressSource.clone();
                } else {
                    angular.extend(billingAddress, billingAddressSource);
                }

                checkoutSession.billingAddress = billingAddress;
            }
        }

        function processBilling() {
            if (!manager.viewData.isProcessing) {
                manager.viewData.payment.validThru = manager.viewData.payment.validThruMonth + ' ' + manager.viewData.payment.validThruYear;

                manager.viewData.isProcessing = true;

                processPaymentForm().then(function () {
                    // Checkout billing step
                    shoppingCartManager.getCart().then(function (cart) {
                        analytics.logEvent(AnalyticsEvent.CHECKOUT_BILLING, {
                            cart: cart,
                            paymentMethod: checkoutSession.paymentMethod
                        });
                    });
                    $state.go('app.summary');
                }).catch(function (error) {
                    if (error.message) {
                        displayErrorPopup(error.message);
                    } else {
                        displayErrorPopup($translate.instant('checkout.errors.genericBillingError'));
                    }
                }).finally(function () {
                    manager.viewData.isProcessing = false;
                });
            }
        }

        function processPaymentForm() {
            var formProcessor;
            try {
                formProcessor = $injector.get(checkoutSession.paymentMethod.id + 'FormProcessor');
            } catch (err) {
                formProcessor = null;
            }

            if (formProcessor) {
                return formProcessor.process(manager.viewData.payment, checkoutSession).then(function (data) {
                    //  clear payment form to purge any sensitive data
                    manager.viewData.payment = {};
                    checkoutSession.paymentData = data;
                });
            } else {
                return $q.resolve({});
            }
        }

        function setBillingAddress() {
            billingService.setBillingAddress(checkoutSession.billingAddress).then(function () {
                updateTotal();
            }).catch(authErrorHandler);
        }

        function buildCountries() {
            //TODO: Change this to billing countries (not shipping ones)
            manager.viewData.countries = shopManager.getShop().shippingCountries;
        }

        function updateTotal() {
            checkoutManager.getTotals().then(function (cartTotals) {
                manager.viewData.total = cartTotals.total;
            });
        }

        function displayErrorPopup(message) {
            $ionicPopup.alert({
                title: $translate.instant('checkout.billing.errorPopupTitle'),
                template: message
            });
        }

        return manager;
    }

})();