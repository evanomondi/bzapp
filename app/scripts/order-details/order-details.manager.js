(function () {

    'use strict';

    angular.module('app.order-details').factory('orderDetailsManager', orderDetailsManager);

    orderDetailsManager.$inject = ['shopManager', 'orderService', '$translate', '$stateParams'];

    function orderDetailsManager(shopManager, orderService, $translate, $stateParams) {
        var manager = {
            viewData: {
                errorMessage: $translate.instant('orderDetails.ordersErrorMessage'),
                currency: shopManager.getShop().currency
            },
            init: init,
            loadOrder: loadOrder
        };

        return manager;

        function init() {
            manager.viewData.order = null;
            manager.viewData.orderLoader = null;
        }

        function loadOrder() {
            var orderId = $stateParams.orderId;
            manager.viewData.orderLoader = orderService.getOrder(orderId)
                .then(function (order) {
                    manager.viewData.order = adjustOrderForView(order);
                });
            return manager.viewData.orderLoader;
        }

        function adjustOrderForView(order) {
            order.status = order.status.charAt(0).toUpperCase() + order.status.substring(1);

            return order;
        }
    }

})();