'use strict';

class LoginController {
  constructor(Auth, $state, focus, $cookieStore, $location) {
    this.user = {};
    this.errors = {};
    this.submitted = {};
    this.setSubmitFlags(false);

    this.Auth = Auth;
    this.$state = $state;

    this.focus = focus;
    this.focus('email');

    this.$cookieStore = $cookieStore;
    this.$location = $location;
  }

  setSubmitFlags(bool) {
     this.submitted.email = this.submitted.password = bool;
  }

  login(form) {
    // Reset submission
    this.setSubmitFlags(false);
    this.errors.other = '';

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Check for returnUrl cookie
        if (typeof this.$cookieStore.get('returnUrl') !== 'undefined' && this.$cookieStore.get('returnUrl') !== '')
        {
            this.$location.path(this.$cookieStore.get('returnUrl'));
            this.$cookieStore.remove('returnUrl');
        }
        // No cookie
        else
        {
            this.$location.path('/');
        }
      })
      .catch(err => {
        this.errors.other = err.message;
        // Mongoose errors
        this.setSubmitFlags(true);
      });
    }
    else {
      // Form errors
      this.setSubmitFlags(true);
    }
  }
}

angular.module('lamiJetApp')
  .controller('LoginController', LoginController);
