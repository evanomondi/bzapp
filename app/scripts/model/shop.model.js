(function () {

    'use strict';

    angular.module('app.model').factory('Shop', shop);

    function shop() {

        function Shop() {}

        Shop.prototype = {

            get currency() {
                return this._currency;
            },
            set currency(value) {
                this._currency = value;
            },
            get shippingCountries() {
                return this._shippingCountries;
            },
            set shippingCountries(value) {
                this._shippingCountries = value;
            },
            get guestCheckout() {
                return this._guestCheckout;
            },
            set guestCheckout(value) {
                this._guestCheckout = value;
            },
            get rawData() {
                return this._rawData;
            },
            set rawData(value) {
                this._rawData = value;
            }
        };

        Shop.build = function (source, adapter) {
            var shop = new Shop();
            if (adapter) {
                adapter.transform(shop, source);
            } else {
                angular.extend(shop, source);
            }

            return shop;
        };

        return Shop;
    }

})();