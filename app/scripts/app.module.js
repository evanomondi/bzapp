'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('app', ['ionic',
    'ionic.cloud',
    'ionicLazyLoad',
    'jett.ionic.scroll.sista',
    'jett.ionic.filter.bar',
    'ionic-modal-select',
    'ngStorage',
    'pascalprecht.translate',
    'ngMap',
    'app.core',
    'app.model',
    'app.plugin',
    'app.core.analytics',
    'app.home',
    'app.categories',
    'app.layout',
    'app.menu',
    'app.product.details',
    'app.products',
    'app.search',
    'app.shopping_cart',
    'app.order-history',
    'app.order-details',
    'app.checkout',
    'app.about'
]);
