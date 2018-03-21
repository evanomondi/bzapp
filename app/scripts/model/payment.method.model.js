(function () {

    'use strict';

    angular.module('app.model').factory('PaymentMethod', paymentMethod);

    function paymentMethod() {

        function PaymentMethod() {}

        PaymentMethod.prototype = {

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
            get description() {
                return this._description;
            },
            set description(value) {
                this._description = value;
            },
            get tokenizable() {
                return this._tokenizable;
            },
            set tokenizable(value) {
                this._tokenizable = value;
            },
            get additionalData() {
                return this._additionalData;
            },
            set additionalData(value) {
                this._additionalData = value;
            },
            get rawData() {
                return this._rawData;
            },
            set rawData(value) {
                this._rawData = value;
            }
        };

        PaymentMethod.build = function (source, adapter) {
            var method = new PaymentMethod();
            if (adapter) {
                adapter.transform(method, source);
            } else {
                angular.extend(method, source);
            }

            return method;
        };

        return PaymentMethod;
    }

})();