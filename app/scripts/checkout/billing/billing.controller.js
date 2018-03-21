(function () {

    'use strict';

    angular.module('app.checkout').controller('BillingController', BillingController);

    BillingController.$inject = ['$scope', 'billingManager', 'shippingManager'];

    function BillingController($scope, billingManager, shippingManager) {

        var vm = this;
        vm.differenetAddressForBilling = false;
        vm.viewData = billingManager.viewData;
        vm.shippingManager = shippingManager;
        vm.addressChanged = billingManager.addressChanged;
        vm.onBillingAddressToggled = billingManager.onBillingAddressToggled;
        vm.processBilling = billingManager.processBilling;
        vm.selectPaymentMethod = billingManager.selectPaymentMethod;

        $scope.$on('$ionicView.enter', function (event, transition) {
            if (transition.direction !== 'back') {
                billingManager.init();
            }
        });

        $scope.$on('$ionicView.leave', function (event, transition) {
            if (transition.direction !== 'forward') {
                billingManager.reset();
            }
        });
    }

})();
