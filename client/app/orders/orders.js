'use strict';

angular.module('lamiJetApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('orders', {
        url: '/orders',
        'authenticate': 'true',
        template: '<orders></orders>'
      })
      .state('ordersEdit', {
        url: '/orders/edit/:id',
        'authenticate': 'true',
        views: {
          '': {
            template: '<orders-edit></orders-edit>'
          },
          'orderDetails@ordersEdit': {
            templateUrl: 'app/orders/views/orderDetails.html'
          },
          'invoiceList@ordersEdit': {
            templateUrl: 'app/orders/views/invoiceList.html'
          },
          'itemList@ordersEdit': {
            templateUrl: 'app/orders/views/itemList.html'
          },
          'invoiceEdit@ordersEdit': {
            templateUrl: 'app/orders/views/invoiceEdit.html'
          },
          'itemEdit@ordersEdit': {
            templateUrl: 'app/orders/views/itemEdit.html'
          }
        }
      });
  });
