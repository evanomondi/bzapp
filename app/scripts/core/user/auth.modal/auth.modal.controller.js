(function () {

    'use strict';

    angular.module('app.core').controller('AuthModalController', AuthModalController);

    AuthModalController.$inject = ['$scope', '$translate', 'authModalManager'];

    function AuthModalController($scope, $translate, authModalManager) {

        var vm = this;

        vm.viewData = authModalManager.viewData;       
        

        /*$translate('auth.signIn').then(function (value) {
            vm.modalTitle = value;
        });*/

        //methods
        vm.hideModal = hideModal;

        function hideModal() {
            $scope.authModal.hide();
        }        
    }

})();
