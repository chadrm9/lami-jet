'use strict';

angular.module('lamiJetApp')
  .directive('alertDisplay', ['alertService', function (alertService) {
    return {
      restrict: 'AE',
      template: '<div ng-repeat="alert in vm.alerts" class="alert alert-{{alert.type}}" role="alert" ng-bind="alert.msg"></div>',
      controller: function(){
        var vm = this;
        vm.alertService = alertService;

        vm.alerts = vm.alertService.alerts;

        vm.closeAlert = function (index) {
          vm.alertService.closeAlert(index);
        };
      },
      controllerAs: 'vm'
    };
  }]);
