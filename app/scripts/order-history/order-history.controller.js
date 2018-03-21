(function () {

    'use strict';

    angular.module('app.order-history').controller('OrderHistoryController', OrderHistoryController);

    OrderHistoryController.$inject = ['$scope', 'orderHistoryManager'];

    function OrderHistoryController($scope, orderHistoryManager) {

        var vm = this;

        orderHistoryManager.init();
        vm.viewData = orderHistoryManager.viewData;

        $scope.$on('$ionicView.afterEnter', function (event, transition) {
            if (transition.direction !== 'back') {
                orderHistoryManager.loadOrders();
            }
        });

        vm.loadMoreOrders = loadMoreOrders;
        vm.refreshOrders = orderHistoryManager.refreshOrders;

        function loadMoreOrders() {
            orderHistoryManager.loadMoreOrders().finally(function () {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }
    }

})();