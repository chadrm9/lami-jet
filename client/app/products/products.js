'use strict';

angular.module('lamiJetApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('products', {
        url: '/products',
        template: '<products></products>',
        'authenticate': 'true'
      });
  });
