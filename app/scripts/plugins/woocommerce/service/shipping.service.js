(function () {

    'use strict';

    angular.module('app.plugin.service').factory('shippingService', shippingService);

    shippingService.$inject = ['woocommerceService', 'ShippingMethod', 'shippingMethodAdapter'];

    function shippingService(service, ShippingMethod, shippingMethodAdapter) {

        return {
            getShippingMethods: getShippingMethods,
            selectShippingMethod: selectShippingMethod
        };

        function getShippingMethods(checkoutSession) {
            return setShippingAddress(checkoutSession.shippingAddress).then(function () {
                return service.callAuth('shipping_methods');
            }).then(function (result) {
                return result.data.map(function (rawMethod) {
                    return ShippingMethod.build(rawMethod, shippingMethodAdapter);
                });
            });
        }

        function selectShippingMethod(methodId) {
            return service.callAuth('shipping_methods/'+methodId, 'post');
        }

        function setShippingAddress(address) {
            return service.callAuth('shipping_address', 'put', {}, address.serialize());
        }
    }

})();