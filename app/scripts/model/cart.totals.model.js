(function () {

    'use strict';

    angular.module('app.model').factory('CartTotals', cartTotals);    

    function cartTotals() {

        function CartTotals() {

        }

        CartTotals.prototype = {

            get taxes() {
                return this._taxes;
            },
            set taxes(value) {
                this._taxes = value;
            },  
            get fees() {
                return this._fees;
            },
            set fees(value) {
                this._fees = value;
            },         
            get shipping() {
                return this._shipping;
            },
            set shipping(value) {
                this._shipping = value;
            },
            get cartContentsTotal() {
                return this._cartContentsTotal;
            },
            set cartContentsTotal(value) {
                this._cartContentsTotal = value;
            },
            get total() {
                return this._total;
            },
            set total(value) {
                this._total = value;
            },
            get discount() {
                return this._discount;
            },
            set discount(value) {
                this._discount = value;
            },
            get rawData() {
                return this._rawData;
            },
            set rawData(value) {
                this._rawData = value;
            }
            
        };

        CartTotals.build = function (source, adapter) {
            var cartTotals = new CartTotals();
            if (adapter) {
                adapter.transform(cartTotals, source);
            } else {
                angular.extend(cartTotals, source);
            }

            return cartTotals;
        };

        return CartTotals;
    }

})();