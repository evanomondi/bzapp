(function () {

    'use strict';

    angular.module('app.model').factory('CheckoutSession', checkoutSession);

    checkoutSession.$inject = [];

    function checkoutSession() {

        function CheckoutSession() {}

        CheckoutSession.prototype = {

            get shippingAddress() {
                return this._shippingAddress;
            },
            set shippingAddress(value) {
                this._shippingAddress = value;
            },
            get billingAddress() {
                return this._billingAddress;
            },
            set billingAddress(value) {
                this._billingAddress = value;
            },
            get shippingMethod() {
                return this._shippingMethod;
            },
            set shippingMethod(value) {
                this._shippingMethod = value;
            },
            get paymentMethod() {
                return this._paymentMethod;
            },
            set paymentMethod(value) {
                this._paymentMethod = value;
            },
            get paymentMethods() {
                return this._paymentMethods;
            },
            set paymentMethods(value) {
                this._paymentMethods = value;
            },
            get paymentData() {
                return this._paymentData;
            },
            set paymentData(value) {
                this._paymentData = value;
            },
            get cart() {
                return this._cart;
            },
            set cart(value) {
                this._cart = value;
            }

        };

        CheckoutSession.build = function (source, adapter) {
            var checkoutSession = new CheckoutSession();
            if (adapter) {
                adapter.transform(checkoutSession, source);
            } else {
                angular.extend(checkoutSession, source);
            }

            return checkoutSession;
        };

        return CheckoutSession;
    }

})();