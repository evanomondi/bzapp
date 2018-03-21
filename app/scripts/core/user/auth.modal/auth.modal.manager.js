(function () {

    'use strict';

    angular.module('app.core').factory('authModalManager', manager);

    manager.$inject = ['$translate', '$rootScope', '$ionicModal', '$q', 'eventBus', 'AuthEvent'];

    function manager($translate, $rootScope, $ionicModal, $q, eventBus, AuthEvent) {


        var modalScope = $rootScope.$new(true),
            authModal,
            childViewOptions = {
                login: {
                    title: 'auth.signIn'
                },
                register: {
                    title: 'Register'
                }
            },

            manager = {
                viewData: {
                    currentView: '',
                    title: ''
                },
                showLogin: showLogin,
                showRegister: showRegister,
                hide: hide
            };

        initModal();

        return manager;

        function showLogin() {
            return show('login');
        }

        function showRegister() {
            return show('register');
        }

        function show(view) {
            switchToView(view);
            if (!authModal.isShown()) {
                return authModal.show();
            } else {
                return $q.resolve();
            }
        }

        function hide() {
            authModal.hide();
        }

        function switchToView(view) {
            var viewOpts = childViewOptions[view];
            if (viewOpts) {
                manager.viewData.modalTitle = viewOpts.title;
                manager.viewData.currentView = view;
            }
        }

        /* Modal related functions */
        function initModal() {
            // init modal instance
            $ionicModal.fromTemplateUrl('app/scripts/core/user/auth.modal/auth.modal.html', {
                scope: modalScope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                authModal = modal;
                modalScope.authModal = modal;
            });

            modalScope.$on('modal.hidden', function () {
                eventBus.notify(AuthEvent.AUTH_MODAL_HIDDEN);
            });

        }
    }

})();