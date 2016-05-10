'use strict';

angular.module('lamiJetApp.auth', [
  'lamiJetApp.constants',
  'lamiJetApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
