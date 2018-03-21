(function () {

	'use strict';

	angular.module('app.plugin.util', []);
	angular.module('app.plugin.adapter', []);
	angular.module('app.plugin.service', []);
	angular.module('app.plugin', ['app.plugin.util', 'app.plugin.adapter', 'app.plugin.service']);

})();