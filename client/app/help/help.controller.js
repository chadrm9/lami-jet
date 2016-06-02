'use strict';
(function(){

  class HelpComponent {
    constructor(Auth) {
      this.today = new Date();
      this.Auth = Auth;
      this.getCurrentUser = Auth.getCurrentUser;
    }
  }

  angular.module('lamiJetApp')
    .component('help', {
      templateUrl: 'app/help/help.html',
      controller: HelpComponent,
      controllerAs: 'vm'
    });

})();
