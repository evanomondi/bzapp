(function () {

    'use strict';

    angular.module('app.plugin.service').factory('billingService', billingService);

    billingService.$inject = ['woocommerceService', 'PluginContext', 'PaymentMethod', 'paymentMethodAdapter'];

    function billingService(service, PluginContext, PaymentMethod, paymentMethodAdapter) {

        return {
            setBillingAddress: setBillingAddress,
            getPaymentMethods: getPaymentMethods
        };

        function setBillingAddress(address) {
            return service.callAuth('billing_address', 'put', {}, address.serialize());
        }

        function getPaymentMethods() {
            return service.callAuth('payment_method', 'get').then(function (result) {

                var capabilities = PluginContext['CAPABILITIES'],
                    pluginPaymentMethods,
                    paymentMethods;

                if (capabilities.paymentMethods) {
                    pluginPaymentMethods = capabilities.paymentMethods;
                } else {
                    pluginPaymentMethods = [];
                }

                paymentMethods = result.data.filter(function (method) {
                    return pluginPaymentMethods.indexOf(method.id) !== -1;
                });

                paymentMethods = _.sortBy(paymentMethods, function(method) {
                    return pluginPaymentMethods.indexOf(method.id);
                });

                return paymentMethods.map(function (method) {
                    return PaymentMethod.build(method, paymentMethodAdapter);
                });
            });
        }
    }

})();