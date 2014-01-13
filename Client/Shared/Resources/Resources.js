'use strict';

angular.module('TaskApp.Resources', ['ngResource'])

.factory('LoginResource', ['$resource', function ($resource) {
    return $resource(re.serviceHost + '/Login/');
}])

.factory('TaskResource', ['$resource', function ($resource) {
    return $resource(re.serviceHost + '/tasks/:id', { action: '@action', id: '@id' },
            {
                update: { method: 'PUT' },
                add: { method: 'POST' }

            });
}])


