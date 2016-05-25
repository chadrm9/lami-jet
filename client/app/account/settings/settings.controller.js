'use strict';

class SettingsController {
  constructor(Auth, $state, focus, alertService) {
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.user = Auth.getCurrentUser();

    this.$state = $state;

    this.focus = focus;

    this.alertService = alertService;
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
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

  saveSettings() {
    this.Auth.updateUser(this.user)
      .then(() => {
        this.alertService.add('success', 'Settings updated!', 5000);
      })
      .catch(err => {
        console.error(err);
      });
  }
}

angular.module('lamiJetApp')
  .controller('SettingsController', SettingsController);
