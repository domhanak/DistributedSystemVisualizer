'use strict';
/**
 * Controllers
 */

var visualizerControllers = angular.module('visualizerControllers', ['ngRoute']);


/**
 * Controller that handles control of listing of system.
 * It fetches Data using service and assigns them to model.
 */
visualizerControllers.controller('SystemListCtrl', ['$scope','System',
    function($scope, System){
        $scope.systems = System.query();
    }]);


/**
 * Controller that handles control of detailed-view of system.
 * It fetches desired system using service and assigns them to model.
 */
visualizerControllers.controller('SystemDetailCtrl',['$scope', '$routeParams','System', '$modal',
    function($scope, $routeParams, System, $modal){
        $scope.system = System.get({systemId: $routeParams.systemId});
        $scope.currentIteration = 0;
        $scope.orderProp = 'id';

        $scope.open = function (machine) {
             var modalInstance = $modal.open({
                templateUrl: 'views/partials/machine-modal.ejs',
                controller: 'MachineModalCtrl',
                resolve: {
                    addedMachine: function() {
                        return machine;
                    }
                }
            });

            modalInstance.result.then(function (addedMachine) {
                $scope.currentIteration = addedMachine.addTime;
            });
        };
    }]);

visualizerControllers.controller('MachineModalCtrl',
    function ($scope, $modalInstance, addedMachine) {
        $scope.addedMachine = addedMachine;

        $scope.submit = function () {
            $modalInstance.close($scope.addedMachine);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.editQuery = function(queryId) {
            if (queryId === 'new') {
                $scope.edit = true;
                $scope.incomplete = false;
                $scope.iQuery = '';
            } else {
                $scope.edit = true;
                $scope.incomplete= false;
                $scope.iQuery = addedMachine.queries[queryId];
            }
        };

        $scope.saveQuery = function () {
            var nuQuery = {};
            nuQuery.query = $scope.iQuery;
            nuQuery.addTime = addedMachine.addTime;

            if (addedMachine.queries != null) {
                addedMachine.queries.push(nuQuery);
            } else {
                var queries = [];
                queries.push(nuQuery);
                addedMachine.queries = queries;
            }
        };
});
