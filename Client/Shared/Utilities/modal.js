'use strict';

var modalPopup = modalPopup || angular.module('shared.directives.modalPopup', []);

modalPopup.service("modal", ['$compile', '$rootScope', function ($compile, $rootScope) {

    function open(options, title, templateUrl, okFunction, cancelFunction, okButtonLabel, cancelButtonLabel) {
        var message;
        if (angular.isObject(options)) {

            message = options.message;
            title = options.title;
            templateUrl = options.templateUrl;
            okFunction = options.okFunction;
            cancelFunction = options.cancelFunction;
            okButtonLabel = options.okButtonLabel;
            cancelButtonLabel = options.cancelButtonLabel;

        } else {
            message = options;
        }

        if (message === undefined) {
            message = "";
        }

        if (title === undefined) {
            title = "";
        }

        if (!templateUrl) {
            templateUrl = "/Derby/Apps/shared/directives/modalPopup/modalPopup.tpl.html";
        }

        if (okFunction === undefined) {
            okFunction = angular.noop;
        }

        if (cancelFunction === undefined) {
            cancelFunction = angular.noop;
        }

        if (!okButtonLabel) {
            okButtonLabel = "Ok";
        }

        if (!cancelButtonLabel) {
            cancelButtonLabel = "";
        }

        var compiledElement;
        function internalOkFunction() {
            okFunction();

            compiledElement.remove();
        }

        function internalCancelFunction() {
            cancelFunction();

            compiledElement.remove();
        }

        var $scope = $rootScope.$new(true);
        $scope.okFunction = internalOkFunction;
        $scope.cancelFunction = internalCancelFunction;

        var html = '<div class="popup"><modal-popup popup-message="' + message + '" popup-title="' + title + '" template-url="' + templateUrl + '" ok-function="okFunction" cancel-function="cancelFunction" ok-button-label="' + okButtonLabel + '" cancel-button-label="' + cancelButtonLabel + '"></modal-popup></div>';
        var compileFunction = $compile(html);
        var compiledHtml = compileFunction($scope);
        compiledElement = $(compiledHtml);

        $('body').append(compiledElement);
    }

    return {
        open: open
    }

}]);
