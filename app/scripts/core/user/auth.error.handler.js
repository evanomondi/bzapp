(function () {

    'use strict';

    angular.module('app.core').factory('authErrorHandler', authErrorHandler);

    authErrorHandler.$inject = ['$q', 'ErrorCodes', 'AuthEvent', 'eventBus'];

    function authErrorHandler($q, ErrorCodes, AuthEvent, eventBus) {
        return function (err) {
            // invalid_session error means that user's current session information is no londer valid
            // this happens due to token expiration, or modification, server invalidating token etc
            if (err === ErrorCodes.INVALID_SESSION) {
                // notify the system of this event                    
                eventBus.notify(AuthEvent.SESSION_INVALIDATED);
            }

            return $q.reject(err);
        };
    }

})();