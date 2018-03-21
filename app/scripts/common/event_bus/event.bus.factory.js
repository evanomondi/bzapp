(function () {

	'use strict';

	angular.module('common').factory('eventBus', eventBus);

	eventBus.$inject = ['$rootScope'];

	function eventBus($rootScope) {
		return {
			on: on,
			notify: notify
		};

		function on(channel, callback) {

			if (channel && typeof callback === 'function') {
				return $rootScope.$on(channel, function (ev, data) {
					callback(data);
				});
			}
			else {
				throw Error('Incorrect subscription parameters');
			}			
		}

		function notify(channel, data) {
			$rootScope.$emit(channel, data);
		}
	}

})();