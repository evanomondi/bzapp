(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('cartAdapter', adapter);

    adapter.$inject = ['CartItem', 'cartItemAdapter'];

    function adapter(CartItem, cartItemAdapter) {

        return {
            transform: function (destination, source) {
                destination.id = 'wooCart';
                destination.total = source.cart_contents_total;                
                destination.rawData = source;

                destination.items = source.items.map(function (cartItem) { 
                    return CartItem.build(cartItem, cartItemAdapter);
                });   
            }
        };       
    }

})();