(function () {

    'use strict';

    angular.module('app.core').factory('userManager', userManager);

    userManager.$inject = ['$q', '$rootScope', '$injector', '$ionicModal', 'eventBus', 'AuthEvent', 'authErrorHandler', 'authModalManager', 'analytics', 'AnalyticsEvent'];

    function userManager($q, $rootScope, $injector, $ionicModal, eventBus, AuthEvent, authErrorHandler, authModal, analytics, AnalyticsEvent) {

        var user = null,
            userService;

        try {
            userService = $injector.get('userService');
        } catch (err) {
            userService = null;
        }

        eventBus.on(AuthEvent.SESSION_INVALIDATED, onSessionInvalidated);

        return {
            openAuth: openAuth,
            login: login,
            register: register,
            logout: logout,
            getUser: getUser,
            loadUser: loadUser
        };

        function openAuth() {

            if (!userService) {
                return $q.reject();
            }
            return authModal.showLogin();
        }

        function login(username, password) {
            if (userService) {
                return userService.login(username, password).then(function (newUser) {
                    user = newUser;
                    // track login
                    analytics.logEvent(AnalyticsEvent.LOG_IN, {
                        user: user,
                        method: 'email'
                    });
                    eventBus.notify(AuthEvent.USER_LOGGED_IN, user);
                });
            }
        }

        function register(username, password, firstName, lastName) {
            if (userService) {
                return userService.register(username, password, firstName, lastName)
                    .then(function (newUser) {
                        user = newUser;
                        // track registration
                        analytics.logEvent(AnalyticsEvent.REGISTER, {
                            user: user,
                            method: 'email'
                        });
                        eventBus.notify(AuthEvent.USER_LOGGED_IN, user);
                    });
            }
        }

        function logout() {
            var promise;

            if (!userService) {
                promise = $q.reject();
            } else {
                promise = userService.logout()
                    .catch(function () {})
                    .finally(function () {
                        user = null;
                        // track logout
                        analytics.logEvent(AnalyticsEvent.LOG_OUT);
                        eventBus.notify(AuthEvent.USER_LOGGED_OUT);
                    });
            }

            return promise;
        }

        function getUser() {
            return user;
        }

        function loadUser() {
            if (userService) {
                return userService.checkAuth().then(function () {
                    return userService.getUser().then(function (u) {
                        user = u;
                        return user;
                    });
                }).catch(authErrorHandler);
            } else {
                return $q.reject();
            }
        }

        function onSessionInvalidated() {
            // track logout
            analytics.logEvent(AnalyticsEvent.LOG_OUT);
            user = null;
        }
    }
})();