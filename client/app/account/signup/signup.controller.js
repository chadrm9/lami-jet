'use strict';

class SignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, focus, alertService) {
    this.Auth = Auth;
    this.$state = $state;
    this.alertService = alertService;

    this.focus = focus;
    this.focus('name');
  }

  // Register new user
  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
        name: this.user.name,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        salesmanNo: this.user.salesmanNo,
        repPhoneNo: this.user.repPhoneNo,
        password: this.user.password
      })
      .then(() => {
        // Account created, redirect to admin
        this.$state.go('admin');
        this.alertService.add('success', 'User created!', 3000);
      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
          console.log(field + ': ' + this.errors[field]);
        });
      });
    }
  }
}

angular.module('lamiJetApp')
  .controller('SignupController', SignupController);
