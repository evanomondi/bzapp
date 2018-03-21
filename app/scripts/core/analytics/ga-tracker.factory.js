(function () {

    'use strict';

    angular.module('app.core.analytics')
        .factory('gaTracker', gaTracker);

    gaTracker.$inject = ['$rootScope', 'AppContext', 'Analytics', 'AnalyticsEvent', 'shopManager', 'userManager'];

    function gaTracker($rootScope, AppContext, Analytics, AnalyticsEvent, shopManager, userManager) {

        watchStateChanges();

        return {
            logEvent: logEvent
        };

        function logEvent(eventName, payload) {
            try {

                var product,
                    variant,
                    quantity,
                    cart,
                    cartItem,
                    cartTotals;

                switch (eventName) {
                case AnalyticsEvent.ADD_TO_CART:
                    product = payload.product;
                    variant = payload.variant;
                    quantity = payload.quantity;

                    Analytics.addProduct(product.id, product.title, getCategoryString(product.categories), product.vendor, variant.variantDescription, product.finalPrice, quantity);
                    Analytics.trackCart('add');
                    Analytics.pageView();
                    break;
                case AnalyticsEvent.REMOVE_FROM_CART:
                    cartItem = payload.product;

                    Analytics.addProduct(cartItem.id, cartItem.title, getCategoryString(cartItem.categories), cartItem.vendor, cartItem.variantDescription, cartItem.finalPrice, cartItem.quantity);
                    Analytics.trackCart('remove');
                    Analytics.pageView();
                    break;
                case AnalyticsEvent.CHECKOUT_START:
                    cart = payload;
                    cart.items.forEach(function (cartItem) {
                        Analytics.addProduct(cartItem.productId, cartItem.title, getCategoryString(cartItem.categories), cartItem.vendor, cartItem.variantDescription, cartItem.finalPrice, cartItem.quantity);
                    });
                    Analytics.trackCheckout(1);
                    Analytics.pageView();
                    Analytics.pageView();
                    break;
                case AnalyticsEvent.CHECKOUT_SHIPPING:
                    cart = payload.cart;
                    cart.items.forEach(function (cartItem) {
                        Analytics.addProduct(cartItem.productId, cartItem.title, getCategoryString(cartItem.categories), cartItem.vendor, cartItem.variantDescription, cartItem.finalPrice, cartItem.quantity);
                    });
                    Analytics.trackCheckout(1, payload.shippingMethod.title);
                    Analytics.pageView();
                    break;
                case AnalyticsEvent.CHECKOUT_BILLING:
                    cart = payload.cart;
                    cart.items.forEach(function (cartItem) {
                        Analytics.addProduct(cartItem.productId, cartItem.title, getCategoryString(cartItem.categories), cartItem.vendor, cartItem.variantDescription, cartItem.finalPrice, cartItem.quantity);
                    });
                    Analytics.trackCheckout(2, payload.paymentMethod.title);
                    Analytics.pageView();
                    break;
                case AnalyticsEvent.PURCHASE:
                    cart = payload.cart;
                    cartTotals = payload.cartTotals;
                    cart.items.forEach(function (cartItem) {
                        Analytics.addProduct(cartItem.productId, cartItem.title, getCategoryString(cartItem.categories), cartItem.vendor, cartItem.variantDescription, cartItem.finalPrice, cartItem.quantity);
                    });
                    if (cartTotals) {
                        Analytics.trackTransaction(payload.orderId || cart.id, AppContext['APP_NAME'], cartTotals.total, cartTotals.taxes, cartTotals.shipping);
                    } else {
                        Analytics.trackTransaction(payload.orderId || cart.id, AppContext['APP_NAME'], cart.total);
                    }
                    Analytics.pageView();

                    break;
                case AnalyticsEvent.PRODUCT_VIEW:
                    product = payload;
                    Analytics.addProduct(product.id, product.title, getCategoryString(product.categories), product.vendor, '', product.finalPrice);
                    Analytics.trackDetail();
                    Analytics.pageView();
                    break;
                case AnalyticsEvent.APP_START:
                    var user = userManager.getUser();

                    Analytics.configuration.accounts[0].tracker = AppContext['TRACKERS'].ga.tracking_id;
                    Analytics.registerScriptTags();
                    Analytics.registerTrackers();           

                    Analytics.set('appName', AppContext['APP_NAME']);
                    // set location to localhost since file host prevent ecommerce analytics to be presented in GA
                    Analytics.set('location', 'https://localhost');

                    if (user) {
                        Analytics.set('&uid', user.username);
                    }
                    Analytics.set('&cu', shopManager.getShop().currency);
                    break;
                case AnalyticsEvent.REGISTER:
                    Analytics.set('&uid', payload.user.username);
                    break;
                case AnalyticsEvent.LOG_IN:
                    Analytics.set('&uid', payload.user.username);
                    break;
                case AnalyticsEvent.LOG_OUT:
                    Analytics.set('&uid', null);
                    break;
                }

            } catch (err) {
                console.log('Failed to track event: ', err);
            }
        }

        function getCategoryString(categories) {
            return (Object.prototype.toString.call(categories) === '[object Array]') ? categories.join('/') : '';
        }

        function watchStateChanges() {
            $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState) {
                if (toState !== fromState) {
                    Analytics.send('screenview', {
                        screenName: toState.name                        
                    });
                }
            });
        }
    }

})();