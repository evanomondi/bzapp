(function () {

    'use strict';

    angular.module('app.checkout').controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$translate', 'connectivity', 'userManager', 'authModalManager'];

    function LoginController($scope, $translate, connectivity, userManager, authModalManager) {

        var vm = this;

        $translate('auth.errorMessage').then(function (value) {
            vm.authErrorMessage = value;
        });

        vm.inAuth = false;

        //methods        
        vm.login = login;
        vm.goToRegister = goToRegister;


        $scope.$on('modal.hidden', function () {
            resetModal();
        });

        function login(username, password) {
            vm.inAuth = true;
            userManager.login(username, password).then(function () {
                authModalManager.hide();
            }).catch(function () {
                connectivity.showError(vm.authErrorMessage);
            }).finally(function () {
                vm.inAuth = false;
            });
        }

        function goToRegister() {
            authModalManager.showRegister();
        }

        function resetModal() {
            vm.username = '';
            vm.password = '';
        }
    }

})();