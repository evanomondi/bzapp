(function () {
    'use strict';

    angular.module('app.checkout').factory('shippingManager', shippingManager);

    shippingManager.$inject = [
        '$q',
        '$translate',
        '$state',
        'woocommerceService',
        'shopManager',
        'checkoutManager',
        'shippingService',
        'shoppingCartManager',
        'CountryStateMap',
        'Address',
        'userManager',
        'eventBus',
        'AuthEvent',
        'authErrorHandler',
        'analytics',
        'AnalyticsEvent'
    ];

    function shippingManager(
        $q,
        $translate,
        $state,
        service,
        shopManager,
        checkoutManager,
        shippingService,
        shoppingCartManager,
        CountryStateMap,
        Address,
        userManager,
        eventBus,
        AuthEvent,
        authErrorHandler,
        analytics,
        AnalyticsEvent
    ) {
        var manager = {
                viewData: {
                    checkoutSession: null,
                    countries: [],
                    shippingMethods: [],
                    methodLoader: null,
                    methodErrorMessage: $translate.instant('checkout.shipping.method.errorMessage'),
                    methodEmptyMessage: $translate.instant('checkout.shipping.method.emptyMessage'),
                    currency: shopManager.getShop().currency,
                    total: 0,
                    showContent: false,
                    hasEnoughInfoForShipping: false
                },
                init: init,
                reset: reset,
                addressChanged: addressChanged,
                hasEnoughInfoForShipping: hasEnoughInfoForShipping,
                selectShippingMethod: selectShippingMethod,
                getSelectedShippingMethod: getSelectedShippingMethod,
                navigateToBilling: navigateToBilling
            },
            checkoutSession,
            deregister;

        buildCountries();

        function init() {
            var user = userManager.getUser(),
                userShippingAddress = user && user.shippingAddress;
            // reaquire session from manager if one is not present
            if (!checkoutSession) {
                checkoutSession = manager.viewData.checkoutSession = checkoutManager.getSession();
                checkoutManager.onSessionEnded().then(resetViewData);
            }

            // if user is present, reset shipping address from profile
            if (userShippingAddress) {
                checkoutSession.shippingAddress = userShippingAddress.clone();
            } else {
                // if user is not present, set empty address if address has not been set in session
                if (!checkoutSession.shippingAddress) {
                    // get address from user's profile
                    checkoutSession.shippingAddress = Address.build();
                }
            }

            updateTotal();

            deregister = eventBus.on(AuthEvent.USER_LOGGED_IN, userLoggedIn);

            checkoutManager.goForward();
            manager.viewData.showContent = true;
        }

        function resetViewData() {
            var viewData = manager.viewData;
            viewData.shippingMethods = [];
            viewData.methodLoader = null;
            viewData.total = 0;
            manager.viewData.checkoutSession = checkoutSession = null;
            manager.viewData.showContent = false;
            deregister();
        }

        function reset() {
            checkoutManager.goBack();
            checkoutManager.endSession();
        }

        function buildCountries() {
            manager.viewData.countries = shopManager.getShop().shippingCountries;
        }

        function userLoggedIn(user) {
            var userShippingAddress = user.shippingAddress;
            if (userShippingAddress) {
                checkoutSession.shippingAddress = userShippingAddress.clone();
            }
            addressChanged();
        }

        function addressChanged() {

            if (hasEnoughInfoForShipping()) {
                getShippingMethods();
            } else {
                // if user has not entered enough information on the shipping address form,
                // clear any shipping method presented
                checkoutSession.shippingMethod = null;
                manager.viewData.shippingMethods.length = 0;
            }
        }

        function getShippingMethods() {
            manager.viewData.shippingMethods.length = 0;
            manager.viewData.methodLoader = shippingService.getShippingMethods(checkoutSession).then(function (methods) {
                if (methods.length) {
                    applyShippingMehods(methods);
                }
                return methods;
            }).catch(authErrorHandler);
        }

        function applyShippingMehods(methods) {
            var selectedMethod = getSelectedShippingMethod(),
                // why not use the same selected method object? because the new shipping method with the same id can have a different cost
                selectedMethodInNewMethods = selectedMethod && findMethodById(methods, selectedMethod.id);

            methods.sort(methodSort);
            // if currently selected method is not present within new methods
            // select the cheapest one
            if (!selectedMethodInNewMethods) {
                selectShippingMethod(methods[0]);
            }
            // the selected method is within new methods, make sure we select it
            else {
                selectShippingMethod(selectedMethodInNewMethods);
            }

            manager.viewData.shippingMethods = methods;
        }

        function findMethodById(methods, id) {
            var foundMethods = methods.filter(function (method) {
                return method.id === id;
            });

            return foundMethods.length ? foundMethods[0] : null;
        }

        function methodSort(methodA, methodB) {
            if (methodA.cost > methodB.cost) {
                return 1;
            } else if (methodA.cost < methodB.cost) {
                return -1;
            } else {
                return 0;
            }
        }

        function selectShippingMethod(method) {
            shippingService.selectShippingMethod(method.id).then(function () {
                updateTotal();
            }).catch(authErrorHandler);

            checkoutSession.shippingMethod = method;
        }

        function hasEnoughInfoForShipping() {
            var address = checkoutSession.shippingAddress;
            manager.viewData.hasEnoughInfoForShipping =
                address.country && address.postcode &&
                address.city && (!countryHasStates(address.country) || address.state);

            return manager.viewData.hasEnoughInfoForShipping;
        }

        function getSelectedShippingMethod() {
            return checkoutSession.shippingMethod;
        }

        function navigateToBilling() {
            // Checkout shipping step
            shoppingCartManager.getCart().then(function (cart) {
                analytics.logEvent(AnalyticsEvent.CHECKOUT_SHIPPING, {
                    cart: cart,
                    shippingMethod: getSelectedShippingMethod()
                });
            });

            $state.go('app.billing');
        }

        function updateTotal() {
            checkoutManager.getTotals().then(function (cartTotals) {
                manager.viewData.total = cartTotals.total;
            });
        }

        function countryHasStates(country) {
            var states = CountryStateMap[country];

            return states && states.length;
        }

        return manager;
    }

})();