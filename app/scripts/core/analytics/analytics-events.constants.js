(function () {

	'use strict';

	angular.module('app.core.analytics').constant('AnalyticsEvent', {
		APP_START: 'app_start',
		ADD_TO_CART: 'add_to_cart',
		REMOVE_FROM_CART: 'remove_from_cart',
		ADD_TO_WISHLIST: 'add_to_wishlist',
		REGISTER: 'register',
		LOG_IN: 'log_in',
		LOG_OUT: 'log_out',
		CHECKOUT_START: 'checkout_start',
		CHECKOUT_SHIPPING: 'checkout_shipping',
		CHECKOUT_BILLING: 'checkout_billing',		
		PURCHASE: 'purchase',
		PRODUCT_SEARCH: 'product_search',
		PRODUCT_VIEW: 'product_view'
	});


})();

