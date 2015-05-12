'use strict';
/**
 * Controllers. This JavaScript file contains all applications controller.
 * It defines module visualizerControllers. On that module you can define
 * your own controllers.
 */

var visualizerControllers = angular.module('visualizerControllers', ['ngRoute']);


/**
 * Controller that handles control of listing of system.
 * It fetches Data using service and assigns them to model.
 */
visualizerControllers.controller('SystemListCtrl', ['$scope','System', '$modal','$location',
    function($scope, System, $modal, $location){
        $scope.systems = System.query();
        $scope.lastSystemId = $scope.systems.length;
        $scope.editing = false;

        $scope.newSystem = function() {
            $scope.editing = false;
            $scope.openSystemModal(new System());

        };

        $scope.editSystem = function(system) {
            $scope.editing = true;
            $scope.openSystemModal(system);
            System.update({systemId: system._id}, system);
        };

        $scope.openSystemModal = function (system) {
            var modalInstance = $modal.open({
                templateUrl: 'views/partials/system-modal.ejs',
                controller: 'SystemModalCtrl',
                resolve: {
                    addedSystem: function() {
                        return system;
                    }
                }
            });

            modalInstance.result.then(function (addedSystem) {
                if (!$scope.editing) {
                    var result = new System({
                        _id: null,
                        id: $scope.lastSystemId,
                        duration: addedSystem.duration,
                        description: addedSystem.description,
                        machines: addedSystem.machines,
                        machineLinks: addedSystem.machineLinks
                    });

                    result.$save(function(){
                        $scope.systems.push(addedSystem);
                    });
                } else {
                    System.update({systemId: addedSystem._id}, addedSystem);
                }
            });
        };

    }]);


/**
 * Controller that handles control of detailed-view of system.
 * It fetches desired system using service System and assigns them to model.
 */
visualizerControllers.controller('SystemDetailCtrl',['$scope', '$routeParams','System', '$modal','$location','$timeout',
    function($scope, $routeParams, System, $modal, $location){
        $scope.system = System.get({systemId: $routeParams.systemId});
        $scope.currentIteration = 0;
        $scope.orderProp = 'id';
        $scope.new = false;

        $scope.openMachineModal = function (machine) {
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
                // nop
            });
        };

        $scope.saveChanges = function(system) {
            $scope.system.machineLinks.forEach(function (d) {
                if (d.source != undefined && d.target != undefined){
                    var tmpS = d.source.id;
                    var tmpT = d.target.id;
                    d.source = tmpS;
                    d.target = tmpT;
                }
            });

            System.update({systemId: system._id}, system, function(){
                $scope.currentIteration = 0;
            });

            $scope.currentIteration = 0;
        };

        $scope.remove = function(system) {
            System.remove({systemId: system._id}, function(){
                $location.url('/');
            });
        };

        $scope.start = function() {
            $scope.currentIteration = 0;
        };

        $scope.goToIteration = function(input) {
            $scope.currentIteration = input;
        }
    }]);
/**
 * Controller that handles control of modal that pops-out
 * when clicked on Node in graph.
 */
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
                $scope.iQuery = '';
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

            $scope.edit = false;
        };
});


/**
 * Controller that handles control of modal that pops up when editing a system.
 */
visualizerControllers.controller('SystemModalCtrl',
    function($scope, $modalInstance, addedSystem){
        $scope.addedSystem = addedSystem;

        addedSystem.id = $scope.$parent.lastSystemId + 1;

        $scope.submit = function() {
            $modalInstance.close($scope.addedSystem);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.saveMachine = function(machine) {
            var nuMachine= {};
            nuMachine.name = $scope.inMachine.name;
            nuMachine.density = $scope.inMachine.density;
            nuMachine.addTime = 0;

            if (!addedSystem.machineLinks) {
                var machineLinks = [];
                addedSystem.machineLinks = machineLinks;
            }

            if (addedSystem.machines != null) {
                nuMachine.id = addedSystem.machines.length;
                addedSystem.machines.push(nuMachine);
            } else {
                var machinesNew = [];
                nuMachine.id = 0;
                addedSystem.machines = machinesNew;
                addedSystem.machines.push(nuMachine);

            }
        };
    });
