(function () {

    'use strict';

    angular.module('app.checkout').factory('checkoutManager', checkoutManager);

    checkoutManager.$inject = [
    '$q', 
    '$ionicHistory', 
    '$state', 
    '$translate',
    'billingService',
    'checkoutService', 
    'CheckoutSession', 
    'authErrorHandler', 
    'eventBus', 
    'AuthEvent',
    'connectivity'];

    function checkoutManager(
    	$q, 
    	$ionicHistory, 
    	$state, 
    	$translate,
        billingService,
    	checkoutService, 
    	CheckoutSession, 
    	authErrorHandler, 
    	eventBus, 
    	AuthEvent,
    	connectivity) {

        var checkoutSession,
            sessionDeferred,
            currentViewIndex,
            sessionResult;

        eventBus.on(AuthEvent.SESSION_INVALIDATED, onUserSessionInvalidated);

        return {
            startSession: startSession,
            endSession: endSession,
            getSession: getSession,
            getTotals: getTotals,
            createOrder: createOrder,
            onSessionEnded: onSessionEnded,
            getSessionResult: getSessionResult,
            goForward: goForward,
            goBack: goBack
        };

        function startSession() {
            if (!checkoutSession) {
                checkoutSession = CheckoutSession.build();
                sessionDeferred = $q.defer();
                currentViewIndex = 0;

                billingService.getPaymentMethods().then(function (methods) {
                    checkoutSession.paymentMethods = methods;
                });
            }

            return checkoutSession;
        }

        function endSession(result) {
            sessionResult = result;
            checkoutSession = null;
            sessionDeferred.resolve();
        }

        function getSession() {
            return checkoutSession;
        }

        function getTotals() {
            if (checkoutSession) {
                return checkoutService.getTotals(checkoutSession).catch(authErrorHandler);
            } else {
                $q.reject('Checkout session not ready');
            }
        }

        function createOrder() {
            if (checkoutSession) {
                return checkoutService.createOrder(checkoutSession).catch(authErrorHandler);
            } else {
                return $q.reject('Checkout session not ready');
            }
        }

        function getSessionResult() {
            return sessionResult;
        }

        function goForward() {
            currentViewIndex++;
        }

        function goBack() {
            currentViewIndex--;
        }

        function onSessionEnded() {
            return sessionDeferred.promise;
        }

        function onUserSessionInvalidated() {
            if (checkoutSession) {
                endSession();
                if (currentViewIndex > 0) {
                    $ionicHistory.goBack(-currentViewIndex);
                }
                connectivity.showError($translate.instant('error.sessionError'));
            }
        }
    }

})();