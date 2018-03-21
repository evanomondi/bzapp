(function () {

	'use strict';

	angular.module('common').filter('trustHtml', trustHtml);

	trustHtml.$inject = ['$sce'];

	function trustHtml($sce) {
		return function (val) {
			return $sce.trustAsHtml(val);
		};
	}

})();