'use strict';
/**
 * Application module for DistributedSystemVisualizer and it's routing configuration.
 */

// Creation fo main module and defining it's dependencies
var visualizerApp = angular.module('visualizerApp', [
    'ngResource',
    'ngRoute',
    'revolunet.stepper',
    'ui.bootstrap',
    'visualizerServices',
    'visualizerControllers',
    'visualizerDirectives'
    ]);


// Configuration of rouing in our application
visualizerApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/systems', {
                templateUrl: 'views/partials/systems-view.ejs',
                controller: 'SystemListCtrl'
            }).
            when('/systems/:systemId', {
                templateUrl: 'views/partials/system-details.ejs',
                controller: 'SystemDetailCtrl'
            }).
            otherwise({
                redirectTo: '/systems'
            });
    }]);
