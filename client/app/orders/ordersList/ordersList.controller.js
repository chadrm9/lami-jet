'use strict';
(function(){

  class OrdersListComponent {
    constructor(Auth, ordersService, alertService) {
      this.isAdmin = Auth.isAdmin;
      this.getCurrentUser = Auth.getCurrentUser;
      this.ordersService = ordersService;
      this.alertService = alertService;

      // Descending by servicedDate
      this.sortDirection = true;
    }

    $onInit() {
      // Fetch orders
      this.ordersService.fetchOrders().then(response => {
          this.orders = response;
      });
    }

    sendOrder(id) {
      this.ordersService.sendOrder(id).then(() => {
        this.ordersService.fetchOrders().then(response => {
          this.orders = response;
          this.alertService.add('success', 'Order sent!', 5000);
        });
      });
    }

    deleteOrder(id) {
      this.ordersService.deleteOrder(id).then(() => {
        this.ordersService.fetchOrders().then(response => {
          this.orders = response;
          this.alertService.add('success', 'Order deleted!', 5000);
        });
      });
    }

    // Check user is owner or admin
    isOwnerOrAdmin(user) {
      if (this.getCurrentUser().name === user || this.isAdmin()) {
        return true;
      }
      else {
        return false;
      }
    }
    
  }

  angular.module('lamiJetApp')
    .component('ordersList', {
      templateUrl: 'app/orders/ordersList/ordersList.html',
      controller: OrdersListComponent,
      controllerAs: 'vm'
    });

})();
