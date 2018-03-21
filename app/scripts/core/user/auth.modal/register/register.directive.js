(function () {

	'use strict';

	angular.module('app.core').directive('registerView', directive);

	directive.$inject = [];

	function directive() {
		return {
			templateUrl: 'app/scripts/core/user/auth.modal/register/register.html'
		};
	}

})();