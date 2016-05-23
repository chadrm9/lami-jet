'use strict';

angular.module('lamiJetApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('orders', {
        abstract: true,
        url: '',
        'authenticate': 'true',
        template: '<div ui-view></div>'
      })
      .state('orders.list', {
        url: '/orders',
        'authenticate': 'true',
        template: '<orders-list></orders-list>',
        ncyBreadcrumb: {
          label: 'Orders'
        }
      })
      .state('orders.edit', {
        url: '/orders/edit/:id',
        'authenticate': 'true',
        views: {
          '': {
            template: '<orders-edit></orders-edit>'
          },
          'orderDetails@orders.edit': {
            templateUrl: 'app/orders/views/orderDetails.html'
          },
          'invoiceList@orders.edit': {
            templateUrl: 'app/orders/views/invoiceList.html'
          },
          'itemList@orders.edit': {
            templateUrl: 'app/orders/views/itemList.html'
          },
          'invoiceEdit@orders.edit': {
            templateUrl: 'app/orders/views/invoiceEdit.html'
          },
          'itemEdit@orders.edit': {
            templateUrl: 'app/orders/views/itemEdit.html'
          }
        },
        ncyBreadcrumb: {
          label: 'Edit Order',
          parent: 'orders.list'
        }
      })
      .state('orders.create', {
        url: '/orders/create',
        'authenticate': 'true',
        views: {
          '': {
            template: '<orders-create></orders-create>'
          },
          'orderDetails@orders.create': {
            templateUrl: 'app/orders/views/orderDetails.html'
          },
          'invoiceList@orders.create': {
            templateUrl: 'app/orders/views/invoiceList.html'
          },
          'itemList@orders.create': {
            templateUrl: 'app/orders/views/itemList.html'
          },
          'invoiceEdit@orders.create': {
            templateUrl: 'app/orders/views/invoiceEdit.html'
          },
          'itemEdit@orders.create': {
            templateUrl: 'app/orders/views/itemEdit.html'
          }
        },
        ncyBreadcrumb: {
          label: 'Create Order',
          parent: 'orders.list'
        }
      });
  });
