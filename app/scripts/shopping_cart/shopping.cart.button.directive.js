(function () {

    'use strict';

    angular.module('app.shopping_cart').directive('cartButton', cartButton);

    cartButton.$inject = ['shoppingCartManager'];

    function cartButton(shoppingCartManager) {
        return {
            restrict: 'A',
            template: '<div class="round-badge cart-badge" ng-if="getCartQuantity() > 0">{{getCartQuantity()}}</div>',
            link: function (scope) {
                scope.getCartQuantity = shoppingCartManager.getCartQuantity;
            }
        };
    }
})();



