'use strict';

(function() {

class AdminController {
  constructor(User, Auth, $state, alertService) {
    // Use the User $resource to fetch all users
    this.User = User;
    this.users = this.User.query();
    this.user = {};

    this.Auth = Auth;
    this.$state = $state;

    this.edit = false;
    this.alertService = alertService;
  }

  deleteUser(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
    this.alertService.add('success', 'User deleted!', 5000);
  }

  saveUser(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.updateUser(this.user)
      .then(() => {

        // User details updated, refresh list
        this.users = this.User.query();
        this.edit = false;
        this.alertService.add('success', 'User updated!', 5000);
      })
      .catch(err => {
        console.error(err);
      });
    }
  }

  savePassword(form) {
    this.pwSubmitted = true;

    if (form.$valid) {
      this.Auth.updateUser(this.user)
      .then(() => {

        // User password updated, refresh list
        this.users = this.User.query();
        this.edit = false;
        this.alertService.add('success', 'Password updated!', 5000);
      })
      .catch(err => {
        console.error(err);
      });
    }
  }

  resetEdit() {
    this.users = this.User.query();
    this.edit = false;
    this.submitted = false;
    this.pwSubmitted = false;
  }
}

angular.module('lamiJetApp.admin')
  .controller('AdminController', AdminController);

})();
