'use strict';

/* Directives */


angular.module( 'shared.directives.dropdown', [] )

    .directive( 'dropdown', [

        '$compile',
        '$http',
        '$templateCache',
        '$parse',

        function( $compile, $http, $templateCache, $parse )
        {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                provider: "=",
                selectedItem: "=",
                labelField: "@",
                templateUrl: "@",
                change: "@"
            },
            defaultTemplateUrl: '/Shared/Directives/dropdown/dropdown.html',

            compile: function (tElement, tAttrs) {
                var templateLoader;
                if (!tAttrs.templateUrl && this.defaultTemplateUrl) {
                    tAttrs.templateUrl = this.defaultTemplateUrl;
                }
                if (tAttrs.templateUrl) {
                    templateLoader = $http.get(tAttrs.templateUrl, { cache: $templateCache })
                      .success(function (html) {
                          tElement.html(html);
                      });
                }

                return function (scope, element, attrs) {
                    if (templateLoader) {
                        templateLoader.then(function (templateText) {
                            element.html($compile(tElement.html())(scope));
                        });
                    }
                };
            },

            controller:['$scope', '$element', '$attrs', 
                function ($scope, $element, $attrs) {
                $scope.changeHandlerFunction = angular.noop;

                function changeHandler(newValue, oldValue) {
                    if (newValue) {
                        $scope.changeHandlerFunction = $parse(newValue);
                    } else {
                        $scope.changeHandlerFunction = angular.noop;
                    }
                }
                $scope.$watch('change', changeHandler);

                if (!$scope.provider) {
                    $scope.provider = [];
                }

                $scope.itemLabel = function (item) {
                    if (item) {
                        return item[$scope.labelField];
                    }
                    return "";
                }

                $scope.selectItem = function (item) {
                    var oldItem = $scope.selectedItem;
                    $scope.selectedItem = item;
                    $scope.changeHandlerFunction($scope.$parent, { newItem: item, oldItem: oldItem });
                }

            }]
        };
    }]);