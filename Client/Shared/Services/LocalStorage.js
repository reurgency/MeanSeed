'use strict';

/**
 * Services that persists and retrieves stuff from localStorage.
 * TODO: use modernizr to check if local storage is available
 */
myApp.factory('myApp.LocalStorage', function () {
    var STORAGE_ID = 'my-storage-id';

    return {
        get: function () {
            return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
        },

        put: function (stuff) {
            localStorage.setItem(STORAGE_ID, JSON.stringify(stuff));
        }
    };
});
