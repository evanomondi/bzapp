(function () {

    'use strict';

    angular.module('app.checkout').directive('checkoutFooter', checkoutFooter);

    function checkoutFooter() {
        return {
            restrict: 'E',
            scope: {
                amount: '=',
                currency: '=',
                message: '='
            },
            template: '<div class="total"><div class="total-value" ng-bind-html="amount | currencyFormatter : currency"></div><div class="taxes-note" ng-bind-html="message | trustHtml"></div></div>'
        };
    }
})();



