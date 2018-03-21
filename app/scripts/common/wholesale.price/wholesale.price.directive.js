(function () {

    'use strict';

    angular.module('common').directive('wholesalePrice', wholesalePrice);

    function wholesalePrice() {
        return {
            restrict: 'C',
            scope: {
                item: '=',
                currency: '='
            },
            template: [
                '<div ng-if="item.salePrice !== null" ng-bind-html="item.salePrice | currencyFormatter : currency" class="price"></div>',
                '<div class="price" ng-class="{&quot;strikethrough-price&quot;: item.salePrice !== null}" ng-bind-html="item.price | currencyFormatter : currency"></div>'
            ].join('')
        };
    }
})();



