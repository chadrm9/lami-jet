'use strict';

import mongoose from 'mongoose';

var ProductSchema = new mongoose.Schema({
  commodity: String,
  rank: Number,
  upc: String,
  upc12: String,
  bin: String,
  description: String,
  price: String
});

export default mongoose.model('Product', ProductSchema);
