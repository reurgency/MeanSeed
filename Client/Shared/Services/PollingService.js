angular.module('Shared.Services.PollingService', [])
    .factory('Polling', ['$rootScope','$timeout',function ($rootScope,$timeout) {
        // Despite being a factory, the user of the service gets a new
        // Polling every time he calls the service. This is because
        // we return a function that provides an object when executed

        return function (count, delay, eventToDispatch) {
                var poll = {
                    isPolling: false,
                    pollCount: count,
                    pollDelay: delay,
                    pollCycleCompleteEvent: eventToDispatch,
                    keepPolling: function () {
                        if (this.isPolling) {
                            if (this.pollCount > 0) {
                                this.decrementCounter();
                                $timeout($rootScope.$broadcast(this.pollCycleCompleteEvent), this.pollDelay);
                            } else {
                                this.stopPolling();
                            }
                        }
                    },
                    stopPolling: function () {
                        this.isPolling = false;
                        this.pollCount = 0;
                    },
                    decrementCounter: function () {
                        this.pollCount--;
                    },
                    _load: function () {
                        this.isPolling = true;
                        this.keepPolling();
                    },
                    continuePolling: function(){
                        this.keepPolling();
                    }
                };
                poll._load();
                return poll;
            };
        }]);