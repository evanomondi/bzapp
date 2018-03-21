(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('blockAdapter', adapter);

    adapter.$inject = [];

    function adapter() {

        return {
            transform: function (destination, source) {                
                angular.extend(destination, source);                       
            }
        };       
    }

})();