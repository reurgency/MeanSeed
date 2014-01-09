'use strict'

var re = re || {};

re.ViewModelBase = function ($scope, $rootScope) {
    if(!$scope){
        throw ("$scope is required to create a new ViewModelBase.");
    }

    $scope.$scopeEventDeregisterFunctions = [];

    function addEventListener(eventName, listenerFunction, eventType) {
        if (eventType === undefined) {
            eventType = "application";
        }

        if (eventType == "application" && !$rootScope) {
            throw ("$rootScope is required for an event listener with eventType of 'application'.");
        }

        switch (eventType) {

            case "view":
                $scope.$scopeEventDeregisterFunctions.push(
                    $scope.$on(eventName, listenerFunction)
                );
                break;

            case "application":
                $scope.$scopeEventDeregisterFunctions.push(
                    $rootScope.$on(eventName, listenerFunction)
                );
                break;

            default:
                throw ("Event Listener 'eventType' must either be 'view' or 'application'.  Current type is '" + eventType + "'.");
                break;

        }
    }

    $scope.$addEventListener = addEventListener;

    function delayedDestroyHandler() {
        for (var index = 0; index < $scope.$scopeEventDeregisterFunctions.length; index++) {
            var deregisterFunction = $scope.$scopeEventDeregisterFunctions[index];
            deregisterFunction();
        }
        $scope.$scopeEventDeregisterFunctions = [];
    }

    function destroyHandler(event) {
        //(JNewton) Add a delay here so that all destroy handlers will fire before this one
        setTimeout(delayedDestroyHandler);
    }
    addEventListener('$destroy', destroyHandler);

    
    return $scope;
}