(function () {
    'use strict';

    angular
        .module('app.checkout')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'app.summary',
            config: {
                url: '/summary',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'app/scripts/checkout/summary/summary.html',
                        controller: 'SummaryController',
                        controllerAs: 'summary'
                    }
                }
            }
        }];
    }

})();
