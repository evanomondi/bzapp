(function () {
'use strict';
/*jshint ignore:start*/
 return angular.module("app.plugin")
.constant("PluginContext", {"NAME":"woocommerce","API_HOST":"http://wildlycoffee.co.ke","ROOT_CATEGORY":0,"SORTING_OPTIONS":[{"id":"date_asc","label":"products.sortNewest","value":"date+asc"},{"id":"title_asc","label":"products.sortAZ","value":"title+asc"},{"id":"title_desc","label":"products.sortZA","value":"title+desc"}],"CAPABILITIES":{"inAppCheckout":true,"authentication":true,"orderHistory":true,"paymentMethods":["stripe","paypal","cod","bacs","cheque"]}});
 /*jshint ignore:end*/
})();