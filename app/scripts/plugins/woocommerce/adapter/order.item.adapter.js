(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('orderItemAdapter', adapter);

    adapter.$inject = [];

    function adapter() {

        return {
            transform: function (destination, source) {
                destination.id = source.id;
                destination.title = source.name;
                destination.productId = source.product_id;
                destination.variantId = source.variation_id;
                destination.quantity = source.quantity;
                destination.price = source.subtotal;
                destination.salePrice = null;
                destination.image = (source.image && source.image.length) ? source.image[0].src : '';
                destination.sku = source.sku;
            }
        };
    }

})();