(function () {

    'use strict';

    angular.module('app.plugin.service').factory('userService', userService);

    userService.$inject = ['woocommerceService', '$q', '$localStorage', 'User', 'userAdapter'];

    function userService(service, $q, $localStorage, User, userAdapter) {

        return {
            login: login,
            register: register,
            logout: logout,
            checkAuth: checkAuth,
            getUser: getUser
        };

        function login(username, password) {

            var promise;

            if (!username || !password) {
                promise = $q.reject();
            } else {
                promise = service.call('token', 'post', {}, {
                    'username': username,
                    'password': password
                }, {}, {
                    apiVersion: 'jwt-auth/v1'
                }).then(function (result) {
                    service.setToken(result.data.token);

                    return getUser();
                });
            }

            return promise;
        }

        function register(username, password, firstName, lastName) {
            var promise;

            if (!username || !password || !firstName) {
                promise = $q.reject();
            } else {
                promise = service.call('customer', 'post', {}, {
                    'username': username,
                    'password': password,
                    'first_name': firstName,
                    'last_name': lastName
                }).then(function (result) {
                    service.setToken(result.data.token);

                    return getUser();
                }, function (err) {
                    return $q.reject(err.data);
                });
            }

            return promise;
        }

        function logout() {
            service.setToken('');
            return $q.resolve();
        }

        function checkAuth() {

            var promise;

            if (!service.getToken()) {
                promise = $q.reject();
            } else {
                promise = service.callAuth('token/validate', 'post', {}, {}, {}, {
                    apiVersion: 'jwt-auth/v1'
                }).then(function (result) {
                    if (result.data.code === 'jwt_auth_valid_token') {
                        return $q.resolve();
                    } else {
                        return $q.reject();
                    }
                });
            }

            return promise;
        }

        function getUser() {
            return service.callAuth('customer/me').then(function (result) {
                return User.build(result.data, userAdapter);
            });
        }

    }

})();