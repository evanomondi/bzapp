(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('addressAdapter', adapter);

    adapter.$inject = [];

    function adapter() {

        return {
            transform: function (destination, source) {
                destination.email = source.email;    
                destination.firstName = source.first_name;
                destination.lastName = source.last_name;      
                destination.country = source.country;
                destination.city = source.city;
                destination.state = source.state;
                destination.address1 = source.address;
                destination.address2 = source.address_2;
                destination.postcode = source.postcode; 
                destination.phone = source.phone;                 
                destination.rawData = source;
            }
        };       
    }

})();