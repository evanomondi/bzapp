(function () {
    'use strict';

    angular
        .module('app.order-details')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'app.order-details',
            config: {
                url: '/order-history/:orderId',
                cache: false,
                views: {
                    'viewContent': {
                        templateUrl: 'app/scripts/order-details/order-details.html',
                        controller: 'OrderDetailsController',
                        controllerAs: 'orderDetails'
                    }
                }
            }
        }];
    }

})();