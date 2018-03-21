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
            state: 'app.thankyou',
            config: {
                url: '/thankyou',
                cache: false,
                views: {
                    'viewContent': {
                        templateUrl: 'app/scripts/checkout/thankyou/thankyou.html',
                        controller: 'ThankYouController',
                        controllerAs: 'thankyou'
                    }
                }
            }
        }];
    }

})();
