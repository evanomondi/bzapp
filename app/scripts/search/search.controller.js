(function () {

    'use strict';

    angular.module('app.search').controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', '$state', '$translate', '$ionicSearchPanel', '$ionicConfig', '$ionicFilterBarConfig'];

    function SearchController($scope, $state, $translate, $ionicSearchPanel, $ionicConfig, $ionicFilterBarConfig) {

        var vm = this;

        vm.showSearchPanel = showSearchPanel;

        function showSearchPanel() {
            $ionicSearchPanel.show({
                submit: onSubmit,
                cancelText: $translate.instant('search.cancel'),
                config: {
                    closeOnSubmit: $ionicFilterBarConfig.closeOnSubmit(),
                    theme: $ionicFilterBarConfig.theme(),
                    transition: $ionicFilterBarConfig.transition(),
                    back: $ionicConfig.backButton.icon(),
                    clear: $ionicFilterBarConfig.clear(),
                    favorite: $ionicFilterBarConfig.favorite(),
                    search: $ionicFilterBarConfig.search(),
                    backdrop: $ionicFilterBarConfig.backdrop(),
                    placeholder: $translate.instant('search.placeholder'),
                    close: $ionicFilterBarConfig.close(),
                    done: $ionicFilterBarConfig.done(),
                    reorder: $ionicFilterBarConfig.reorder(),
                    remove: $ionicFilterBarConfig.remove(),
                    add: $ionicFilterBarConfig.add()
                }
            });
        }

        function onSubmit(key) {
            if (key) {
                // if we are already on search results page, load the product right away
                if ($state.current.name === 'app.results') {
                    $scope.$emit('search.submit', key);
                } else {
                    // otherwise navigate to search results page
                    $state.go('app.results', {
                        viewType: 'searchResults',
                        searchKey: key
                    });
                }
            }
        }

    }

})();