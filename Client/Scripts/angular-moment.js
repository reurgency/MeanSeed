/* angular-moment.js / v0.4.0 / (c) 2013 Uri Shaked / MIT Licence */

angular.module('angularMoment', [])
	.directive('amTimeAgo', ['$window', '$timeout', function ($window, $timeout) {
		'use strict';

		return function (scope, element, attr) {
			var activeTimeout = null;
			var currentValue;
			var currentFormat;
            var useUTC = false;

			function cancelTimer() {
				if (activeTimeout) {
					$timeout.cancel(activeTimeout);
					activeTimeout = null;
				}
			}

			function updateTime(momentInstance) {
				element.text(momentInstance.fromNow());
				var howOld = $window.moment().diff(momentInstance, 'minute');
				var secondsUntilUpdate = 3600;
				if (howOld < 1) {
					secondsUntilUpdate = 1;
				} else if (howOld < 60) {
					secondsUntilUpdate = 30;
				} else if (howOld < 180) {
					secondsUntilUpdate = 300;
				}

				activeTimeout = $timeout(function () {
					updateTime(momentInstance);
				}, secondsUntilUpdate * 1000, false);
			}

			function updateMoment() {
				cancelTimer();
                if(useUTC){
                    updateTime($window.moment.utc(currentValue, currentFormat));
                }else{
                    updateTime($window.moment(currentValue, currentFormat));
                }
			}
            
			scope.$watch(attr.amTimeAgo, function (value) {
				if ((typeof value === 'undefined') || (value === null) || (value === '')) {
					cancelTimer();
					if (currentValue) {
						element.text('');
						currentValue = null;
					}
					return;
				}
                
				if (angular.isNumber(value)) {
					// Milliseconds since the epoch
					value = new Date(value);
				}
				// else assume the given value is already a date

				currentValue = value;
				updateMoment();
			});
            
            scope.$watch(attr.amUseUtc, function(value){
                if ((typeof value === 'undefined') || (value === null) || (value === '')) {
                   useUTC = false; 
                }else {
                    useUTC = value;   
                }
                updateMoment();
            });
                         
            
			attr.$observe('amFormat', function (format) {
				currentFormat = format;
				if (currentValue) {
					updateMoment();
				}
			});

			scope.$on('$destroy', function () {
				cancelTimer();
			});
		};
	}])
	.filter('amDateFormat', ['$window', function ($window) {
		'use strict';
        
		return function (value, format, utc) {
            var rtnVal;
            var newVal;
            
            
            if (typeof value === 'undefined' || value === null) {
				return '';
			}

			if (!isNaN(parseFloat(value)) && isFinite(value)) {
				// Milliseconds since the epoch
				value = new Date(parseInt(value, 10));
			}
            
			// check utc flag
            if(utc == 'true'){
                newVal = $window.moment.utc(value);
                //rtnVal = $window.moment(utc1).format(format);
            }else{
                newVal = $window.moment(value);
                //rtnVal = $window.moment(utc2).format(format);
            }
            
            // TODO: format is displaying NON-UTC format even tho
            //       newVal is a UTC date i.e: moment.utc(value)== time-4hours
            rtnVal = newVal.format(format);
            return rtnVal;
            
		};
	}]);
