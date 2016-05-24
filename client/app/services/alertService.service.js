'use strict';

angular.module('lamiJetApp')
  .service('alertService', ['$timeout', function ($timeout) {
    var alertService = {};

    // create an array of alerts
    alertService.alerts = [];

    alertService.add = function (type, msg, timeout) {
        alertService.alerts.push({ 'type': type, 'msg': msg});
        if (timeout) { 
          $timeout(function(){ 
              alertService.closeAlert(this); 
          }, timeout); 
        }
    };

    alertService.closeAlert = function (index) {
        alertService.alerts.splice(index, 1);
    };

    return alertService;
  }]);
