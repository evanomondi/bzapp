(function () {

    'use strict';

    angular.module('app.model').factory('CategoryNav', categoryNav);

    function categoryNav() {

        function CategoryNav() {}

        CategoryNav.prototype = {

            get id() {
                return this._id;
            },
            set id(value) {
                if (value) {
                    this._id = value.toString();
                }
                else {
                    this._id = null;
                }                
            },
            get title() {
                return this._title;
            },
            set title(value) {
                this._title = value;
            },
            get storeCategoryId() {
                return this._storeCategoryId;
            },
            set storeCategoryId(value) {
                if (value) {
                    this._storeCategoryId = value.toString();
                }
                else {
                    this._storeCategoryId = null;
                }                
            },
            get categories() {
                return this._categories;
            },
            set categories(value) {
                this._categories = value;
            }
        };

        CategoryNav.build = function (source, adapter) {
            var category = new CategoryNav();
            if (adapter) {
                adapter.transform(category, source);
            } else {
                angular.extend(category, source);
            }

            return category;
        };

        return CategoryNav;
    }

})();