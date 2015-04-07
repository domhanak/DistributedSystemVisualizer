'use strict';
/**
 * Services for getting systems.
 */

var visualizerServices = angular.module('visualizerServices', ['ngResource']);

visualizerServices.factory('System', ['$resource',
    function($resource){
        return $resource('/systems/:systemId', null, {
            'update': {method: 'PUT'}
        });
    }]);
