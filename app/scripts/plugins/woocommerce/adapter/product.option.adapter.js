(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('productOptionAdapter', adapter);

    function adapter() {

        return {
            transform: function (destination, source) {
                destination.id = source.id;
                destination.title = source.name;
                destination.values = source.options;
                destination.rawData = source;               
            }
        };
    }

})();