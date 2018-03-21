(function () {

    'use strict';

    angular.module('app.plugin.service')
        .factory('categoryService', CategoryService);


    CategoryService.$inject = ['woocommerceService', 'PluginContext', 'NavTree', 'navTreeAdapter', 'Category', 'categoryAdapter'];

    function CategoryService(service, PluginContext, NavTree, navTreeAdapter, Category, categoryAdapter) {

        return {
            getNavTree: getNavTree,
            getCategoryById: getCategoryById
        };

        function getNavTree() {
            var path = 'products/categories';

            return service.call(path, 'get', {
                per_page: 100
            }).then(function (result) {
                var tree = NavTree.build(result.data, navTreeAdapter);

                return tree;
            });
        }

        function getCategoryById(categoryId) {
            var url = 'products/categories/'+categoryId;

            return service.call(url).then(function (result) {
                return Category.build(result.data, categoryAdapter);
            });
        }
    }

})();