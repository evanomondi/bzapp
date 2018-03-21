(function () {

    'use strict';

    angular.module('app.model').factory('Order', order);

    order.$inject = ['CartItem', 'CartTotals'];

    function order(CartItem, CartTotals) {

        function Order() {}

        Order.prototype = {

            get id() {
                return this._id;
            },
            set id(value) {
                this._id = value;
            },
            get status() {
                return this._status;
            },
            set status(value) {
                this._status = value;
            },
            get shippingMethodName() {
                return this._shippingMethodName;
            },
            set shippingMethodName(value) {
                this._shippingMethodName = value;
            },
            get paymentMethodName() {
                return this._paymentMethodName;
            },
            set paymentMethodName(value) {
                this._paymentMethodName = value;
            },
            get createdAt() {
                return this._createdAt;
            },
            set createdAt(value) {
                this._createdAt = value;
            },
            get updatedAt() {
                return this._updatedAt;
            },
            set updatedAt(value) {
                this._updatedAt = value;
            },
            get note() {
                return this._note;
            },
            set note(value) {
                this._note = value;
            },
            get items() {
                return this._items;
            },
            set items(value) {
                this._items = value;
            },
            get totals() {
                return this._totals;
            },
            set totals(value) {
                this._totals = value;
            },
            get rawData() {
                return this._rawData;
            },
            set rawData(value) {
                this._rawData = value;
            }
        };

        Order.build = function (source, adapter) {
            var order = new Order();
            if (adapter) {
                adapter.transform(order, source);
            } else {
                angular.extend(order, source);

                order.items = order.items.map(function (item) {
                    return CartItem.build(item);
                });

                order.totals = CartTotals.build(order.totals);
            }

            return order;
        };

        return Order;
    }

})();