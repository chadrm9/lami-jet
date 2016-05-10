'use strict';

import mongoose from 'mongoose';

var OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  chainStore: String,
  town: String,
  dateServiced: Date,
  dateInStore: Date,
  invoices: [{
  	invoiceNo: String,
  	ticketNo: String,
  	amount: String,
  	quantity: Number
  }],
  items: [{
  	aisle: String,
    description: String,
  	upc: String,
  	quantity: Number
  }],
  sent: Date
});

OrderSchema.pre('find', function(next){
  this.populate('user', 'name firstName lastName salesmanNo repPhoneNo districtMgr email');
  next();
});
OrderSchema.pre('findOne', function(next){
  this.populate('user', 'name firstName lastName salesmanNo repPhoneNo districtMgr email');
  next();
});

export default mongoose.model('Order', OrderSchema);
