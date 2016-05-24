'use strict';

angular.module('lamiJetApp')
  .factory('ordersService', ['$http', function ($http) {

    var ordersService = {};

    // Fetch order by id
    ordersService.fetchOrder = function(id) {
      return $http.get('/api/orders/' + id).then(response => {
        return response.data;
      });
    };

    // Fetch orders
    ordersService.fetchOrders = function() {
      return $http.get('/api/orders').then(response => {
        return response.data;
      });
    };

    // Create order
    ordersService.createOrder = function(order) {
      return $http.post('/api/orders', order).then(response => {
        return response.data;
      });
    };

    // Update order
    ordersService.updateOrder = function(order) {
      return $http.put('/api/orders/' + order._id, order).then(response => {
        return response.data;
      });
    };

    // Send order
    ordersService.sendOrder = function(id) {
      return $http.post('/api/orders/' + id + '/send').then(response => {
        return response.data;
      });
    };

    // Delete order
    ordersService.deleteOrder = function(id) {
      return $http.delete('/api/orders/' + id).then(response => {
        return response.data;
      });
    };

    return ordersService;
  }]);
