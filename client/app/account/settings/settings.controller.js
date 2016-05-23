'use strict';

class SettingsController {
  constructor(Auth, $state, focus, alertService) {
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;

    this.focus = focus;
    this.focus('password');

    this.alertService = alertService;
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.$state.go('products');
          this.alertService.add('success', 'Password changed!', 5000);
          //this.message = 'Password successfully changed';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.password = 'Incorrect password';
          //this.message = '';
        });
    }
  }
}

angular.module('lamiJetApp')
  .controller('SettingsController', SettingsController);
