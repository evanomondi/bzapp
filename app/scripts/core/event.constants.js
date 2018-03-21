(function () {

	'use strict';

	angular.module('app.core').constant('AuthEvent', {
		USER_LOGGED_IN: 'auth.user.loggedin',
		USER_LOGGED_OUT: 'auth.user.loggedout',
		SESSION_INVALIDATED: 'auth.session.invalidated',
		AUTH_MODAL_HIDDEN: 'auth.model.hidden'
	});


})();