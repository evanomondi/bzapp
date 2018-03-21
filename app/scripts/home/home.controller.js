(function () {

    'use strict';

    angular.module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$ionicHistory', 'homeManager', 'categoryManager', 'AppContext'];

    function HomeController($scope, $ionicHistory, homeManager, categoryManager, AppContext) {
        var vm = this;

        vm.viewData = homeManager.viewData;

        vm.categories = [];
        vm.categoryRequest = null;
        vm.categoryEmptyMessage = 'No categories';
        vm.showSpinner = true;
        vm.transparentHeader = AppContext.HOME_HEADER_TRANSPARENT;

        $scope.$on('$ionicView.afterEnter', function () {
            $ionicHistory.clearHistory();

            vm.categoryRequest = categoryManager.loadNavTree().then(function (tree) {
                vm.categories = tree.categories;
                return vm.categories;
            }).finally(function () {
                vm.showSpinner = false;
            });
        });

        vm.navigateToCategory = homeManager.navigateToCategory;
        vm.navigateFromBlock = homeManager.navigateFromBlock;
    }

})();