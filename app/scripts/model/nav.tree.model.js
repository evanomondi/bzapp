(function () {

    'use strict';

    angular.module('app.model').factory('NavTree', categoryTree);

    function categoryTree() {

        function CategoryTree() {}

        CategoryTree.prototype = {

            get categories() {
                return this._categories;
            },
            set categories(value) {
                this._categories = value;
            }

        };

        CategoryTree.build = function (source, adapter) {
            var categoryTree = new CategoryTree();
            if (adapter) {
                adapter.transform(categoryTree, source);
            } else {
                angular.extend(categoryTree, source);
            }

            return categoryTree;
        };

        return CategoryTree;
    }

})();