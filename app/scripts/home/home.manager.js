(function () {

    'use strict';

    angular.module('app.home').factory('homeManager', homeManager);

    homeManager.$inject = ['$q', 'categoryManager', 'homeService', 'authErrorHandler'];

    function homeManager($q, categoryManager, homeService, authErrorHandler) {

        // TODO: the block count should probably come from the settings
        var blockCount = 2,
            manager = {
                viewData: {},
                navigateToCategory: navigateToCategory,
                navigateFromBlock: navigateFromBlock
            };

        function init() {
            var homeDataPromise = homeService.getHomeData().catch(authErrorHandler);
            manager.viewData.blocks = new Array(blockCount);
            manager.viewData.blockLoader = homeDataPromise.then(function (home) {
                manager.viewData.blocks = home.blocks;
            });
        }

        function navigateFromBlock(block) {
            if (block && block.storeCategoryId) {
                categoryManager.navigateToStoreCategory(block.storeCategoryId);
            }
        }

        function navigateToCategory(category) {
            categoryManager.navigateToCategory(category.id);
        }

        init();

        return manager;
    }

})();