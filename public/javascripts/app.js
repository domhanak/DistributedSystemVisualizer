'use strict';
/**
 * Application module and it's routing configuration.
 */

var visualizerApp = angular.module('visualizerApp', [
    'ngResource',
    'ngRoute',
    'revolunet.stepper',
    'ui.bootstrap',
    'visualizerServices',
    'visualizerControllers',
    'visualizerDirectives',
    ]);

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