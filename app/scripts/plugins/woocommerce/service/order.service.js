(function () {

    'use strict';

    angular.module('app.plugin.service').factory('orderService', OrderService);

    OrderService.$inject = ['woocommerceService', 'Order', 'orderAdapter'];

    function OrderService(service, Order, orderAdapter) {

        return {
            getOrders: getOrders,
            getOrder: getOrder
        };

        function getOrders(options) {
            return service.callAuth('order', 'get', buildParams(options)).then(function(result) {
                return processOrders(result.data);
            });
        }

        function getOrder(orderId) {
            return service.callAuth('order/' + orderId).then(function (result) {
                return processOrder(result.data);
            });
        }

        function processOrders(orders) {
            return orders.map(processOrder);
        }

        function processOrder(order) {
            return Order.build(order, orderAdapter);            
        }

        function buildParams(options) {                        
            var params = {};

            options = options || {};

            if (options.pageSize) {
                params.per_page = options.pageSize;
            }
            if (options.page && typeof options.page === 'number') {
                params.page = options.page + 1;
            }

            return params;
        }
    }

})();