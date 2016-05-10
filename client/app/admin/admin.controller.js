'use strict';

(function() {

class AdminController {
  constructor(User, alertService) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    this.alertService = alertService;
  }

  deleteUser(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
    this.alertService.add('success', 'User deleted!', 3000);
  }
}

angular.module('lamiJetApp.admin')
  .controller('AdminController', AdminController);

})();
