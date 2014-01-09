angular.module('Shared.Services.SharedDataService', [])
    .service('sharedData', ['$rootScope', '$cookies', '$http', '$location',  function ($rootScope, $cookies, $http, $location) {
        var securityObject;
        var loggedInRep;
        var repsList;
        var selectedMobileContact;
        var newlyAddedInvite;
        var externalURLParams;
        var selectedRep;
        var unauthorizedRequest;
        var Enrollment;
        var Cart;
        var Order;
        var Transients = {};
        var repStatusToShow = 'All';
        var nonUSEnrollment = false;
        var isPromo = false;
        var newRepCount = 0;

        var selectedNav = 'login';

        var navState = 0; // 0 = Hamburger 1 = Back Button

        var handleFault = function (context,error) {

            var errorMessage = '';
            //var errorDetails = 'Error Message: '+error.data.Message + '\n\nException: ' + error.data.ExceptionMessage + '\n\nException Type: ' + error.data.ExceptionType;
            var errorDetails = 'Error Message: ' + error.data;

            if (error.status === 401 && context === 'Login') {
                errorMessage = "Login Failed: Invalid Username or Password";
            }
            //These custom error messages are being handled via server side exceptions
            else if (error.status === 503 && error.data) {
                errorMessage = error.data;
            }
            else if (error.status === 409 && error.data) {
                errorMessage = error.data;
                $rootScope.$broadcast('UnauthorizedAppVersion');
            }
            else {
                switch (error.status) {
                    case 401:
                        errorMessage = "Your Token is Expired. You must re-authenticate with the system in order to continue.";
                        $rootScope.$broadcast('UnauthorizedRequest');
                        break;
                    case 503:
                        errorMessage = "The " + context + " is unavailable";
                        break;
                    default:
                        errorMessage = "There has been a problem, make sure you have an internet connection";
                        break;
                }
            }
            console.error(errorMessage+'\n'+errorDetails)
            return {message:errorMessage,details:errorDetails}
        };

        return {
            faultHandler: function (context, error) {
                return handleFault(context, error);
            },
            getSecurityObject: function () {
                return securityObject;
            },
            setSecurityObject: function (value) {
                securityObject = value;
                //var cookiePath = "/90forLifeMobile/MobileApp";
                var cookiePath = "/";
                var expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 30);
                document.cookie = "ExpirationDateTime" + '=' + value.ExpirationDateTime + "; expires=" + expirationDate.toUTCString() + "; path=" + cookiePath;
                document.cookie = "Reurgency_Token" + '=' + value.SecurityTokenId + "; expires=" + expirationDate.toUTCString() + "; path=" + cookiePath;
                //Check to see if environment is using cross domain calls via CORS and set the header
                if (re.serviceHost) {
                    $http.defaults.headers.common['Reurgency_Token'] = value.SecurityTokenId;
                }
                $rootScope.$broadcast('ReurgencyTokenChanged', $cookies.Reurgency_Token);
            },
            getLoggedInRep: function () {
                return loggedInRep;
            },
            setLoggedInRep: function (value) {
                loggedInRep = value;
            },
            getRepsList: function () {
                return repsList;
            },
            setRepsList: function (value) {
                repsList = value;
            },
            getSelectedMobileContact: function () {
                return selectedMobileContact;
            },
            setSelectedMobileContact: function (value) {
                selectedMobileContact = value;
            },
            getNewlyAddedInvite: function () {
                return newlyAddedInvite;
            },
            setNewlyAddedInvite: function (value) {
                newlyAddedInvite = value;
            },
            getSelectedRep: function () {
                return selectedRep;
            },
            setSelectedRep: function (value) {
                selectedRep = value;
            },
            getEnrolledCustomer: function () {
                return enrolledCustomer;
            },
            setEnrolledCustomer: function (value) {
                enrolledCustomer = value;
            },
            getRepStatusToShow: function () {
                return repStatusToShow;
            },
            setRepStatusToShow: function (value) {
                repStatusToShow = value;
            },
            getSelectedNav: function () {
                return selectedNav;
            },
            setSelectedNav: function (value) {
                selectedNav = value;
            },
            getUnauthorizedRequest: function () {
                return unauthorizedRequest;
            },
            setUnauthorizedRequest: function (value) {
                unauthorizedRequest = value;
            },
            getUnauthorizedAppVersion: function () {
                return unauthorizedRequest;
            },
            setUnauthorizedAppVersion: function (value) {
                unauthorizedRequest = value;
            },
            Enrollment:Enrollment,
            Cart:Cart,
            Order:Order,
            Transients:Transients,
            NonUSEnrollment: nonUSEnrollment,
            isPromo: isPromo,
            selectedNavState: navState,
            newRepCount: newRepCount,
            externalURLParams: externalURLParams
        };
    }]);