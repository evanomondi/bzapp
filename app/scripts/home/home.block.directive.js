(function() {

	'use strict';

	angular.module('app.home').directive('frontBlock', frontBlock);

	frontBlock.$inject = ['$parse'];

	function frontBlock($parse) {		

		return {
			templateUrl: 'app/scripts/home/block.html',			
			restrict: 'C',			
			link: function (scope, el, attr) {
				var options = $parse(attr['blockOptions']),
					loader = $parse(attr['loaderPane'])(scope);

				scope.blockVisible = true;
				scope.blockOptions = {};

				applyOptions(options, scope);

				scope.$watch(attr['blockOptions'], function() {
					applyOptions(options(scope), scope);
				}, true);

				// if block data is loading do no display block contents
				// in order to avoid background image showing on the back of the spinner
				if (loader) {
					scope.blockVisible = false;

					loader.finally(function () {
						scope.blockVisible = true;
					});
				}
			}
		};
	}

	function applyOptions(options, scope) {
		scope.blockOptions = options;
	}

})();