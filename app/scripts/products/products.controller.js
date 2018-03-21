(function () {
    'use strict';

    angular.module('app.products').controller('ProductsController', ProductsController);

    ProductsController.$inject = [
        '$scope',
        '$http',
        '$state',
        '$stateParams',
        'productsManager',
        'categoryManager',
        '$ionicSearchPanel',
        '$ionicScrollDelegate',
        'CancelableHttpService'
    ];

    function ProductsController($scope, 
        $http, 
        $state, 
        $stateParams, 
        productsManager, 
        categoryManager, 
        $ionicSearchPanel, 
        $ionicScrollDelegate, 
        CancelableHttpService) {

        var vm = this,
            // Note: categoryId and storeCategoryId parameters are both required here
            // categoryId is set when navigating from navs(category tree)
            // storeCategoryId is set when navigating from blocks on home page or other places where category navs are not available
            categoryId = $stateParams.categoryId,
            storeCategoryId = $stateParams.storeCategoryId,
            searchKey = $stateParams.searchKey,
            viewType = $stateParams.viewType,
            currentPage = 0,
            PAGE_SIZE = 30;            

        // properties
        vm.products = [];
        vm.viewOptions = productsManager.viewOptions;
        vm.showTabs = false;
        vm.activeSlide = 0;
        vm.searchKey = searchKey;
        vm.productsLoading = false;
        vm.infiniteLoading = false;
        vm.noMoreProducts = false;
        vm.productRequest = null;
        // set view type specific properties
        productsManager.initViewModel(vm, viewType);

        // methods
        vm.handleSlideChange = handleSlideChange;
        vm.toggleViewMode = toggleViewMode;
        vm.loadMoreProducts = loadMoreProducts;
        vm.navigateToProductDetails = navigateToProductDetails;
        vm.handleSortChange = handleSortChange;

        $scope.$on('$ionicView.afterEnter', function (event, transition) {
            if (transition.direction !== 'back') {
                if (vm.hasTabs) {
                    vm.showTabs = true;
                    handleSlideChange(0);
                } else {
                    vm.productRequest = loadProducts(storeCategoryId, searchKey).then(function (products) {
                        $ionicScrollDelegate.scrollTop();
                        return applyProducts(products);

                    });
                }
            }
        });

        $scope.$on('search.submit', function (event, key) {
            searchKey = key;
            vm.pageTitle = searchKey;
            resetState();
            vm.productRequest = loadProducts(storeCategoryId, searchKey).then(function (products) {
                return applyProducts(products);
            });
        });

        function handleSlideChange(index) {
            var category;
            if (vm.subcategories && index in vm.subcategories) {
                categoryId = vm.subcategories[index].id;
                category = categoryManager.getCategoryNavById(categoryId);

                if (category) {
                    storeCategoryId = category.storeCategoryId;
                    resetState();
                    vm.productRequest = loadProducts(storeCategoryId, '').then(function (products) {
                        return applyProducts(products);
                    });
                }
            }
        }

        function loadProducts(storeCategoryId, searchKey) {
            var requestPromise = productsManager.findProducts({
                key: searchKey,
                storeCategoryId: storeCategoryId,
                page: currentPage,
                pageSize: PAGE_SIZE,
                sort: vm.viewOptions.sortOption.id
            });            

            vm.productsLoading = true;

            return requestPromise.then(function (result) {
                vm.productsLoading = false;
                return result;
            }, function (err) {
                if (err.status !== -1) {
                    vm.productsLoading = false;
                }
                throw err;
            });
        }

        function loadMoreProducts() {
            currentPage++;
            vm.infiniteLoading = true;
            loadProducts(storeCategoryId, searchKey).then(function (products) {
                if (products.length) {
                    vm.products = vm.products.concat(products);

                    if (products.length < PAGE_SIZE) {
                        vm.noMoreProducts = true;
                    }
                } else {
                    vm.noMoreProducts = true;
                }

            }).finally(function () {
                $scope.$broadcast('scroll.infiniteScrollComplete');
                vm.infiniteLoading = false;
            });
        }

        function navigateToProductDetails(product) {
            var detailsNavOptions = {
                'productId': product.id,
                'useCached': false
            };

            if (product.isFullProduct) {
                productsManager.setCurrentProduct(product);
                detailsNavOptions.useCached = true;
            }

            $state.go('app.product-details', detailsNavOptions);
        }

        function toggleViewMode() {
            productsManager.toggleViewMode();
        }

        function handleSortChange() {
            resetState();
            vm.productRequest = loadProducts(storeCategoryId, searchKey).then(function (products) {
                return applyProducts(products);
            });
        }

        function resetState() {
            currentPage = 0;
            vm.noMoreProducts = false;

            CancelableHttpService.cancelAll();
        }

        function applyProducts(products) {
            vm.products = products;
            return products;
        }
    }

})();