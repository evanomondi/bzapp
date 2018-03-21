(function () {

    'use strict';

    angular.module('app.core').directive('requiresAuth', directive);


    directive.$inject = ['PluginContext', 'eventBus', 'AuthEvent', 'userManager', '$state'];

    function directive(PluginContext, eventBus, AuthEvent, userManager, $state) {

        return {
            restrict: 'A',
            link: link
        };

        function link(scope, el, attr) {
            var redirectTo = attr['requiresAuth'];

            if (redirectTo) {
                el.on('click', function () {
                    if (!userManager.getUser()) {
                        openAuthModal(redirectTo);
                    } else {
                        $state.go(redirectTo);
                    }
                });
            }
        }

        function openAuthModal(redirectTo) {
            var deregisterModal,
                deregisterUserLoggedIn;

            userManager.openAuth();

            deregisterModal = eventBus.on(AuthEvent.AUTH_MODAL_HIDDEN, function () {
                deregisterModal();
                deregisterUserLoggedIn();
            });

            deregisterUserLoggedIn = eventBus.on(AuthEvent.USER_LOGGED_IN, function () {
                $state.go(redirectTo);
            });
        }
    }

})();