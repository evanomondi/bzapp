(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('categoryAdapter', adapter);

    adapter.$inject = [];

    function adapter() {

        return {
            transform: function (destination, source) {
                destination.id = source.id;
                destination.title = source.name;
                destination.image = source.image;
            }
        };       
    }

})();