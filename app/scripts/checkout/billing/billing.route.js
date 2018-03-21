(function () {
    'use strict';

    angular
        .module('app.checkout')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());

        function getStates() {
            return [{
                state: 'app.billing',
                config: {
                    url: '/billing',
                    cache: true,
                    views: {
                        'viewContent': {
                            templateUrl: 'app/scripts/checkout/billing/billing.html',
                            controller: 'BillingController',
                            controllerAs: 'billing'
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