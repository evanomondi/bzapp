(function () {

    'use strict';

    angular.module('app.model').factory('ShippingMethod', shippingMethod);

    shippingMethod.$inject = [];

    function shippingMethod() {

        function ShippingMethod() {}

        ShippingMethod.prototype = {

            get id() {
                return this._id;
            },
            set id(value) {
                this._id = value;
            },
            get title() {
                return this._title;
            },
            set title(value) {
                this._title = value;
            },
            get cost() {
                return this._cost;
            },
            set cost(value) {
                this._cost = value;
            }
        };

        ShippingMethod.build = function (source, adapter) {
            var method = new ShippingMethod();
            if (adapter) {
                adapter.transform(method, source);
            } else {
                angular.extend(method, source);
            }

            return method;
        };

        return ShippingMethod;
    }

})();