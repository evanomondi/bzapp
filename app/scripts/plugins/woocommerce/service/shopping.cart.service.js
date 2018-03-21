(function () {

    'use strict';

    angular.module('app.plugin.service').factory('shoppingCartService', ShoppingCartService);

    ShoppingCartService.$inject = ['$q', 'woocommerceService', 'Cart', 'cartAdapter'];

    function ShoppingCartService($q, service, Cart, cartAdapter) {

        return {
            getCart: getCart,
            addProduct: addProduct,
            removeItem: removeItem,
            changeItem: changeItem,
            requestCheckout: requestCheckout
        };

        function getCart() {
            return service.callAuth('shopping_cart').then(function (result) {
                return Cart.build(result.data, cartAdapter);
            });
        }

        function addProduct(productId, variantId, quantity) {
            return service.callAuth('shopping_cart', 'post', {}, {
                product_id: productId,
                variation_id: variantId,
                quantity: quantity
            });
        }

        function removeItem(id) {
            return changeItem(id, 0);
        }

        function changeItem(id, quantity) {
            return service.callAuth('shopping_cart', 'put', {}, {
                item_key: id,
                quantity: quantity
            }).then(function () {
                return getCart();
            });          
        }

        function requestCheckout() {
            return $q.when(true);
        }
    }

})();