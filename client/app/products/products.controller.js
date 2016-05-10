'use strict';
(function(){

class ProductsComponent {
  constructor(productsService, focus) {
    this.productsService = productsService;
    this.focus = focus;

    var self = this;
    // Search filter function flattens/concatenates fields
    this.search = function (row) {
      return (angular.lowercase(row.commodity).indexOf(angular.lowercase(self.filter) || '') !== -1 ||
              angular.lowercase(row.upc).indexOf(angular.lowercase(self.filter) || '') !== -1 ||
              angular.lowercase(row.bin).indexOf(angular.lowercase(self.filter) || '') !== -1 ||
              angular.lowercase(row.description).indexOf(angular.lowercase(self.filter) || '') !== -1);
    };

    this.cleared = true;
  }

  $onInit() {
    this.focus('search');
  }

  searchFilter(form) {
    if (form.$valid) {
      this.loading = true;
      // Fetch products
      this.productsService.fetchProducts().then(response => {
        this.products = response;
        this.loading = false;
        // Show results
        this.cleared = false;
      });
      // Apply search term to result filter
      this.filter = this.query;
      this.submitted = false;
    }
    else {
      // Form invalid
      this.submitted = true;
      this.cleared = true;
    }
  }

  // Clear input and hide previous results
  clear() {
    this.query = '';
    this.focus('search');
    this.cleared = true;
    this.submitted = false;
  } 
}

angular.module('lamiJetApp')
  .component('products', {
    templateUrl: 'app/products/products.html',
    controller: ProductsComponent,
    controllerAs: 'vm'
  });

})();