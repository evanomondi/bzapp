(function () {

    'use strict';

    angular.module('app.checkout').factory('summaryManager', SummaryManager);

    SummaryManager.$inject = ['$sce', 'checkoutManager', 'shoppingCartManager', '$q', '$ionicPopup', '$translate', '$state', 'analytics', 'AnalyticsEvent'];

    function SummaryManager($sce, checkoutManager, shoppingCartManager, $q, $ionicPopup, $translate, $state, analytics, AnalyticsEvent) {
        var manager = {
            viewData: {
                checkoutSession: null,
                showContent: false,
                loadingRequest: null,
                hasCart: false,
                cart: null,
                totals: null,
                checkingOut: false
            },
            init: init,
            reset: reset,
            createOrder: createOrder
        };

        function init() {
            // set checkoutSession if it's not set in this manager yet
            if (!manager.viewData.checkoutSession) {
                manager.viewData.checkoutSession = checkoutManager.getSession();
                checkoutManager.onSessionEnded().then(reset);
            }

            manager.viewData.loadingRequest = $q.all([loadCart(), getTotals()]).then(function (result) {
                manager.viewData.showContent = true;
                return result[0].items;
            });
            checkoutManager.goForward();
        }

        function getTotals() {
            return checkoutManager.getTotals().then(function (cartTotals) {
                manager.viewData.totals = cartTotals;
            });
        }

        function loadCart() {
            return shoppingCartManager.loadCart().then(function (cart) {
                return applyCart(cart);
            });
        }

        function createOrder() {
            manager.viewData.checkingOut = true;

            return checkoutManager.createOrder().then(function (orderId) {
                endSession(orderId, true, manager.viewData.checkoutSession.paymentMethod.additionalData);
            }).catch(function (error) {
                error = error || {
                    allowRetry: true
                };
                if (!error.allowRetry) {
                    endSession(error.orderId, false, $translate.instant(error.message));
                } else if (error.message) {
                    displayErrorPopup($translate.instant(error.message));
                } else {
                    displayErrorPopup($translate.instant('checkout.errors.genericBillingError'));
                }
            }).finally(function () {
                manager.viewData.checkingOut = false;
            });
        }

        function endSession(orderId, success, message) {
            var cartTotals = manager.viewData.totals;
            if (success) {
                // Track purchase
                shoppingCartManager.getCart().then(function (cart) {
                    analytics.logEvent(AnalyticsEvent.PURCHASE, {
                        cart: cart,
                        cartTotals: cartTotals,
                        orderId: orderId
                    });
                    cartTotals = null;
                });
            }

            // purge checkout session
            checkoutManager.endSession({
                orderId: orderId,
                success: success,
                message: message
            });
            // reload the cart
            shoppingCartManager.loadCart();

            $state.go('app.thankyou');
        }

        function applyCart(cart) {
            if (cart.items.length) {
                manager.viewData.hasCart = true;
                manager.viewData.cart = cart;
            } else {
                manager.viewData.hasCart = false;
                manager.viewData.cart = null;
            }

            return cart;
        }

        function reset() {
            manager.viewData.checkoutSession = null;
            manager.viewData.showContent = false;
            manager.viewData.cart = null;
            manager.viewData.totals = null;
            manager.viewData.loadingRequest = null;
            checkoutManager.goBack();
        }

        function displayErrorPopup(message) {
            message = _.unescape(message);
            $ionicPopup.alert({
                title: $translate.instant('checkout.billing.errorPopupTitle'),
                template: message
            });
        }

        return manager;

    }

})();