(function () {

    'use strict';

    angular.module('app.model').factory('CartItem', cartItem);

    function cartItem() {

        function CartItem() {

        }

        CartItem.prototype = {

            get id() {
                return this._id;
            },
            set id(value) {
                this._id = value;
            },
            get productId() {
                return this._productId;
            },
            set productId(value) {
                this._productId = value;
            },
            get variantId() {
                return this._variantId;
            },
            set variantId(value) {
                this._variantId = value;
            },
            get title() {
                return this._title;
            },
            set title(value) {
                this._title = value;
            },
            get description() {
                return this._description;
            },
            set description(value) {
                this._description = value;
            },
            get price() {
                return this._price;
            },
            set price(value) {
                this._price = value;
            },
            get salePrice() {
                return this._salePrice;
            },
            set salePrice(value) {
                this._salePrice = value;
            },
            get finalPrice() {
            	return this.salePrice || this.price;
            },
            get sku() {
                return this._sku;
            },
            set sku(value) {
                this._sku = value;
            },
            get vendor() {
                return this._vendor;
            },
            set vendor(value) {
                this._vendor = value;
            },
            get quantity() {
                return this._quantity;
            },
            set quantity(value) {
                this._quantity = value;
            },
            get image() {
                return this._image;
            },
            set image(value) {
                this._image = value;
            },
            get variantDescription() {
                return this._variantDescription;
            },
            set variantDescription(value) {
                this._variantDescription = value;
            },
            get categories() {
                return this._categories;
            },
            set categories(value) {
                this._categories = value;
            },
            get rawData() {
                return this._rawData;
            },
            set rawData(value) {
                this._rawData = value;
            }
        };

        CartItem.build = function (source, adapter) {
            var cartItem = new CartItem();
            if (adapter) {
                adapter.transform(cartItem, source);
            } else {
                angular.extend(cartItem, source);
            }

            return cartItem;
        };

        return CartItem;
    }

})();