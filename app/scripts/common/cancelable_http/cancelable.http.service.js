(function () {

    'use strict';

    angular.module('common').service('CancelableHttpService', service);

    service.$inject = ['$q'];

    function service($q) {
        var cancelablePromises = [],
            CancelableHttpService = {};

        CancelableHttpService.cancelablePromise = function () {
            var cancelablePromise = $q.defer();

            cancelablePromises.push(cancelablePromise);

            return cancelablePromise.promise;
        };

        CancelableHttpService.cancelAll = function () {
            angular.forEach(cancelablePromises, function (cancelPromise) {
                cancelPromise.resolve();
            });

            CancelableHttpService.purgeRequests();
        };

        CancelableHttpService.purgeRequests = function () {
        	cancelablePromises.length = 0;
        };

        return CancelableHttpService;
    }

})();