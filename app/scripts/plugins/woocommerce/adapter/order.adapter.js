(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('orderAdapter', adapter);

    adapter.$inject = ['CartItem', 'CartTotals', 'orderItemAdapter', 'orderTotalsAdapter'];

    function adapter(CartItem, CartTotals, orderItemAdapter, orderTotalsAdapter) {

        return {
            transform: function (destination, source) {                
                destination.id = source.id;
                destination.status = source.status;
                destination.shippingMethodName = source.shipping_lines[0].method_title;
                destination.paymentMethodName = source.payment_method_title;
                destination.createdAt = toLocalDate(new Date(source.date_created));
                destination.updatedAt = toLocalDate(new Date(source.date_modified));
                destination.note = source.customer_note;

                destination.items = source.line_items.map(function (item) {
                    return CartItem.build(item, orderItemAdapter);
                });
                destination.totals = CartTotals.build(source, orderTotalsAdapter);
            }
        };

        function toLocalDate(serverDate) {
            var serverTimeInMs = serverDate.getTime(),
                userOffsetInMs = new Date().getTimezoneOffset() * 60 * 1000;

            return new Date(serverTimeInMs - userOffsetInMs);
        }
    }

})();