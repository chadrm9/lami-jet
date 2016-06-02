'use strict';

angular.module('lamiJetApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('help', {
        url: '/help',
        template: '<help></help>',
        'authenticate': 'true',
        ncyBreadcrumb: {
          label: 'Help'
        }
      });
  });
