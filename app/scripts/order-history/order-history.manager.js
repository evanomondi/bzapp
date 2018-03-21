(function () {

    'use strict';

    angular.module('app.order-history').factory('orderHistoryManager', orderHistoryManager);

    orderHistoryManager.$inject = [
    'orderService',
    'authErrorHandler', 
    'shopManager', 
    '$ionicScrollDelegate', 
    '$translate',
    'connectivity'];

    function orderHistoryManager(
        orderService, 
        authErrorHandler, 
        shopManager, 
        $ionicScrollDelegate, 
        $translate,
        connectivity) {

        var manager = {
                viewData: {
                    emptyMessage: $translate.instant('orderHistory.ordersEmptyMessage'),
                    errorMessage: $translate.instant('orderHistory.ordersErrorMessage'),
                    currency: shopManager.getShop().currency
                },
                init: init,
                loadOrders: loadOrders,
                loadMoreOrders: loadMoreOrders,
                refreshOrders: refreshOrders
            },
            currentPage = 0,
            pageSize = 20;

        return manager;

        function init() {
            manager.viewData.orders = [];            
            manager.viewData.orderLoader = null;
        } 

        function loadOrders() {
            manager.viewData.orderLoader = resetOrders();
            return manager.viewData.orderLoader;            
        }

        function refreshOrders() {
            return resetOrders().catch(function() {
                connectivity.showError(manager.viewData.errorMessage);
            });
        }       

        function loadMoreOrders() {
            manager.viewData.loadingMoreOrders = true;
            currentPage++;
            return getOrders({
                    page: currentPage,
                    pageSize: pageSize
                })
                .then(function (orders) {
                    manager.viewData.noMoreOrders = orders.length < pageSize;
                    manager.viewData.orders = manager.viewData.orders.concat(orders);
                })
                .catch(function () {
                    // bounce up a bit to prevent consecutive loads
                    $ionicScrollDelegate.scrollBy(0, -40, true);
                })
                .finally(function () {
                    manager.viewData.loadingMoreOrders = false;
                });
        }

        function resetOrders() {
            resetInifiniteScrollOptions();           

            return getOrders({
                page: currentPage,
                pageSize: pageSize
            }).then(function (orders) {
                manager.viewData.orders = orders;
                return orders;
            });
        }

        function getOrders(options) {
            return orderService.getOrders(options).then(function (orders) {
                orders = adjustOrdersForView(orders);
                return orders;
            }).catch(authErrorHandler);            
        }        

        function adjustOrdersForView(orders) {
            orders.forEach(function (order) {
                order.products = buildProductString(order.items);
                order.status = order.status.charAt(0).toUpperCase() + order.status.substring(1);
            });
            return orders;
        }

        function buildProductString(products) {
            return products.reduce(function (prev, cur, idx) {
                prev += cur.title + ' x' + cur.quantity + (idx === products.length - 1 ? '' : ', ');
                return prev;
            }, '');
        }

        function resetInifiniteScrollOptions() {
            currentPage = 0;
            manager.viewData.noMoreOrders = false;
            manager.viewData.loadMoreOrders = false;
        }
    }

})();