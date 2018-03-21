(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('navTreeAdapter', adapter);

    adapter.$inject = ['CategoryNav', 'categoryNavAdapter', 'PluginContext'];

    function adapter(CategoryNav, categoryNavAdapter, PluginContext) {

        return {
            transform: function (destination, source) {                    
                destination.categories = buildCategoryTree(source, PluginContext.ROOT_CATEGORY);
            }
        };    

        function buildCategoryTree(links, rootCategory) {
            var tree = [];
            links.forEach(function (link) {
                var category;

                if (link.parent === rootCategory) {
                    category = CategoryNav.build(link, categoryNavAdapter);
                    tree.push(category);
                    category.categories = buildCategoryTree(links, link.id);
                }

            });

            return tree;
        } 
    }

})();