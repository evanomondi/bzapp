(function () {
    'use strict';

    angular.module('app.product.details').controller('ProductController', ProductController);

    ProductController.$inject = ['productDetailsManager'];

    function ProductController(detailsManager) {

        var vm = this;           

        // init data
        detailsManager.init();

        // bind data to scope
        vm.viewData = detailsManager.viewData; 

        // methods
        vm.addToCart = detailsManager.addToCart;
        vm.incrementQuantity = detailsManager.incrementQuantity;
        vm.decrementQuantity = detailsManager.decrementQuantity;
        vm.toggleFavorite = detailsManager.toggleFavorite;
        vm.optionChanged = detailsManager.handleOptionChange;
        vm.isSoldOut = detailsManager.isSoldOut;
    }

})();