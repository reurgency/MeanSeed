'use strict';

//JNewton - Added reference to ngRoute.  It is a module which was 
//newly separated from the core in AngularJS 1.2

// Declare app level module which depends on filters, services and directives
angular.module('TaskApp', [
    'ngCookies',
    'ngRoute',
    'Shared.Filters.filters',
    'Shared.Services.SharedDataService',
    'Shared.Services.ConfigService',
    'Shared.Services.PaginatorService',
    'Shared.Directives.Utilities',
    'shared.directives.spinner',
    'TaskApp.Resources',
    'Login',
    'TaskApp.task',
    "TaskApp.Templates"
  ])


  .config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      //.when(
      //'/',
      //{
      //templateUrl: '/TaskApp/Login/login.tpl.html',
      //controller: 'LoginController'
      //}
      //)
      .otherwise({ redirectTo: '/task' });
  }])


  .run(
    [
      '$rootScope',
      '$location',
      '$cookies',
      '$http',
      'sharedData',
      'TaskService',

      function ($rootScope, $location, $cookies, $http, sharedData, TaskService) {

        $http.defaults.useXDomain = true;
        //$http.defaults.withCredentials = true;
        delete $http.defaults.headers.common['X-Requested-With'];

        //Check to see if environment is using cross domain calls via CORS and set the header
        if (re.serviceHost) {
          var token = $http.defaults.headers.common['Reurgency_Token'];
          if (!token && $cookies.Reurgency_Token) {
            $http.defaults.headers.common['Reurgency_Token'] = $cookies.Reurgency_Token;
          }
        }

        // register listener to watch route changes
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
          if (next && next.controller) {
            var route = next.controller;
            if ($cookies.ExpirationDateTime) {
              var bits = $cookies.ExpirationDateTime.split(/\D/);
              var expDate = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);
            }
            if (!$cookies.Reurgency_Token || !(expDate && expDate.getTime() >= new Date().getTime())) {
              console.warn('Caught $routeChange while user  has no Token, or it has expired. Redirecting to login.');
            } else {
              if (next.controller == 'LoginController') {
                console.info('Caught $route to log-in while user is already authenticated. Redirecting to home.');
                $location.path('/home');
              }
            }
          }
          //Notify header of nav change
          $rootScope.$broadcast('SelectedPartialChanged', window.location.hash);
        });
      }])

  .controller('AppController', ['$rootScope','$scope', '$location', '$route', '$http', 'configService', 'sharedData',
    function ($rootScope, $scope, $location, $route, $http, configService,sharedData) {

      $scope.location = $location;
      $scope.companyName = 'reUrgency, LLC';
      $scope.copyrightYear = new Date().getFullYear();
    }]);
