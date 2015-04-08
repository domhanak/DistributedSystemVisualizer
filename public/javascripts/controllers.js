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
                templateUrl: 'machine-modal.ejs',
                controller: 'MachineModalCtrl',
                resolve: {
                    addedMachine: function() {
                        return machine;
                    }
                }
            })
        }

        modalInstance.result.then(function (addedMachine) {
            $scope.system.machines.push(addedMachine);
        });
    }]);

visualizerControllers.controller('MachineModalCtrl',
    function ($scope, $modalInstance, addedMachine) {
        $scope.addedMachine = addedMachine;


        $scope.submit = function () {
            $modalInstance.close($scope.addedMachine);
        }

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }

        $scope.editQuery = function(queryId) {
            if (queryId === 'new') {
                $scope.edit = true;
                $scope.incomplete = true;
                $scope.iQuery = '';
            } else {
                $scope.edit = false;
                $scope.iQuery = $scope.addedMachine.queries[id-1].query;
            }
        }

        $scope.saveQuery = function () {
            var nuQuery = []
            nuQuery.query = $scope.iQuery;
            nuQuery.id = addedMachine.queries.size();
            nuQuery.addTime = $scope.$parent.currentIteration;

            addedMachine.push(nuQuery);
        }
});
