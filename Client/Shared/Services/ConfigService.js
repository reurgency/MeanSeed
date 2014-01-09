angular.module('Shared.Services.ConfigService', [])
    .service('configService', ['$location',  function ($location) {
        var RemoteURLVersionNumber = '2.0.0';
        var ApplicationVersionId = "00000000-0000-0000-0000-000000000001";
        var NonUSOrdersBaseURL = 'https://extranet.securefreedom.com/Youngevity/Signup/EnrollNew.asp?RepDID=';
        var GetYGYStoreURL = function () {
            var url = '';
            switch (window.location.host) {
                case 'http://localhost:9961/':
                    url = 'http://localhost:9962/90forLifeStore/'
                    break;
                case 'dev1.youngevity.reurgency.com':
                    url = 'http://dev1.youngevity.reurgency.com/90forLifeStore/'
                    break;
                case 'test1.youngevity.reurgency.com':
                    url = 'http://test1.youngevity.reurgency.com/90forLifeStore/'
                    break;
                case 'demo.youngevity.reurgency.com':
                    url = 'http://demo.youngevity.reurgency.com/90forLifeStore/'
                    break;
                case 'appstest.youngevity.com/':
                    url = 'http://buyygytest.com/90forLifeStore/'
                    break;
                default:
                    url = 'http://buyygy.com/90forLifeStore/';
                    break;
            }
            return url;
        }
        return {
            RemoteURLVersionNumber: RemoteURLVersionNumber,
            ApplicationVersionId: ApplicationVersionId,
            NonUSOrdersBaseURL: NonUSOrdersBaseURL,
            YGYStoreURL: function () {
                return GetYGYStoreURL();
            }
        };
    }]);