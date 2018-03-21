(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('paymentMethodAdapter', adapter);

    adapter.$inject = [];

    function adapter() {

        return {
            transform: function (destination, source) {                
                destination.id = source.id;
                destination.title = source.title;
                destination.description = source.description;  
                destination.tokenizable = source.supports.indexOf('tokenization') !== -1;
                destination.additionalData = source.additional_data;   
                destination.rawData = source;                  
            }
        };       
    }

})();