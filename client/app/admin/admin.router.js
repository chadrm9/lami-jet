'use strict';

angular.module('lamiJetApp.admin')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        controller: 'AdminController',
        controllerAs: 'vm',
        authenticate: 'admin',
        templateUrl: 'app/admin/admin.html',
        ncyBreadcrumb: {
          label: 'Admin'
        }
      });
  });
