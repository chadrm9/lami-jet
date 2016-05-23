'use strict';

angular.module('lamiJetApp', [
  'lamiJetApp.auth',
  'lamiJetApp.admin',
  'lamiJetApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'monospaced.elastic',
  'ncy-angular-breadcrumb'
])

  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/products');

    $locationProvider.html5Mode(true);
  })
  .run(function ($rootScope, $location, Auth, $cookieStore) {
  // Redirect to login if route requires auth and you're not logged in
  $rootScope.$on('$stateChangeStart', function (event, next) {
    Auth.isLoggedIn(function(loggedIn) {
      if (next.authenticate && !loggedIn) {

        // Store the requested url if not logged in
        if ($location.url() !== '/login')
        {
            $cookieStore.put('returnUrl', $location.url());
        }
        $location.path('/login');
      }
    });
  });
});
