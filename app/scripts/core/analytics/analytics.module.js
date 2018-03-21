(function () {
    'use strict';

    angular.module('app.core.analytics', ['angular-google-analytics'])
        .config(configAnalytics);

    configAnalytics.$inject = ['AnalyticsProvider'];

    function configAnalytics(AnalyticsProvider) {
        AnalyticsProvider
        	.setAccount('')
        	.ignoreFirstPageLoad(true)
        	.delayScriptTag(true)        	
        	.useECommerce(true, true)
        	.setHybridMobileSupport(true)
        	.trackPages(false);
    }
})();