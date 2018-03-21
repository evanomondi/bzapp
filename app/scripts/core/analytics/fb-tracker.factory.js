(function () {

    'use strict';

    angular.module('app.core.analytics').factory('facebookTracker', fbTracker);

    fbTracker.$inject = ['AnalyticsEvent', 'shopManager'];

    function fbTracker(AnalyticsEvent, shopManager) {

        var EVENT_MAPPING = createEventMapping();

        return {
            logEvent: logEvent
        };

        function logEvent(eventName, payload) {
            /* globals facebookConnectPlugin: false */
            try {
                var valueToSum,
                    product,
                    finalPrice,
                    cart,
                    eventNameToSend,
                    eventParameters = {},
                    currency = shopManager.getShop().currency,
                    trackEvent = true;

                switch (eventName) {
                case AnalyticsEvent.ADD_TO_CART:
                    product = payload.product;
                    finalPrice =  product.finalPrice;
                    valueToSum = finalPrice * payload.quantity;
                    eventParameters = {
                        fb_content_type: 'product',
                        fb_content_id: product.id,
                        fb_currency: currency
                    };
                    break;
                case AnalyticsEvent.ADD_TO_WISHLIST:
                    product = payload;
                    finalPrice =  product.finalPrice;
                    valueToSum = finalPrice;
                    eventParameters = {
                        fb_content_type: 'product',
                        fb_content_id: product.id,
                        fb_currency: currency
                    };
                    break;
                case AnalyticsEvent.CHECKOUT_START:
                    cart = payload;
                    valueToSum = cart.total;
                    eventParameters = {
                        fb_num_items: cart.items.length,
                        fb_currency: currency
                    };
                    break;
                case AnalyticsEvent.PURCHASE:
                    cart = payload.cart;
                    valueToSum = cart.total;
                    eventParameters = {
                        fb_num_items: cart.items.length,
                        fb_currency: currency
                    };
                    break;
                case AnalyticsEvent.PRODUCT_SEARCH:
                    eventParameters = {
                        fb_search_string: payload.key,
                        fb_success: payload.found
                    };
                    break;
                case AnalyticsEvent.PRODUCT_VIEW:
                    product = payload;
                    valueToSum = product.finalPrice;
                    eventParameters = {
                        fb_content_type: 'product',
                        fb_content_id: product.id,
                        fb_currency: currency
                    };
                    break;
                case AnalyticsEvent.REGISTER:
                    eventParameters = {
                        'fb_registration_method': payload.method
                    };
                    break;
                default:
                    // only track events that are explicitly listed above
                    trackEvent = false;
                }

                if (trackEvent) {
                    eventNameToSend = EVENT_MAPPING[eventName] || eventName;

                    if (typeof facebookConnectPlugin !== 'undefined') {
                        facebookConnectPlugin.logEvent(eventNameToSend, eventParameters, valueToSum);
                    } else {
                        console.log('fbTracker: ', eventNameToSend, valueToSum, eventParameters);
                    }
                }

            } catch (err) {}
        }

        function createEventMapping() {
            var eventMapping = {};

            eventMapping[AnalyticsEvent.APP_START] = 'fb_mobile_activate_app';
            eventMapping[AnalyticsEvent.ADD_TO_CART] = 'fb_mobile_add_to_cart';
            eventMapping[AnalyticsEvent.ADD_TO_WISHLIST] = 'fb_mobile_add_to_wishlist';
            eventMapping[AnalyticsEvent.REGISTER] = 'fb_mobile_complete_registration';
            eventMapping[AnalyticsEvent.LOG_IN] = 'fb_mobile_login';
            eventMapping[AnalyticsEvent.CHECKOUT_START] = 'fb_mobile_initiated_checkout';
            eventMapping[AnalyticsEvent.PURCHASE] = 'fb_mobile_purchase';
            eventMapping[AnalyticsEvent.PRODUCT_SEARCH] = 'fb_mobile_search';
            eventMapping[AnalyticsEvent.PRODUCT_VIEW] = 'fb_mobile_content_view';
            eventMapping[AnalyticsEvent.CATEGORY_VIEW] = 'fb_mobile_content_view';

            return eventMapping;
        }
    }

})();