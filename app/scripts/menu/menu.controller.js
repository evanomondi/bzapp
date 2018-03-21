(function () {

    'use strict';

    angular.module('app.menu')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['shoppingCartManager', 'wishlistManager', 'categoryManager', 'userManager', 'eventBus', 'AuthEvent', 'AppContext'];

    function MenuController(shoppingCartManager, wishlistManager, categoryManager, userManager, eventBus, AuthEvent, AppContext) {
        var vm = this;
        vm.getCartQuantity = shoppingCartManager.getCartQuantity;
        vm.openAuthWindow = openAuthWindow;
        vm.logout = logout;
        vm.user = userManager.getUser();
        vm.sideMenuTitle = AppContext.SIDE_MENU_TITLE;
        vm.showLogo = AppContext.DISPLAY_LOGO_IN_SIDE_MENU;
        vm.useBlurryBackground = AppContext.BLURRY_SIDE_MENU_BACKGROUND;
        vm.menuItems = AppContext.SIDE_MENU_ITEMS;
        vm.getBadgeCount = getBadgeCount;
        vm.navigateToCategory = navigateToCategory;
        vm.navigateToExternalPage = navigateToExternalPage;

        wishlistManager.findProducts().then(function (wishlist) {
            vm.wishlist = wishlist;
        });

        shoppingCartManager.getCart().then(function (cart) {
            vm.cart = cart;
        });

        eventBus.on(AuthEvent.USER_LOGGED_IN, function (user) {
            vm.user = user;
        });

        eventBus.on(AuthEvent.USER_LOGGED_OUT, clearUser);

        eventBus.on(AuthEvent.SESSION_INVALIDATED, clearUser);

        function getBadgeCount(providerName) {
            if (providerName === 'cart') {
                return vm.getCartQuantity();
            }
            else if (providerName === 'wishlist') {
                return vm.wishlist ? vm.wishlist.length : 0;
            }
        }

        function openAuthWindow() {
            userManager.openAuth();
        }

        function navigateToExternalPage(ref) {
            if (window.cordova && window.cordova.InAppBrowser) {
                window.cordova.InAppBrowser.open(ref, '_blank', 'location=no,toolbar=yes');
            }
            else {
                window.open(ref, '_blank');
            }
        }

        function navigateToCategory(categoryId) {
            categoryManager.navigateToStoreCategory(categoryId);
        }

        function logout() {
            userManager.logout();
        }

        function clearUser() {
            vm.user = null;
        }
    }
})();
