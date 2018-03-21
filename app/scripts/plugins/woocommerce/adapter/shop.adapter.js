(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('shopAdapter', adapter);

    adapter.$inject = [];

    function adapter() {

        return {
            transform: function (destination, source) {
                destination.currency = source.currency;                
                destination.shippingCountries = Object.keys(source.shipping_countries);
                destination.guestCheckout = source.guest_checkout;
                destination.rawData = source;
            }
        };       
    }

})();