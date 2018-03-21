(function () {

    'use strict';

    angular.module('app.model').factory('Cart', cart);

    cart.$inject = ['CartItem'];

    function cart(CartItem) {

        function Cart() {

        }

        Cart.prototype = {

            get id() {
                return this._id;
            },
            set id(value) {
                this._id = value;
            },
            get total() {
                return this._total;
            },
            set total(value) {
                this._total = value;
            },
            get items() {
                return this._items;
            },
            set items(value) {
                this._items = value;
            },
            get rawData() {
                return this._rawData;
            },
            set rawData(value) {
                this._rawData = value;
            }
            
        };

        Cart.build = function (source, adapter) {
            var cart = new Cart();
            if (adapter) {
                adapter.transform(cart, source);
            } else {
                angular.extend(cart, source);

                cart.items = cart.items.map(function (itemSrc) {
                    return CartItem.build(itemSrc);
                });
            }

            return cart;
        };

        return Cart;
    }

})();