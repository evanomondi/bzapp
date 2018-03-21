(function () {

    'use strict';

    angular.module('common').factory('CancelableHttpInterceptor', interceptor);

    interceptor.$inject = ['$q', 'CancelableHttpService'];

    function interceptor($q, CancelableHttpService) {
        return {
            request: function (config) {
                if (config && config.timeout === undefined) {                    
                    config.timeout = CancelableHttpService.cancelablePromise();
                }

                return config;
            }
        };
    }

})();