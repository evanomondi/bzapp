(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('productAdapter', adapter);

    adapter.$inject = [];

    function adapter() {

        return {
            transform: function (destination, source) {
                destination.id = source.id;
                destination.title = source.title;
                destination.shortDescription = source.shortDescription;
                destination.vendor = source.vendor;
                destination.image = source.image;
                destination.price = source.price;
                destination.salePrice = source.salePrice; 
                destination.isFullProduct = false;                           
            }
        };
    }
})();