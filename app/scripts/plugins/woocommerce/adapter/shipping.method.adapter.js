(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('shippingMethodAdapter', adapter);

    adapter.$inject = [];

    function adapter() {

        return {
            transform: function (destination, source) {
                destination.id = source.id;
                destination.title = source.label;
                destination.cost = parseFloat(source.cost);
            }
        };     
    }

})();