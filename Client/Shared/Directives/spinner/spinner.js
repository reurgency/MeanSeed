'use strict';

/* Directives */


angular.module('shared.directives.spinner', [])

    .directive('spinner', [
        function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {

                },
                templateUrl: '/Shared/Directives/spinner/spinner-12bar.tpl.html',
                controller: [ "$scope", "$element", "$attrs", "$rootScope",
                    function ($scope, $element, $attrs, $rootScope) {
                        $scope.globalCallCount = $rootScope.spinnerScope.globalCallCount;
                        $rootScope.spinnerScope = $scope;
                        $scope.show = $scope.globalCallCount != 0;

                        $scope.spinnerStopFunction = function () {
                            $scope.show = false;
                        }

                        $scope.spinnerStartFunction = function () {
                            $scope.show = true;
                        }

                        $scope.$on('spinnerStart', $scope.spinnerStartFunction);

                        $scope.$on('spinnerStop', $scope.spinnerStopFunction);

                    }
                ]
            }
        }
    ]
    )

    .config(['$httpProvider', '$provide', function ($httpProvider, $provide) {
        var rootScope;

        var spinnerStart = function () {
            if (rootScope.spinnerScope == rootScope) {
                rootScope.spinnerScope.$broadcast('spinnerStart');
            } else {
                rootScope.spinnerScope.spinnerStartFunction();
            }
        }

        var spinnerStop = function () {
            if (rootScope.spinnerScope == rootScope) {
                rootScope.spinnerScope.$broadcast('spinnerStop');
            } else {
                rootScope.spinnerScope.spinnerStopFunction();
            }
        }

        $provide.factory('httpInterceptor', ['$q', '$window', '$rootScope', function ($q, $window, $rootScope) {
            rootScope = $rootScope;
            //The spinner scope will not be created yet.  Temporarily set it to the root scope
            $rootScope.spinnerScope = $rootScope;
            $rootScope.spinnerScope.globalCallCount = 0;

            return function (promise) {
                return promise.then(function (response) {
                    //if (!response.config || !response.config.data || !response.config.data.dontShowSpinner) {
                    //(JNewton) Changed the spinner to use headers instead of parameters.
                    if(!response.config.headers.dontShowSpinner){
                        $rootScope.spinnerScope.globalCallCount--;
                        if (!$rootScope.spinnerScope.globalCallCount) {
                            // hide the spinner
                            spinnerStop();
                        }
                    }
                    return response;

                }, function (response) {
                    //if (!response.config || !response.config.data || !response.config.data.dontShowSpinner) {
                    //(JNewton) Changed the spinner to use headers instead of parameters.
                    if (!response.config.headers.dontShowSpinner) {
                        $rootScope.spinnerScope.globalCallCount--;
                        if (!$rootScope.spinnerScope.globalCallCount) {
                            // hide the spinner
                            spinnerStop();
                        }
                    }
                    return $q.reject(response);
                });
            };
        }]);

        $httpProvider.responseInterceptors.push('httpInterceptor');

        var spinnerFunction = function (data, headersGetter) {
            //if (data) {
            //    var parsedData = angular.fromJson(data);
            //    if (!parsedData.dontShowSpinner) {
            //        rootScope.spinnerScope.globalCallCount++;
            //        spinnerStart();
            //    }
            //} else {
            //    rootScope.spinnerScope.globalCallCount++;
            //    spinnerStart();
            //}
            //(JNewton) Changed the spinner to use headers instead of parameters.
            var headers = angular.fromJson(headersGetter());
            if (!headers.dontShowSpinner) {
                rootScope.spinnerScope.globalCallCount++;
                spinnerStart();
            }
            return data;
        };

        $httpProvider.defaults.transformRequest.push(spinnerFunction);
    }]);