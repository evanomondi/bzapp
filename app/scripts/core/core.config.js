(function () {

    'use strict';

    angular.module('app.core')
        .config(appConfig)
        .run(appRun);


    appConfig.$inject = ['$ionicFilterBarConfigProvider', '$translateProvider', '$ionicCloudProvider', 'AppContext'];

    function appConfig($ionicFilterBarConfigProvider, $translateProvider, $ionicCloudProvider, AppContext) {
        $ionicFilterBarConfigProvider.backdrop(false);
        $ionicFilterBarConfigProvider.closeOnSubmit(true);

        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.useStaticFilesLoader({
                files: [{
                    prefix: 'languages/',
                    suffix: '/translation.json'
                }, {
                    prefix: 'languages/',
                    suffix: '/countries.json'
                }]
            });

        if (AppContext.PREFERRED_LANGUAGE) {
            $translateProvider.preferredLanguage(AppContext.PREFERRED_LANGUAGE);
        }
        else {
            $translateProvider.determinePreferredLanguage();
        }

        $translateProvider.fallbackLanguage(AppContext.FALLBACK_LANGUAGE);

        // Ionic Cloud config

        $ionicCloudProvider.init({
            'core': {
                'app_id': AppContext.IONIC_APP_ID || '00000000'
            },
            'push': {
                'sender_id': AppContext.ANDROID_SENDER_ID || '0000000000000'
            },
            'insights': {
                'enabled': false
            }
        });
    }

    appRun.$inject = ['$ionicPlatform', '$rootScope', 'CancelableHttpService', '$ionicPush', 'AppContext'];

    function appRun($ionicPlatform, $rootScope, CancelableHttpService, $ionicPush, AppContext) {

        $ionicPlatform.ready(function () {

            if (AppContext.PUSH_ENABLED) {

                if (window.plugins && window.plugins.OneSignal) {
                    var notificationOpenedCallback = function (jsonData) {
                        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
                    };

                    //window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

                    window.plugins.OneSignal
                        .startInit(AppContext.ONESIGNAL_APP_ID)
                        .handleNotificationOpened(notificationOpenedCallback)
                        .endInit();
                }
            }

            if (window.StatusBar) {
                StatusBar.styleLightContent();
            }

            if (window.cordova) {
                if (window.cordova.plugins.Keyboard) {
                    window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                    window.cordova.plugins.Keyboard.disableScroll(true);
                }
            }

            $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState) {
                if (toState !== fromState) {
                    CancelableHttpService.purgeRequests();
                }
            });
        });
    }

})();