'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var projVersion = angular.module('Shared.Services.ProjectVersion', []);

projVersion.value('version', '0.2.1');






