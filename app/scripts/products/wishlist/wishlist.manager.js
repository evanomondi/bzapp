(function () {
    'use strict';

    angular.module('app.products').factory('wishlistManager', wishlistManager);

    wishlistManager.$inject = ['$q', '$localStorage', 'Product', 'productsService', 'authErrorHandler', 'analytics', 'AnalyticsEvent'];

    function wishlistManager($q, $localStorage, Product, productsService, authErrorHandler, analytics, AnalyticsEvent) {
        var manager = {},
            $storage = $localStorage,            
            ids;
            

        $storage.wishlist = $storage.wishlist || [];

        // deserialize to Product model
        $storage.wishlist = $storage.wishlist.map(function (item) {
            // isFullProduct default value should be true to support < 2.0 wishlist items
            return Product.build(item);
        });

        manager.findProducts = findProducts;
        manager.addProduct = addProduct;
        manager.removeProduct = removeProduct;
        manager.isFavorite = isFavorite;

        return manager;

        function findProducts() {            

            if ($storage.wishlist.length > 0) {

                ids = $storage.wishlist.map(function (product) {
                    return product.id;
                }).join(',');

                return productsService.findProducts({
                    ids: ids,
                    pageSize: 100
                }).then(function (newProducts) {
                    angular.extend($storage.wishlist, newProducts);
                    return $storage.wishlist;
                }).catch(authErrorHandler);
            }
            else {
                return $q.resolve($storage.wishlist);
            }
        }

        function addProduct(product) {
            var foundProduct = $storage.wishlist.filter(function (item) {
                return item.id === product.id;
            });

            if (!foundProduct.length) {
                $storage.wishlist.push(product);
                analytics.logEvent(AnalyticsEvent.ADD_TO_WISHLIST, product);
            }
        }

        function removeProduct(productId) {
            var index = -1;
            for (var i = 0; i < $storage.wishlist.length; i++) {
                if ($storage.wishlist[i].id === productId) {
                    index = i;
                    break;
                }
            }

            if (index !== -1) {
                $storage.wishlist.splice(index, 1);
            }

            return $storage.wishlist;
        }

        function isFavorite(product) {
            var foundProduct = $storage.wishlist.filter(function (item) {
                return item.id === product.id;
            });

            return !!foundProduct.length;
        }


    }

})();