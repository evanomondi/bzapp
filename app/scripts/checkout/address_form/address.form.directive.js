(function () {

    'use strict';

    angular.module('app.checkout').directive('addressForm', addressForm);

    addressForm.$inject = [];

    function addressForm() {
        return {
            templateUrl: 'app/scripts/checkout/address_form/address.form.html',
            restrict: 'C',
            controller: 'AddressFormController',
            controllerAs: 'form',
            bindToController: {
                address: '=',
                countries: '=',
                addressChanged: '&'
            },
            transclude: true,

            link: function (scope, el, attr, addressFormCtrl) {
                scope.$watchCollection('form.countries', function () {
                    addressFormCtrl.invalidateCountries();
                });
                scope.$watch('form.address', function () {
                    addressFormCtrl.refreshModel();
                }, false);
            }
        };
    }


})();