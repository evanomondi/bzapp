(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('orderTotalsAdapter', adapter);

    adapter.$inject = [];

    function adapter() {

        return {
            transform: function (destination, source) {
                destination.taxes = source.total_tax;
                destination.fees = (source.fee_lines.reduce(function (sum, fee) {
                    return math.add(sum, math.bignumber(fee.total));
                }, math.bignumber(0))).toNumber();
                destination.cartContentsTotal = (source.line_items.reduce(function (sum, item) {
                    return math.add(sum, math.bignumber(item.subtotal));                    
                }, math.bignumber(0))).toNumber();
                destination.shipping = source.shipping_total;
                destination.total = source.total;
                destination.discount = source.discount_total;
            }
        };
    }

})();