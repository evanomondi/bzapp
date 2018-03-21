(function () {

    'use strict';

    angular.module('app.checkout').controller('AddressFormController', AddressFormController);

    AddressFormController.$inject = ['CountryCodes', 'CountryStateMap', '$translate'];

    function AddressFormController(CountryCodes, CountryStateMap, $translate) {
        var vm = this,
        	countriesDirty = true;

        // properties
        vm.availableCountries = [];
        vm.availableStates = [];
        vm.searchProperties = ['title'];
        vm.selectedState = null;
        vm.selectedState = null;

        // functions
        vm.invalidateCountries = invalidateCountries;
        vm.refreshModel = refreshModel;
        vm.handleCountryChanged = handleCountryChanged;
        vm.handleStateChanged = handleStateChanged;
        vm.getStateLabel = getStateLabel;

        function invalidateCountries() {
        	countriesDirty = true;
        	refreshModel();
        }

        function refreshModel() {

            if (countriesDirty && vm.countries && vm.address) {

                updateCountries(vm.countries);

                if (vm.availableCountries.length === 1) {
                    // and currently selected country is not equal to the one available
                    if (vm.address.country !== vm.availableCountries[0].id) {
                        // select the only available country
                        vm.address.country = vm.availableCountries[0].id;
                    }
                }

                handleCountryChanged();

                countriesDirty = false;
            }
        }

        function handleCountryChanged() {
            // find states corresponding to the selected country
            var states = CountryStateMap[vm.address.country];
            vm.availableStates = states || [];

            vm.selectedState = vm.address.state && getStateById(vm.address.state);
            // check if a state was already selected
            if (!vm.selectedState) {
                // reset selected state
                vm.selectedState = null;
                vm.address.state = null;
            }

            vm.addressChanged();
        }

        function handleStateChanged() {
            if (vm.selectedState) {
                vm.address.state = vm.selectedState.id;
            }

            vm.addressChanged();
        }

        function getStateLabel() {
            if (vm.selectedState) {
                return vm.selectedState.title;
            } else {
                return $translate.instant('checkout.statePlaceholder');
            }
        }

        function updateCountries(newCountries) {
            if (newCountries === '*') {
                newCountries = CountryCodes;
            }

            vm.availableCountries = newCountries.map(function (code) {
                return {
                    id: code,
                    title: $translate.instant('countries.' + code + '.title')
                };
            });
        }

        function getStateById(stateId) {
            var states = vm.availableStates.filter(function (state) {
                return state.id === stateId;
            });

            return states.length > 0 ? states[0] : null;
        }
    }

})();