(function () {
    'use strict';

    angular
        .module('app.checkout')
        .constant('Stripe', {})
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());

        function getStates() {
            return [{
                state: 'app.shipping',
                config: {
                    url: '/shipping',
                    cache: true,
                    views: {
                        'viewContent': {
                            templateUrl: 'app/scripts/checkout/shipping/shipping.html',
                            controller: 'ShippingController',
                            controllerAs: 'shipping'
                        }
                    },
                    resolve: {
                        checkoutStart: startSession
                    }
                }
            }];
        }

        startSession.$inject = ['checkoutManager'];

        function startSession(checkoutManager) {
            return checkoutManager.startSession();
        }
    }

})();