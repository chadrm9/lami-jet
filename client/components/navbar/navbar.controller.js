'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Catalog',
    'state': 'products',
    'icon':  'book'
  },{
    'title': 'Orders',
    'state': 'orders',
    'icon':  'shopping-cart'
  },{
    'title': 'Notes',
    'state': 'notes',
    'icon':  'inbox'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('lamiJetApp')
  .controller('NavbarController', NavbarController);
