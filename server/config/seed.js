/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import mongoose from 'mongoose';
import Note from '../api/note/note.model';
import User from '../api/user/user.model';
import Order from '../api/order/order.model';

User.find({}).remove()
  .then(() => {
    User.create({
      _id: '000000000000000000000000',
      provider: 'local',
      name: 'Chad',
      firstName: 'Chad',
      lastName: 'Chad',
      salesmanNo: '0123456789',
      repPhoneNo: '0123456789',
      districtMgr: {_id: '000000000000000000000000'},
      email: 'chad@chad.com',
      password: 'chad'
    }, {
      _id: '000000000000000000000001',
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      firstName: 'Admin',
      lastName: 'Admin',
      salesmanNo: '0000000000',
      repPhoneNo: '0000000000',
      districtMgr: {_id: '572250bbeca3740300e516d0'},
      email: 'admin@admin.com',
      password: 'admin',
      settings: {autoNextItem: false}
    }, {
      _id: '000000000000000000000002',
      provider: 'local',
      role: 'user',
      name: 'Paula',
      firstName: 'Paula',
      lastName: 'Paula',
      salesmanNo: '9876543210',
      repPhoneNo: '9876543210',
      districtMgr: {_id: '572250bbeca3740300e516d0'},
      email: 'paula@paula.com',
      password: 'paula'
    }, {
      _id: '572250bbeca3740300e516d0',
      provider: 'local',
      role: 'user',
      name: 'Lynn',
      firstName: 'Lynn',
      lastName: 'Lynn',
      salesmanNo: '456789123',
      repPhoneNo: '456789123',
      districtMgr: {_id: '572250bbeca3740300e516d0'},
      email: 'lynn@lynn.com',
      password: 'lynn'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });

Note.find({}).remove()
  .then(() => {
    Note.create({
      user:    {_id: '000000000000000000000000'},
      title:   'Development Tools',
      message: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ',
      comments: [
        {message: 'Great work Chad, keep it up!', user: {_id: '572250bbeca3740300e516d0'}},
        {message: 'Wish you were an admin bro!', user: {_id: '000000000000000000000001'}}
      ]
    }, {
      user:    {_id: '000000000000000000000000'},
      title:   'Server and Client integration',
      message: 'Built with a powerful and fun stack: MongoDB, Express, ',
      comments: [
        {message: 'And then???', user: {_id: '572250bbeca3740300e516d0'}},
        {message: 'Angular and Node', user: {_id: '000000000000000000000000'}},
        {message: 'full stack ftw?!', user: {_id: '572250bbeca3740300e516d0'}},
        {message: 'And How!', user: {_id: '000000000000000000000000'}}
      ]
    }, {
      user:    {_id: '000000000000000000000002'},
      title:   'Smart Build System',
      message: 'Build system ignores `spec` files, allowing you to keep ',
    }, {
      user:    {_id: '000000000000000000000001'},
      title:   'Modular Structure',
      message: 'Best practice client and server structures allow for more ',
      comments: [
        {message: 'First', user: {_id: '000000000000000000000002'}},
        {message: 'Get wrekt dirty admin :p', user: {_id: '572250bbeca3740300e516d0'}},
        {message: 'You ugly', user: {_id: '000000000000000000000000'}}
      ]
    }, {
      user:    {_id: '000000000000000000000002'},
      title:   'Optimized Build',
      message: 'Build process packs up your templates as a single JavaScript ',
      comments: [
        {message: '1 2 BBQ', user: {_id: '572250bbeca3740300e516d0'}},
        {message: 'OI OI OI', user: {_id: '000000000000000000000000'}}
      ]
    }, {
      user:    {_id: '000000000000000000000000'},
      title:   'Deployment Ready',
      message: 'Easily deploy your app to Heroku or Openshift with the heroku ',
    })
    .then(() => {
      console.log('finished populating notes');
    });
  });

  Order.find({}).remove()
  .then(() => {
    Order.create({
      user: {_id: '000000000000000000000000'},
      chainStore: 'ZKRLO 777',
      town: 'Louisville',
      dateServiced: '01/01/16',
      dateInStore: '01/02/16',
      invoices: [
        {invoiceNo: '00000001', ticketNo: '0123456789', amount: '99.99', quantity: '100'},
        {invoiceNo: '00000002', ticketNo: '9876543210', amount: '999.99', quantity: '10'}
      ],
      items: [
        {aisle: '001', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '025', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '049', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '072', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '073', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'}
      ],
      sent: '01/02/16'
    }, {
      user: {_id: '000000000000000000000000'},
      chainStore: 'ZKRLO 666',
      town: 'Louisville',
      dateServiced: '02/01/16',
      dateInStore: '02/02/16',
      invoices: [
        {invoiceNo: '9876543210', ticketNo: '9876543210', amount: '9999.99', quantity: '10'},
        {invoiceNo: '9876543210', ticketNo: '9876543210', amount: '9999.99', quantity: '10'}
      ],
      items: [
        {aisle: '001', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '025', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '049', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '072', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '073', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '096', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '097', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '120', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '121', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '144', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '150', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '160', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '161', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '162', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '163', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'}

      ]
    }, {
      user: {_id: '000000000000000000000002'},
      chainStore: 'ZKRLO 666',
      town: 'Louisville',
      dateServiced: '03/01/16',
      dateInStore: '03/02/16',
      invoices: {invoiceNo: '9876543210', ticketNo: '9876543210', amount: '9876543210', quantity: '10'},
      items: [
        {aisle: 'XXX', description: 'xxxxxxxxxxxxxxxx', upc: '9876543210', quantity: '10'},
        {aisle: '0123456789', description: 'xxxxxxxxxxxxxxxx', upc: '0123456789', quantity: '0123456789'}
      ]
    })
    .then(() => {
      console.log('finished populating orders');
    });
  });
