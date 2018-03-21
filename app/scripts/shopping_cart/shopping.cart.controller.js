(function () {

    'use strict';

    angular.module('app.shopping_cart').controller('ShoppingCartController', ShoppingCartController);

    ShoppingCartController.$inject = [
        '$scope',
        '$translate',
        '$q',
        '$stateParams',
        '$state',
        '$timeout',
        'shoppingCartManager',
        'shopManager',
        'userManager',
        'eventBus',
        'AuthEvent',
        'PluginContext'
    ];

    function ShoppingCartController(
        $scope,
        $translate,
        $q,
        $stateParams,
        $state,
        $timeout,
        shoppingCartManager,
        shopManager,
        userManager,
        eventBus,
        AuthEvent,
        PluginContext) {

        var vm = this;

        // properties
        vm.items = [];
        vm.cartLoading = false;
        vm.updatingItemId = null;
        vm.deletingItemId = null;
        vm.showSpinner = false;
        vm.checkingOut = false;
        vm.hasCart = false;
        vm.emptyCartMessage = $translate.instant('cart.noProducts');
        vm.currency = shopManager.getShop().currency;

        // methods
        vm.incrementItem = incrementItem;
        vm.decrementItem = decrementItem;
        vm.removeItem = removeItem;
        vm.gotoCheckout = gotoCheckout;

        $scope.$on('$ionicView.afterEnter', function () {
            vm.cartRequest = loadCart();
        });

        function loadCart() {
            vm.showSpinner = true;
            return shoppingCartManager.loadCart().then(function (cart) {
                return applyCart(cart);
            }).finally(function () {
                vm.showSpinner = false;
            });
        }

        function incrementItem(item) {
            var timeout = $timeout(function () {
                vm.updatingItemId = item.id;
            }, 500);

            shoppingCartManager.changeItem(item.id, item.quantity + 1).then(function (cart) {
                applyCart(cart);
            }).finally(function () {
                if (vm.updatingItemId) {
                    $timeout(function () {
                        vm.updatingItemId = null;
                    }, 1000);
                } else {
                    $timeout.cancel(timeout);
                }
            });
        }

        function decrementItem(item) {
            var timeout = $timeout(function () {
                vm.updatingItemId = item.id;
            }, 500);

            shoppingCartManager.changeItem(item.id, item.quantity - 1).then(function (cart) {
                applyCart(cart);
            }).finally(function () {
                if (vm.updatingItemId) {
                    $timeout(function () {
                        vm.updatingItemId = null;
                    }, 1000);
                } else {
                    $timeout.cancel(timeout);
                }
            });
        }

        function removeItem(item) {
            if (!vm.deletingItemId) {
                vm.deletingItemId = item.id;
                shoppingCartManager.removeItem(item).then(function (cart) {                    
                    applyCart(cart);
                }).finally(function () {
                    vm.deletingItemId = null;
                });
            }
        }

        function gotoCheckout() {
            var checkoutPromise;

            vm.checkingOut = true;

            if (PluginContext['CAPABILITIES'].inAppCheckout) {
                checkoutPromise = shoppingCartManager.startInAppCheckout();
                
            } else {
                checkoutPromise = doExternalCheckout();
            }

            checkoutPromise.finally(function () {
                vm.checkingOut = false;
            });
        }        

        /**
         * Perform external checkout, not involving application shipping/billing pages 
         * @return Promise
         */
        function doExternalCheckout() {
            return shoppingCartManager.startExternalCheckout().then(function (cart) {
                applyCart(cart);
            });
        }

        function applyCart(cart) {
            if (cart && cart.id && cart.items.length) {
                vm.hasCart = true;
                vm.items = cart.items;
                vm.total = cart.total;
                vm.checkoutProcess = cart.checkoutProcess;
            } else {
                vm.hasCart = false;
                vm.items.length = 0;
                vm.cartRequest = vm.items;
            }

            return vm.items;
        }
    }

})();