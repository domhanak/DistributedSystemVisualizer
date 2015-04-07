'use strict';
/**
 * Controllers
 */

var visualizerControllers = angular.module('visualizerControllers', ['ngRoute']);

visualizerControllers.controller('SystemListCtrl', ['$scope','System',
    function($scope, System){
        $scope.systems = System.query();
    }]);

visualizerControllers.controller('SystemDetailCtrl',['$scope', '$routeParams', '$modal', 'System',
    function($scope, $routeParams, System){
        $scope.system = System.get({systemId: $routeParams.systemId});
        $scope.currentIteration = 0;
        $scope.orderProp = 'id';

        $scope.$watch('selected_machine', function(oldVal, newVal) {
            if (oldVal != newVal) {
                $scope.selected_machine = newVal;
            }
        });

        $scope.open = function (machine) {
            var modalInstance = $modal.open({
                templateUrl: 'machineModal.html',

            })
        }
    }]);
