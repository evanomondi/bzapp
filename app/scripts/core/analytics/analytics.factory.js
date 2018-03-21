(function () {

    'use strict';

    angular.module('app.core.analytics').factory('analytics', analytics);

    analytics.$inject = ['AnalyticsEvent'];

    function analytics() {

        var trackers = [];

        return {
            addTracker: addTracker,
            logEvent: logEvent
        };

        function addTracker(tracker) {
            trackers.push(tracker);
        }

        function logEvent(eventName, payload) {
            trackers.forEach(function (tracker) {
                tracker.logEvent(eventName, payload);
            });
        }
    }

})();