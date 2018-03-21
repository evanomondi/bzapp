(function () {

	'use strict';

	angular.module('app.core').directive('loginView', directive);

	directive.$inject = [];

	function directive() {
		return {
			templateUrl: 'app/scripts/core/user/auth.modal/login/login.html'
		};
	}

})();