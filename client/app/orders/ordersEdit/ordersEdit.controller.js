'use strict';
(function(){

  class OrdersEditComponent {
    constructor(ordersService, $templateRequest, productsService, $state, Auth, focus, alertService) {
      this.ordersService = ordersService;
      this.$templateRequest = $templateRequest;
      this.productsService = productsService;
      this.$state = $state;

      this.getCurrentUser = Auth.getCurrentUser;
      this.focus = focus;
      this.alertService = alertService;

      this.order = {};
      this.order.user = {};
      this.order.invoices = [];
      this.order.items = [];

      // For view model only
      this.fullName = '';
      this.districtMgr = '';

      this.pageHeader = [];
    }

    // Concatenates page header array
    getPageHeader() {
      var header = '';
      for(var i = 0; i < (this.pageHeader.length - 1); i++) {
        header = header + this.pageHeader[i] + ' > ';
      }
      return header;
    }

    $onInit() {
      // Setup inline datepickers
      this.dateFormat = 'MM-dd-yy';
      // this.maxDt = new Date();
      // this.minDt = new Date();
      this.order.dateServiced = new Date();
      this.order.dateInStore = new Date();
      this.inlineOptions = {
        // maxDate: this.maxDt.setDate((new Date()).getDate() + 14),
        // minDate: this.minDt.setDate((new Date()).getDate() - 14),
        startingDay: 1
      };

      // Cache invoice/item template
      this.$templateRequest('app/orders/views/accordion-template.html').then(() => {

        // Ensure products loaded
        this.productsService.fetchProducts().then(response => {
          this.products = response;

          // Edit details, invoice, or item
          this.edit = 'details';  

          // Fetch existing order
          if(this.$state.params.id) {
            this.ordersService.fetchOrder(this.$state.params.id).then(response => {
              this.pageHeader.push('Edit Order');
              this.order = response;
              this.fullName = this.order.user.firstName + ' ' + this.order.user.lastName;
              this.districtMgr = this.order.user.districtMgr.firstName + ' ' + 
                                 this.order.user.districtMgr.lastName;
              this.order.dateServiced = new Date(this.order.dateServiced);
              this.order.dateInStore = new Date(this.order.dateInStore);
            });
          }
          // Start new order
          else {
            this.pageHeader.push('Create Order');
            this.order.user = this.getCurrentUser();
            this.fullName = this.order.user.firstName + ' ' + this.order.user.lastName;
            this.districtMgr = this.order.user.districtMgr.firstName + ' ' + 
                               this.order.user.districtMgr.lastName;
            this.focus('chainStore');
          }

        });
      });
    }

    saveOrder(form) {
      if(form.$valid) {
        // Update existing order
        if(this.$state.params.id) {
          this.ordersService.updateOrder(this.order).then(() => {
            this.$state.go('orders');
            this.alertService.add('success', 'Order saved!', 5000);
          });
        }
        // Create new order
        else {
          this.ordersService.createOrder(this.order).then(() => {
            this.$state.go('orders');
            this.alertService.add('success', 'Order created!', 5000);
          });
        }
        this.order = {};
        this.submitted = false;
      }
      else {
        this.submitted = true;
        if (form.chainStore.$invalid) {
          this.focus('chainStore');
        }
        else if (form.town.$invalid) {
          this.focus('town');
        }
      }
    }

    saveInvoice(form) {
      if(form.$valid) {
        // Update invoice
        if(this.notNew) {
          var index = this.order.invoices.indexOf(this.invoice);
          this.order.invoices[index] = this.invoice;
        }
        // Push new invoice
        else {
          this.order.invoices.push(this.invoice);
        }
        this.resetInvoice();
        this.submitted = false;
        this.alertService.add('success', 'Invoice saved!', 5000);
      }
      else {
        this.submitted = true;
        if (form.invoiceNo.$invalid) {
          this.focus('invoiceNo');
        }
        else if (form.ticketNo.$invalid) {
          this.focus('ticketNo');
        }
        else if (form.amount.$invalid) {
          this.focus('amount');
        }
        else if (form.invoiceQuantity.$invalid) {
          this.focus('invoiceQuantity');
        }
      }
    }

    deleteInvoice(invoice) {
      var index = this.order.invoices.indexOf(invoice);
      this.order.invoices.splice(index, 1);
      this.alertService.add('success', 'Invoice deleted!', 5000);
    }

    editInvoice(invoice) {
      this.submitted = false;
      this.invoice = invoice;
      this.notNew = true;
      this.pageHeader.push('Edit Invoice');
      this.edit = 'invoice';
    }

    resetInvoice(next = 'details') {
      this.submitted = false;
      this.invoice = {};
      this.notNew = false;
      this.pageHeader.pop();
      this.edit = next;
    }

    productDescSelect($item) {
      this.item.upc = $item.upc;
    }

    saveItem(form) {
      if(form.$valid) {
        // Update item
        if(this.notNew) {
          var index = this.order.items.indexOf(this.item);
          this.order.items[index] = this.item;
        }
        // Push new item
        else {
          this.order.items.push(this.item);
        }
        // Probably adding another item
        this.resetItem('item');
        this.focus('aisle');
        this.submitted = false;
        this.alertService.add('success', 'Item saved!', 5000);
      }
      else {
        this.submitted = true;
        if (form.aisle.$invalid) {
          this.focus('aisle');
        }
        else if (form.description.$invalid) {
          this.focus('description');
        }
        else if (form.itemQuantity.$invalid) {
          this.focus('itemQuantity');
        }
      }
    }

    deleteItem(item) {
      var index = this.order.items.indexOf(item);
      this.order.items.splice(index, 1);
      this.alertService.add('success', 'Item deleted!', 5000);
    }

    editItem(item) {
      this.submitted = false;
      this.item = item;
      this.notNew = true;
      this.pageHeader.push('Edit Item');
      this.edit = 'item';
    }

    resetItem(next = 'details') {
      this.submitted = false;
      this.item = {};
      this.notNew = false;
      if(next !== 'item') {
        this.pageHeader.pop();
      }
      this.edit = next;
    }

    // Fetch products once for edit item upc
    loadProducts() {
      this.productsService.fetchProducts().then(response => {
        this.products = response;
      });
    }

    toggleDateServicedCal() {
      this.dateServicedCal = !this.dateServicedCal;
    }

    toggleDateInStoreCal() {
      this.dateInStoreCal = !this.dateInStoreCal;
    }

  }

  angular.module('lamiJetApp')
    .component('ordersEdit', {
      templateUrl: 'app/orders/ordersEdit/ordersEdit.html',
      controller: OrdersEditComponent,
      controllerAs: 'vm'
    });

})();
