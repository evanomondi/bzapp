(function () {

	'use strict';

	angular.module('app.core').directive('appCapability', directive);


	directive.$inject = ['PluginContext'];

	function directive(PluginContext) {

		return {
			restrict: 'A',			
			link: link
		};

		function link(scope, el, attr) {
			var capability = attr['appCapability'];

			if (capability && !PluginContext.CAPABILITIES[capability]) {
				el[0].remove();
			}
		}
	}

})();