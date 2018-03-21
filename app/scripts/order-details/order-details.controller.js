(function () {

	'use strict';

	angular.module('app.order-details').controller('OrderDetailsController', OrderDetailsController);

	OrderDetailsController.$inject = ['$scope', 'orderDetailsManager'];

	function OrderDetailsController($scope, orderDetailsManager) {

		var vm = this; 

        orderDetailsManager.init();
        vm.viewData = orderDetailsManager.viewData;

		$scope.$on('$ionicView.afterEnter', function (event, transition) {            
            if (transition.direction !== 'back') {
                orderDetailsManager.loadOrder();
            }
        });
	}

})();