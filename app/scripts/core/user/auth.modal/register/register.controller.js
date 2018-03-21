(function () {

    'use strict';

    angular.module('app.checkout').controller('RegisterController', LoginController);

    LoginController.$inject = ['$scope', '$translate', 'connectivity', 'userManager', 'authModalManager'];

    function LoginController($scope, $translate, connectivity, userManager, authModalManager) {

        var vm = this,
            genericErrorMessage;

        $translate('auth.registrationErrorMessage').then(function (value) {
            genericErrorMessage = value;
        });

        vm.isRegistering = false;

        //methods        
        vm.onSubmit = onSubmit;
        vm.goToLogin = goToLogin;

        $scope.$on('modal.hidden', function () {
            resetModal();
        });

        function onSubmit() {
            var nameSplit = vm.name.split(' '),
                firstName,
                lastName;

            firstName = nameSplit[0];

            if (nameSplit.length > 1) {
                nameSplit.shift();
                lastName = nameSplit.join(' ');
            }

            register(vm.username, vm.password, firstName, lastName);
        }

        function register(username, password, firstName, lastName) {
            vm.isRegistering = true;
            userManager.register(username, password, firstName, lastName).then(function () {
                authModalManager.hide();                
            }).catch(function (err) {
                var message = err && err.message || genericErrorMessage;
                connectivity.showError(message);
            }).finally(function () {
                vm.isRegistering = false;
            });
        }

        function goToLogin() {
            authModalManager.showLogin();
        }

        function resetModal() {
            vm.username = '';
            vm.password = '';
            vm.name = '';
        }
    }

})();