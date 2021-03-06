(function () {
    'use strict';

    angular.module('app.products').controller('WishlistController', WishlistController);

    WishlistController.$inject = ['$scope', '$q', '$http', '$state', '$stateParams', 'productsManager', 'wishlistManager', '$ionicScrollDelegate'];

    function WishlistController($scope, $q, $http, $state, $stateParams, productsManager, wishlistManager, $ionicScrollDelegate) {

        var vm = this,
            viewType = $stateParams.viewType,
            currentPage = 0,
            PAGE_SIZE = 30;            

        // properties
        vm.products = [];
        vm.viewOptions = productsManager.viewOptions;
        vm.activeSlide = 0;
        vm.noMoreProducts = false;        
        vm.productRequest = null;        
        vm.limit = PAGE_SIZE;
        // set view type specific properties
        productsManager.initViewModel(vm, viewType);

        // methods        
        vm.toggleViewMode = toggleViewMode;
        vm.loadMoreProducts = loadMoreProducts;
        vm.navigateToProductDetails = navigateToProductDetails;
        vm.removeFromWishlist = removeFromWishlist;
        vm.handleSortChange = handleSortChange;

        $scope.$on('$ionicView.afterEnter', function (event, transition) {
            if (transition.direction !== 'back') {
                vm.productRequest = loadProducts().then(function (products) {
                    if (vm.limit >= products.length) {
                        vm.noMoreProducts = true;
                    }
                    $ionicScrollDelegate.scrollTop();

                    return applyProducts(products);                    
                });
            }
        });

        function loadProducts() {
            return wishlistManager.findProducts();
        }

        function loadMoreProducts() {
            currentPage++;
            vm.limit = currentPage * PAGE_SIZE + PAGE_SIZE;
            if (vm.limit >= vm.products.length) {
                vm.noMoreProducts = true;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
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

        function removeFromWishlist(productId) {            
            vm.productRequest = $q.when(applyProducts(wishlistManager.removeProduct(productId)));            
        }

        function handleSortChange() {

        }

        function applyProducts(products) {
            vm.products = products;            
            return products;
        }
    }

})();