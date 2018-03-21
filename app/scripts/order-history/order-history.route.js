(function () {
    'use strict';

    angular
        .module('app.order-history')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'app.order-history',
            config: {
                url: '/order-history',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'app/scripts/order-history/order-history.html',
                        controller: 'OrderHistoryController',
                        controllerAs: 'orderHistory'
                    }
                }
            }
        }];
    }

})();