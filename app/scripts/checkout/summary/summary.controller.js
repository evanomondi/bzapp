(function () {

    'use strict';

    angular.module('app.checkout').controller('SummaryController', SummaryController);

    SummaryController.$inject = ['$scope', '$translate', 'shopManager', 'summaryManager'];

    function SummaryController($scope, $translate, shopManager, summaryManager) {

        var vm = this;

        // properties
        vm.viewData = summaryManager.viewData;
        vm.emptyCartMessage = $translate.instant('cart.noProducts');
        vm.currency = shopManager.getShop().currency;
        // methods
        vm.createOrder = summaryManager.createOrder;

        $scope.$on('$ionicView.afterEnter', function () {
            summaryManager.init();
        });

        $scope.$on('$ionicView.leave', function (event, transition) {
            if (transition.direction !== 'forward') {
                summaryManager.reset();
            }
        });
    }

})();
