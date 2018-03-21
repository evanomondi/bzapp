(function () {

    'use strict';

    angular.module('common').directive('inputMask', inputMask);

    function inputMask() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                var ONLY_NUMBERS_PATTERN = /[^0-9]/g,
                    MASK_TYPE_CARD_NUMBER = 'cardNumber',
                    MASK_TYPE_CARD_MONTH = 'cardMonth',
                    MASK_TYPE_CARD_YEAR = 'cardYear',
                    MASK_TYPE_CARD_CVV = 'cardCVV',
                    MAX_CARD_NUMBER_LENGTH = 19,
                    maskType = attr.inputMask,
                    maxLength = null,
                    parser = null,
                    formattedString = null;

                element.bind('keyup', function () {
                    ngModelCtrl.$render();
                });

                switch (maskType) {
                    case MASK_TYPE_CARD_NUMBER:
                        //Including 4 spaces between groups of 4 digits
                        maxLength = MAX_CARD_NUMBER_LENGTH + 4;
                        parser = cardNumberParser;
                        break;
                    case MASK_TYPE_CARD_MONTH:
                        parser = cardMonthParser;
                        break;
                    case MASK_TYPE_CARD_YEAR:
                        parser = cardYearParser;
                        break;
                    case MASK_TYPE_CARD_CVV:
                        parser = onlyNumbersParser;
                        break;
                }

                if (maxLength) {
                    element.attr('maxlength', maxLength);
                }

                ngModelCtrl.$parsers.push(parserExecutor);

                function parserExecutor(source) {
                    if (!source) {
                        return source;
                    }

                    var trimmed = parser(source);

                    if (trimmed !== source) {
                        formattedString = trimmed;
                        ngModelCtrl.$setViewValue(trimmed);
                    }

                    return trimmed;
                }

                function cardMonthParser(source) {
                    if (source > 12 || source < 0) {
                        source = Number(String(source).substr(0, 1));
                    }

                    return source;
                }

                function cardNumberParser(source) {
                    var trimmed = source.replace(ONLY_NUMBERS_PATTERN, '');
                    if (trimmed !== '') {
                        trimmed = trimmed.match(new RegExp('.{1,4}', 'g')).join(' ');
                    }

                    return trimmed;
                }

                function cardYearParser(source) {
                    var currentYear = Number(new Date().getFullYear().toString().substr(2, 2)),
                        currentYearFirstDigit = String(currentYear).substr(0, 1);

                    if (String(source).length === 1) {
                        if (source < currentYearFirstDigit || source > currentYearFirstDigit + 1) {
                            source = null;
                        }
                    } else {
                        if (source < currentYear || String(source).length > 2) {
                            source = Number(String(source).substr(0, String(source).length - 1));
                        }
                    }

                    return source;
                }

                function onlyNumbersParser(source) {
                    if (String(source).length > 4) {
                        source = Number(String(source).substr(0, 4));
                    }

                    return source;
                }
            }
        };
    }
})();





