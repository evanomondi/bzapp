(function () {

    'use strict';

    angular.module('app.checkout').directive('authBlock', authBlock);

    authBlock.$inject = ['userManager', 'eventBus', 'AuthEvent'];

    function authBlock(userManager, eventBus, AuthEvent) {
        return {
            restrict: 'A',
            scope: true,
            template: '<div ng-if="!isLoggedIn" class="auth-block"><span>{{\'auth.haveAnAccount\' | translate}}</span><a class="button button-clear button-small sign-in" ng-click="openLogin()">{{\'auth.signInAction\' | translate}}</a></div>',
            link: function (scope) {
                scope.openLogin = openLogin;
                scope.isLoggedIn = !!userManager.getUser();

                eventBus.on(AuthEvent.USER_LOGGED_IN, function () {
                    scope.isLoggedIn = true;
                });

                function openLogin() {
                    userManager.openAuth();
                }
            }
        };
    }
})();
