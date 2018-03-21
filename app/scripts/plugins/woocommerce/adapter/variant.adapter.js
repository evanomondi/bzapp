(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('variantAdapter', adapter);

    adapter.$inject = [];

    function adapter() {

        return {
            transform: function (destination, source) {
                destination.id = source.id;
                destination.vendor = '';
                destination.imageId = source.image.length ? source.image[0].id : '';
                destination.price = parseFloat(source.regular_price || source.price);
                destination.salePrice = parseFloat(source.sale_price);
                if (destination.salePrice !== 0 && !destination.salePrice) {
                    destination.salePrice = null;
                }
                destination.sku = source.sku;

                if (source.in_stock) {

                    destination.quantity = source.stock_quantity;

                    // in this case Woocommerce is not managing stock, so remove quantity limit
                    if (!source.stock_quantity && !source.backorders_allowed) {
                        destination.hasQuantityLimit = false;
                    }
                    // otherwise set quantity limit according to backorder policy
                    else {
                        destination.hasQuantityLimit = !source.backorders_allowed;
                    }

                } else {
                    destination.quantity = 0;
                    destination.hasQuantityLimit = true;
                }

                destination.options = {};

                source.attributes.forEach(function (attr) {
                    destination.options[attr.id] = attr.option;
                });

                destination.variantDescription = Object.keys(destination.options).map(function (optionKey) {
                    return destination.options[optionKey];
                }).join(', ');

                destination.rawData = source;
            }
        };
    }

})();