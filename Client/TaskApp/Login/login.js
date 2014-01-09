'use strict';

angular.module('Login', [])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: '/TaskApp/Login/login.tpl.html',
        controller: 'LoginController'
    })
    .when('/login/:status', {
        templateUrl: '/TaskApp/Login/login.tpl.html',
        controller: 'LoginController'
    });
}])

.controller('LoginController', ['$rootScope', '$scope', '$location', '$templateCache', '$timeout', 'sharedData', 'RepResource', 'LoginResource', '$cookies', function ($rootScope, $scope, $location, $templateCache, $timeout, sharedData, RepResource, LoginResource, $cookies) {

    sharedData.selectedNavState = 0;

    if (sharedData.getUnauthorizedRequest() === true) {
        $scope.sessionExpiredMessage = "Welcome back! Your previous session has expired. Please login.";
        $scope.sessionExpired = true;
    }

    var path = $location.path();
    var splitPath = path.split("/");
    if (splitPath.length == 3) {
        if (splitPath[2] == "newVersion") {
            $scope.sessionExpiredMessage = "Welcome back! You were logged out because there is a new version of 90 for Life Mobile. Please login.";
            $scope.sessionExpired = true;
            if (sharedData.getUnauthorizedAppVersion() === true) {
                window.location.reload(true);
            }   
        }
    }

    if ($cookies.RepUserName) {
        $scope.login_username = $cookies.RepUserName;
    }

    $scope.goHome = function () {
        $location.path('/home');
    }

    $scope.login = function () {
        if ($scope.loginForm.$invalid != true) {
            var credentials = {};
            credentials.UserName = $scope.login_username;
            credentials.Password = $scope.login_password;

            credentials.CultureName = window.navigator.userLanguage || window.navigator.language
            LoginResource.save(credentials,
                function (response) {
                    sharedData.setSecurityObject(response);
                    //$cookies.RepUserName = credentials.UserName; 
                    //var cookiePath = "/90forLifeMobile/MobileApp";
                    var cookiePath = "/";
                    var expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 3650);
                    document.cookie = "RepUserName" + '=' + credentials.UserName + "; expires=" + expirationDate.toUTCString() + "; path=" + cookiePath;
                    $timeout($scope.goHome, 500);
                },
                function (error) {
                    $scope.isError = true;
                    $scope.sessionExpired = false;
                    $scope.errorMessage = sharedData.faultHandler("Login", error).message;
                }
            );
        }
        else {
                $scope.errorMessage = "Please enter a username and password.";
                $scope.isError = true;
        }
    };

    $scope.needLogin = function () {
        window.open("http://www.youngevity.com", "_system", "menubar=yes,resizable=yes,scrollbars=yes,status=yes,titlebar=yes,toolbar=yes",true);
    }

    $scope.clearCookies = function(){
        for (var key in $cookies) {
            if ($cookies.hasOwnProperty(key)) {
                delete $cookies[key];
            }
        }
        $scope.cookies = $cookies;

        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookieName = cookies[i].split("=")[0];
            $scope.removeCookie(cookieName);
        }
    }

    $scope.removeCookie = function (name) {
        document.cookie = name + "=;path=/; expires=" + "Thu, 01 Jan 1970 00:00:01 GMT";
    }

    $scope.cookies = $cookies;
}]);