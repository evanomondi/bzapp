(function () {

    'use strict';

    angular.module('app.shopping_cart').factory('shoppingCartManager', ShoppingCartMananger);

    ShoppingCartMananger.$inject = [
        '$q',
        '$translate',
        '$state',
        'userManager',
        'shopManager',
        'shoppingCartService',
        'connectivity',
        'AppContext',
        'eventBus',
        'AuthEvent',
        'authErrorHandler',
        'analytics',
        'AnalyticsEvent',
        'ErrorCodes'
    ];

    function ShoppingCartMananger(
        $q,
        $translate,
        $state,
        userManager,
        shopManager,
        shoppingCartService,
        connectivity,
        AppContext,
        eventBus,
        AuthEvent,
        authErrorHandler,
        analytics,
        AnalyticsEvent,
        ErrorCodes) {

        var cart = null,
            cartLoaderPromise,
            manager = {
                getCart: getCart,
                loadCart: handleInvalidation(loadCart),
                addProduct: handleInvalidation(addProduct),
                removeItem: handleInvalidation(removeItem),
                changeItem: handleInvalidation(changeItem),
                startInAppCheckout: startInAppCheckout,
                startExternalCheckout: handleInvalidation(startExternalCheckout),
                getCartQuantity: getCartQuantity
            };

        // refresh shopping cart after login
        eventBus.on(AuthEvent.USER_LOGGED_IN, function () {
            loadCart();
        });

        return manager;

        function getCart() {
            if (cartLoaderPromise) {
                return cartLoaderPromise;
            } else if (!cart) {
                cartLoaderPromise = loadCart();
                return cartLoaderPromise;
            } else {
                return $q.when(cart);
            }
        }

        function loadCart() {
            return shoppingCartService.getCart().then(receiveNewCart);
        }

        function addProduct(product, variant, quantity) {
            return shoppingCartService.addProduct(product.id, variant.id, quantity)
                .then(loadCart)
                .then(function (cart) {
                    analytics.logEvent(AnalyticsEvent.ADD_TO_CART, {
                        product: product,
                        variant: variant,
                        quantity: quantity
                    });

                    return cart;
                })
                .catch(handleError);

        }

        function removeItem(cartItem) {
            return shoppingCartService.removeItem(cartItem.id).then(function (newCart) {
                    analytics.logEvent(AnalyticsEvent.REMOVE_FROM_CART, {
                        product: cartItem
                    });

                    return receiveNewCart(newCart);
                })
                .catch(handleError);
        }

        function changeItem(id, quantity) {
            return shoppingCartService.changeItem(id, quantity).then(receiveNewCart, handleError);
        }

        function startInAppCheckout() {
            if (shopManager.getShop().guestCheckout) {
                return reloadUser().finally(function () {
                    analytics.logEvent(AnalyticsEvent.CHECKOUT_START, cart);
                    $state.go('app.shipping');
                });
            } else {
                return reloadUser().then(function () {
                    analytics.logEvent(AnalyticsEvent.CHECKOUT_START, cart);
                    $state.go('app.shipping');
                }, function () {
                    loginBeforeCheckout();
                });
            }
        }

        function startExternalCheckout() {
            var oldCart = cart;
            analytics.logEvent(AnalyticsEvent.CHECKOUT_START, oldCart);
            return shoppingCartService.requestCheckout()
                .then(function (newCart) {
                    // when cart item count is 0, most likely user made a purchase
                    // this is heuristic logic, it's better to replace it with something more reliable in future
                    if (newCart && !newCart.items.length) {
                        analytics.logEvent(AnalyticsEvent.PURCHASE, {
                            orderId: oldCart.id,
                            cart: oldCart
                        });
                    }
                    oldCart = null;
                    return newCart;
                })
                .then(receiveNewCart, handleError);
        }

        /**
         * Display auth modal and force the user to sign in before proceeding to checkout
         * 
         */
        function loginBeforeCheckout() {
            var deregisterModal,
                deregisterUserLoggedIn;

            userManager.openAuth();

            deregisterModal = eventBus.on(AuthEvent.AUTH_MODAL_HIDDEN, function () {
                deregisterModal();
                deregisterUserLoggedIn();
            });

            deregisterUserLoggedIn = eventBus.on(AuthEvent.USER_LOGGED_IN, function () {
                $state.go('app.shipping');
            });
        }

        /**
         * Attempt to load user profile
         * @return Promise
         */
        function reloadUser() {
            return userManager.loadUser();
        }

        function receiveNewCart(newCart) {
            if (!cart) {
                cart = newCart;
                cartLoaderPromise = null;
            } else {
                angular.extend(cart, newCart);
            }

            return cart;
        }

        function getCartQuantity() {
            if (cart) {
                return AppContext.CART_BADGE === 'distinct_item_count' ? cart.items.length : calculateCartQuantity(cart.items);
            }
        }

        function calculateCartQuantity(items) {
            var count = 0;
            items.forEach(function (item) {
                count += item.quantity;
            });

            return count;
        }

        function handleError(err) {
            if (err !== ErrorCodes.INVALID_SESSION) {
                connectivity.showError($translate.instant('error.operationError'));
                return $q.reject(err);
            } else {
                // suppress invalid session error, we don't want to disturb user with errors in this case
                return cart;
            }

        }

        /**
         *
         * Wraps service calls and returns a version of the service call which is handled by authErrorHandler
         * 
         */

        function handleInvalidation(func) {
            if (typeof func === 'function') {
                return function () {
                    var args = Array.prototype.slice.call(arguments);
                    return func.apply(window, args).catch(authErrorHandler);
                };
            }
        }
    }

})();