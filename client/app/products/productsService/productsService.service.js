'use strict';

angular.module('lamiJetApp')
  .factory('productsService', ['$q', '$http', function ($q, $http) {
    var products;
    var productsService = {};

    // Fetch products
    productsService.fetchProducts = function(refresh) {
      // Load products once and on refresh
      if(refresh || !products) {
        return $http.get('/api/products').then(response => {
          products = response.data;
          return response.data;
        });
      }
      else
      {
        var deferrer = $q.defer();
        deferrer.resolve(products);
        return deferrer.promise;
      }
    };

    return productsService;
  }]);
