(function () {
    'use strict';

    angular.module('app.products').factory('productsManager', productsManager);

    productsManager.$inject = [
        '$http',
        '$translate',
        '$stateParams',
        'categoryManager',
        'wishlistManager',
        'shopManager',
        'productsService',
        'PluginContext',
        'AppContext',
        '$ionicScrollDelegate',
        'authErrorHandler',
        'analytics', 
        'AnalyticsEvent'
    ];

    function productsManager(
        $http,
        $translate,
        $stateParams,
        categoryManager,
        wishlistManager,
        shopManager,
        productsService,
        PluginContext,
        AppContext,
        $ionicScrollDelegate,
        authErrorHandler,
        analytics,
        AnalyticsEvent) {

        var manager = {},
            LIST_VIEW = 'listview',
            GRID_VIEW = 'gridview',
            currentProduct,

            viewModelProperties = {
                productsWithCategories: function () {
                    angular.extend(this, {
                        pageTitle: $translate.instant('products.title'),
                        hasTabs: true,
                        allowRemoveProducts: false,
                        hasOptionBar: true,
                        noProductsText: $translate.instant('products.noProducts')
                    });

                    this.subcategories = getNavigationLinks($stateParams.categoryId);
                },
                productsNoCategories: function () {
                    angular.extend(this, {
                        pageTitle: $translate.instant('products.title'),
                        hasTabs: false,
                        allowRemoveProducts: false,
                        hasOptionBar: true,
                        noProductsText: $translate.instant('products.noProducts'),
                        subcategories: []
                    });
                },
                searchResults: function () {
                    angular.extend(this, {
                        hasTabs: false,
                        allowRemoveProducts: false,
                        hasOptionBar: true,
                        noProductsText: $translate.instant('search.noProducts'),
                        subcategories: []
                    });
                    this.pageTitle = this.searchKey;
                },
                wishlist: function () {
                    angular.extend(this, {
                        pageTitle: $translate.instant('wishlist.title'),
                        hasTabs: false,
                        allowRemoveProducts: true,
                        hasOptionBar: false,
                        noProductsText: $translate.instant('wishlist.noProducts'),
                        subcategories: []
                    });
                }
            };

        manager.viewOptions = {
            viewMode: GRID_VIEW,
            sortOptions: PluginContext.SORTING_OPTIONS,
            sortOption: PluginContext.SORTING_OPTIONS[0],
            currency: shopManager.getShop().currency,
            displayVendor: AppContext.DISPLAY_VENDOR
        };

        manager.initViewModel = initViewModel;
        manager.getNavigationLinks = getNavigationLinks;
        manager.findProducts = findProducts;
        manager.getProductDetails = getProductDetails;
        manager.toggleViewMode = toggleViewMode;
        manager.getCurrentProduct = getCurrentProduct;
        manager.setCurrentProduct = setCurrentProduct;

        return manager;

        function getNavigationLinks(parentCategory) {
            var category = categoryManager.getCategoryNavById(parentCategory),
                subcategories;

            if (category) {
                subcategories = category.categories.concat();
                subcategories.unshift({
                    title: $translate.instant('products.all'),
                    id: parentCategory
                });
            }

            return subcategories;
        }

        /**
         * @param  {string}
         * @param  {Object} Map of search options
         * @return {[type]} Array of products
         */
        function findProducts(options) {
            return productsService.findProducts(options)
                .then(function (products) {
                    // track searches
                    if (options.key) {
                        analytics.logEvent(AnalyticsEvent.PRODUCT_SEARCH, {
                            key: options.key,
                            found: products.length > 0
                        });
                    }
                    return products;
                })
                .catch(authErrorHandler);
        }

        function getProductDetails(productId) {
            return productsService.getProductDetails(productId).catch(authErrorHandler);
        }

        function toggleViewMode() {
            if (manager.viewOptions.viewMode === LIST_VIEW) {
                manager.viewOptions.viewMode = GRID_VIEW;
            } else {
                manager.viewOptions.viewMode = LIST_VIEW;
            }

            // scroll 1px up and down in order to trigger lazy image download but stay on the same scroll position
            $ionicScrollDelegate.scrollBy(0, 1, false);
            $ionicScrollDelegate.scrollBy(0, -1, false);
        }

        function initViewModel(vm, viewType) {
            viewModelProperties[viewType].apply(vm);
        }

        function setCurrentProduct(product) {
            currentProduct = product;
        }

        function getCurrentProduct() {
            return currentProduct;
        }
    }

})();