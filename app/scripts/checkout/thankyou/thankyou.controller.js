(function () {

    'use strict';

    angular.module('app.checkout').controller('ThankYouController', ThankYouController);

    ThankYouController.$inject = ['$scope', '$sce', '$stateParams', '$ionicHistory', '$ionicPlatform', '$state', 'checkoutManager'];

    function ThankYouController($scope, $sce, $stateParams, $ionicHistory, $ionicPlatform, $state, checkoutManager) {

        var vm = this,
            deregisterBack,
            sessionResult = checkoutManager.getSessionResult();
            
        vm.orderId = sessionResult.orderId;
        vm.orderSuccessfull = sessionResult.success;
        vm.message = _.unescape(sessionResult.message);

        vm.goHome = goHome;

        $scope.$on('$ionicView.afterEnter', function () {
            deregisterBack = $ionicPlatform.registerBackButtonAction(goHome, 101);
        });

        $scope.$on('$ionicView.beforeLeave', function () {
            deregisterBack();
        });

        function goHome() {
            $ionicHistory.clearCache();
            $ionicHistory.nextViewOptions({
                disableBack: true
            });

            $state.go('app.home');
        }
    }

})();