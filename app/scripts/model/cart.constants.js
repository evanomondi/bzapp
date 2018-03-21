(function () {

    'use strict';

    return angular.module('app.model')
        .constant('CheckoutProcess', {
            'EXTERNAL': 'external',
            'IN_APP': 'inapp'            
        });
})();