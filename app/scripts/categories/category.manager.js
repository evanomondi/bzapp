(function () {

    'use strict';

    angular.module('app.categories')
        .factory('categoryManager', CategoryManager);

    CategoryManager.$inject = ['$q', '$state', 'categoryService'];


    function CategoryManager($q, $state, categoryService) {

        var navTree = [],
            treeLoaded = false;

        return {
            loadNavTree: loadNavTree,
            getNavTree: getNavTree,
            getCategoryNavById: getCategoryNavById,
            navigateToCategory: navigateToCategory,
            navigateToStoreCategory: navigateToStoreCategory
        };

        function loadNavTree() {
            return categoryService.getNavTree().then(function (newTree) {
                navTree = newTree;
                treeLoaded = true;
                return navTree;
            });
        }

        function getNavTree() {
            if (treeLoaded) {
                return $q.when(navTree);
            } else {
                return loadNavTree();
            }
        }

        function getCategoryNavById(categoryId) {
            var category,
                currentCategories = navTree.categories;

            if (typeof arguments[1] !== 'undefined') {
                currentCategories = arguments[1];
            }

            for (var i = 0; i < currentCategories.length; i++) {
                category = currentCategories[i];
                if (category.id === categoryId) {
                    return category;
                }
            }
            for (i = 0; i < currentCategories.length; i++) {
                category = getCategoryNavById(categoryId, currentCategories[i].categories);
                if (category) {
                    return category;
                }
            }

            return null;
        }

        function navigateToCategory(categoryId) {
            var options = getCategoryNavigationOptions(categoryId);

            $state.go(options.route, options.params);
        }

        function navigateToStoreCategory(storeCategoryId) {
            $state.go('app.products', {
                viewType: 'productsNoCategories',
                storeCategoryId: storeCategoryId
            });
        }

        function getCategoryNavigationOptions(categoryId) {
            var category = getCategoryNavById(categoryId),
                childCategories = category ? category.categories : [],
                childCategory,
                showProducts = true,
                hasChildCategories = true,
                options = {};

            // if child there are no subcategories we should show products
            if (childCategories.length) {
                for (var i = 0; i < childCategories.length; i++) {
                    childCategory = childCategories[i];

                    // if at least one child category has subcategories we should not show products
                    if (childCategory.categories.length !== 0) {
                        showProducts = false;
                    }
                }
            } else {
                hasChildCategories = false;
            }

            if (showProducts) {
                if (hasChildCategories) {
                    options.route = 'app.products_with_tabs';
                } else {
                    options.route = 'app.products';
                }

            } else {
                options.route = 'app.categories';
            }

            options.params = {};

            if (hasChildCategories) {
                options.params.viewType = 'productsWithCategories';
                options.params.categoryId = category.id;
            } else {
                options.params.viewType = 'productsNoCategories';
                options.params.storeCategoryId = category.storeCategoryId;
            }

            return options;
        }        
    }

})();