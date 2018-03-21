(function () {

    'use strict';

    angular.module('app.checkout').controller('ShippingController', ShippingController);

    ShippingController.$inject = ['$scope', 'shippingManager'];

    function ShippingController($scope, shippingManager) {

        var vm = this;           

        vm.viewData = shippingManager.viewData;
        vm.addressChanged = shippingManager.addressChanged;
        vm.selectShippingMethod = shippingManager.selectShippingMethod;
        vm.allowToProceed = shippingManager.allowToProceed;
        vm.hasEnoughInfoForShipping = shippingManager.hasEnoughInfoForShipping;
        vm.navigateToBilling = shippingManager.navigateToBilling;

        $scope.$on('$ionicView.enter', function (event, transition) {            
            if (transition.direction !== 'back') {
                shippingManager.init();
            }
        });

        $scope.$on('$ionicView.leave', function (event, transition) {
            if (transition.direction !== 'forward') {
                shippingManager.reset();
            }            
        });
    }

})();