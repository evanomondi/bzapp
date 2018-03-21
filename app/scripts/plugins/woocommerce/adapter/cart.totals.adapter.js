(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('cartTotalsAdapter', adapter);

    adapter.$inject = [];

    function adapter() {

        return {
            transform: function (destination, source) {
                destination.taxes = math.add(math.bignumber(source.tax), math.bignumber(source.shipping_tax)).toNumber();
                destination.shipping = source.shipping;
                destination.fees = source.fee;
                destination.cartContentsTotal = source.cart_contents_total;
                destination.discount = 0;
                destination.total = source.total;
                destination.rawData = source;
            }
        };
    }

})();