(function () {

    'use strict';

    module.exports = function () {
        return {
            wcAPIEndpoint: [{
                'type': 'input',
                'name': 'apiEndpoint',
                'message': 'Enter your WooCommerce store URL, e.g. https://mystore.com',
                'default': '',
                'validate': function (input) {
                    if (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(input)) {
                        return true;
                    } else {
                        return 'Not a valid URL.';
                    }
                },
                'filter': function (input) {
                    var result = input;
                    if (result.charAt(result.length - 1) === '/') {
                        result = result.substring(0, result.length - 1);
                    }
                    return result;
                }
            }]
        };
    };
})();