(function () {

    'use strict';

    angular.module('app.plugin.util').factory('woocommerceService', service);

    service.$inject = ['$http', '$location', '$q', '$localStorage', 'PluginContext', 'ErrorCodes'];

    function service($http, $location, $q, $localStorage, PluginContext, ErrorCodes) {


        var API_VERSION = 'mf/v1',
            API_PATH = 'wp-json',
            tokenStorageKey = 'woocommerceMFSecurityToken',
            token = $localStorage[tokenStorageKey] || '';       
            
        return {
            call: makeCall,
            callAuth: makeAuthCall, 
            getToken: getToken,
            setToken: setToken
        };

        function makeCall(path, method, params, data, headers, apiOverrides, useAuth) {
            var endpointURL,
                host = $location.host(),
                // if the app is running locally set api host to proxy
                apiHost = (host === 'localhost') ? '/' + PluginContext['NAME'] + '/api' : PluginContext.API_HOST,
                apiPath,
                apiVersion;

            apiOverrides = apiOverrides || {};
            apiPath = apiOverrides.apiPath || API_PATH;
            apiVersion = apiOverrides.apiVersion || API_VERSION;

            endpointURL = apiHost + '/' + apiPath + '/' + apiVersion + '/' + path;
            method = method || 'GET';

            
            return makeBasic(endpointURL, method, params, data, headers, useAuth);
        }

        function makeAuthCall(path, method, params, data, headers, apiOverrides) {
           return makeCall(path, method, params, data, headers, apiOverrides, true);
        }

        function makeBasic(endpoint, method, params, data, headers, useAuth) {
            headers = headers || {};

            if (useAuth && token) {
                headers['Authorization'] = 'Bearer ' + token;
            }

            return $http({
                method: method,
                url: endpoint,
                params: params,
                data: data,
                headers: headers
            }).catch(function (err) {
                if (err && err.data && err.data.code === 'jwt_auth_invalid_token') {
                    setToken('');
                    return $q.reject(ErrorCodes.INVALID_SESSION);
                } else {
                    return $q.reject(err);
                }
            });
        }

        function getToken() {
            return token;
        }

        function setToken(newToken) {
            token = $localStorage[tokenStorageKey] = newToken;            
        }
    }


})();