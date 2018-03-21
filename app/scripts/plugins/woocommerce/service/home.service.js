(function () {

    'use strict';

    angular.module('app.plugin.service')
        .factory('homeService', HomeService);

    HomeService.$inject = ['$q', '$http', 'AppContext', 'Home', 'homeAdapter', 'categoryService'];


    function HomeService($q, $http, AppContext, Home, homeAdapter, categoryService) {

        return {
            getHomeData: getHomeData
        };

        function getHomeData() {
            var promises = [],
                homeData = Home.build({
                    blocks: AppContext.HOME_BLOCKS
                }, homeAdapter),
                blocks = homeData.blocks;

            for (var i = 0; i < blocks.length; i++) {
                promises.push(loadBlockData(blocks[i]));
            }

            return $q.all(promises).then(function () {
                return homeData;
            });
        }

        function loadBlockData(block) {
            // if storeCategoryId was specified load from the backend
            if (block.storeCategoryId) {
                return categoryService.getCategoryById(block.storeCategoryId).then(function (data) {
                    block.title = block.title || data.title;
                    if (data.image) {
                        block.image = block.image || data.image.src;
                    }

                    return block;
                }).catch(function () {
                    return block;
                });

            } else {
                return $q.when(block);
            }
        }
    }

})();