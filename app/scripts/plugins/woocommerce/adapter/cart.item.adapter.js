(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('cartItemAdapter', adapter);

    adapter.$inject = [];

    function adapter() {

        return {
            transform: function (destination, source) {
                destination.id = source.id;
                destination.productId = source.product_id;
                destination.variantId = source.variation_id;
                destination.title = source.title;
                destination.description = source.description;
                destination.price = parseFloat(source.regular_price || source.price);
                destination.salePrice = parseFloat(source.sale_price);
                if (destination.salePrice !== 0 && !destination.salePrice) {
                    destination.salePrice = null;
                }
                destination.sku = source.sku;
                destination.quantity = source.quantity;
                destination.image = source.image.length ? source.image[0].src : '';
                destination.variantDescription = source.attributes.map(function (attr) {
                    return attr.option;
                }).join(', ');
                
                if (source.categories) {
                    destination.categories = source.categories.map(function (category) {
                        return category.name;
                    });
                } else {
                    destination.categories = [];
                }

                destination.rawData = source;
            }
        };
    }

})();