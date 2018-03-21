(function () {

    'use strict';

    angular.module('app.plugin.service').factory('shopService', shopService);

    shopService.$inject = ['woocommerceService', 'PluginContext', 'Shop', 'shopAdapter'];

    function shopService(service, PluginContext, Shop, shopAdapter) {


        return {
            getShopData: getShopData
        };

        function getShopData() {
            return service.call('shop').then(function (result) {
                return Shop.build(result.data, shopAdapter);
            });           

        }

    }

})();