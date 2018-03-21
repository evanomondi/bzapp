(function () {

    'use strict';

    angular.module('app.plugin.service').factory('productsService', ProductsService);

    ProductsService.$inject = ['woocommerceService', 'PluginContext', 'Product', 'productDetailsAdapter'];

    function ProductsService(service, PluginContext, Product, productDetailsAdapter) {

        return {
            getProductsForCategory: getProductsForCategory,
            getProductDetails: getProductDetails,
            findProducts: findProducts,
        };

        function getProductsForCategory(categoryId) {
            return findProducts({
                category: categoryId
            });
        }

        function findProducts(options) {

            var path = 'products',
                params = {
                    search: options.key || '',
                    status: 'publish',
                    category: options.storeCategoryId || '',
                    per_page: options.pageSize,
                    page: (typeof options.page === 'number') ? options.page + 1 : '',
                    include: options.ids || ''
                };

            addSortParams(params, options.sort);

            cleanParams(params);

            return service.call(path, 'get', params).then(function (result) {
                return processProducts(result.data);
            }, function (e) {
                throw e;
            });
        }

        function addSortParams(params, sort) {
            var sortOption,
                sortVal,
                sortSplit,
                sortBy,
                sortDirection;

            // sorting options
            if (sort) {
                sortOption = getSortOptionsById(PluginContext.SORTING_OPTIONS, sort);
                if (sortOption) {
                    sortVal = sortOption.value;

                    sortSplit = sortVal.split('+');
                    sortBy = sortSplit[0];
                    sortDirection = sortSplit[1];

                    params.orderby = sortBy;
                    params.order = sortDirection;
                }
            }
        }

        function getSortOptionsById(options, id) {
            var filteredOptions = options.filter(function (option) {
                return option.id === id;
            });

            if (filteredOptions.length) {
                return filteredOptions[0];
            } else {
                return null;
            }
        }

        function getProductDetails(productId) {
            return service.call('products/' + productId).then(function (result) {
                    return processProductDetails(result.data);
                }, function (e) {
                    throw e;
                });
        }

        function processProducts(products) {
            return products.map(processProduct);
        }

        function processProduct(product) {
            var newProduct = Product.build(product, productDetailsAdapter);
            return newProduct;
        }

        function processProductDetails(product) {
            var newProduct = Product.build(product, productDetailsAdapter);
            return newProduct;
        }

        function cleanParams(params) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    //Now, object[key] is the current value
                    if (params[key] === null || params[key] === '') {
                        delete params[key];
                    }
                }
            }
        }
    }

})();