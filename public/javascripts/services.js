'use strict';
/**
 * Services . This file contains all services used bz application.
 */

//defining ngResource dependency
var visualizerServices = angular.module('visualizerServices', ['ngResource']);


// service for fetching systems from server
visualizerServices.factory('System', ['$resource',
    function($resource){
        return $resource('/systems/:systemId', null, {
            'update': {method: 'PUT'}
        });
    }]);
