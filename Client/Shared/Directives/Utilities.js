'use strict';

/* Directives */


angular.module('Shared.Directives.Utilities', [])

    .directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }])

    .directive('compareText', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstTextBox = '#' + attrs.compareText;
                elem.add(firstTextBox).on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val() === $(firstTextBox).val();
                        ctrl.$setValidity('textMatch', v);
                    });
                });
            }
        }
    }])

    .directive('defaultImage', [ function () {
        return {
            restrict: 'A',
            controller:['$scope', '$element', '$attrs',
                function ($scope, $element, $attrs) {

                    function brokenImageFunction() {
                        //Remove the old error handler
                        $element.unbind("error");
                        //Add a new one
                        $element.bind('error', brokenImageErrorHandler);
                        //Watch for load
                        $element.bind('load', brokenImageLoadFunction);

                        $element[0].src = $attrs.defaultImage;
                    };

                    function brokenImageErrorHandler() {
                        //If the error image errors, remove the bindings.
                        //Should we watch for error again though?  Probably
                        //because the broken image link may change
                        $element.unbind("error");
                        $element.unbind("load");

                        $element.bind('error', brokenImageFunction);
                    }

                    function brokenImageLoadFunction() {
                        //The broken image loaded successfully.  Remove
                        //the broken image test bindings and apply
                        //the original
                        $element.unbind("error");
                        $element.unbind("load");

                        $element.bind('error', brokenImageFunction);
                    }

                    $element.bind('error', brokenImageFunction);
                }]
        };
    }])
    /* Add other utility directives here */
;
