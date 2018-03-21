(function () {

    'use strict';

    angular.module('app.model').factory('Category', category);

    function category() {

        function Category() {}

        Category.prototype = {

            get id() {
                return this._id;
            },
            set id(value) {
                this._id = value;              
            },
            get title() {
                return this._title;
            },
            set title(value) {
                this._title = value;
            },
            get image() {
                return this._image;
            },
            set image(value) {
                this._image = value;           
            }
        };

        Category.build = function (source, adapter) {
            var category = new Category();
            if (adapter) {
                adapter.transform(category, source);
            } else {
                angular.extend(category, source);
            }

            return category;
        };

        return Category;
    }

})();