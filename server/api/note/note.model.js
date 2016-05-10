'use strict';

import mongoose from 'mongoose';

var NoteSchema = new mongoose.Schema({
  title: {
  	type: String,
  	trim: true
  },
  message: {
  	type: String
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  comments: [{
    message: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
  }]
},{timestamps: true});

NoteSchema.pre('find', function(next){
  this.populate('user', 'name');
  this.populate('comments.user', 'name');
  next();
});
NoteSchema.pre('findOne', function(next){
  this.populate('user', 'name');
  this.populate('comments.user', 'name');
  next();
});

export default mongoose.model('Note', NoteSchema);