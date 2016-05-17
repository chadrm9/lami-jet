/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/orders              ->  index
 * POST    /api/orders              ->  create
 * GET     /api/orders/:id          ->  show
 * PUT     /api/orders/:id          ->  update
 * DELETE  /api/orders/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Order from './order.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
    //Bluebird 3 throws warning for unreturned promise
    return null;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    // Replaced lodash merge with extend for updating child docs
    var updated = _.extend(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

// Check authorized user._id
function handleUnauthorized(req, res) {
  return function(entity) {
    if (!entity) {return null;}
    if (entity.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin'){
      res.sendStatus(403).end();
      return null;
    }
    return entity;
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Orders
export function index(req, res) {
  var findStr = '{user: req.user._id.toString()}';
  if(req.user.role === 'admin') {
    findStr = '';
  }
  return Order.find(findStr).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Order from the DB
export function show(req, res) {
  return Order.findById(req.params.id).populate('user', 'name firstName lastName salesmanNo repPhoneNo districtMgr email').exec()
    .then(handleEntityNotFound(res))
    .then(handleUnauthorized(req, res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Order in the DB
export function create(req, res) {
  return Order.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Order in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Order.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(handleUnauthorized(req, res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Order from the DB
export function destroy(req, res) {
  return Order.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(handleUnauthorized(req, res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Generates and emails order.xlsx
export function send(req, res) {
  return Order.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(handleUnauthorized(req, res))
    .then(handleXlsx())
    .then(saveUpdates({'sent': new Date().toISOString()}))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Generates xlsx blob from template and sendgrid email attachment to DM
function handleXlsx() {
   return function(entity) {
    var fs = require('fs');
    var path = require('path');
    var XlsxTemplate = require('xlsx-template');
    var sendgrid  = require('sendgrid')(process.env.SENDGRID_APIKEY);

    // Prepare date strings
    var dateServiced = new Date(entity.dateServiced).mmddyy();
    var dateInStore = new Date(entity.dateInStore).mmddyy();

    // Prepare 3 possible sheet invoice sections
    var invoice1 = [];
    var invoice2 = [];
    var invoice3 = [];
    // 1 invoice/section
    if(entity.invoices[0]) {
      invoice1.push(entity.invoices[0]);
    }
    if(entity.invoices[1]) {
      invoice2.push(entity.invoices[1]);
    }
    if(entity.invoices[2]) {
      invoice3.push(entity.invoices[2]);
    }
    
    // Prepare 6 possible sheet sections
    var items1 = [];
    var items2 = [];
    var items3 = [];
    var items4 = [];
    var items5 = [];
    var items6 = [];
    // 27 items/section
    for(var i = 0; i < entity.items.length; i++) {
      if(i < 27) {
        items1.push(entity.items[i]);
      }
      else if(i < 54) {
        items2.push(entity.items[i]);
      }
      else if(i < 81) {
        items3.push(entity.items[i]);
      }
      else if(i < 108) {
        items4.push(entity.items[i]);
      }
      else if(i < 135) {
        items5.push(entity.items[i]);
      }
      else if(i < 162) {
        items6.push(entity.items[i]);
      }
    }
    
    // Determine/set template to use
    var templateSize = 'Reorder1Sheet.xlsx';
    var sheetCount = 1;
    if(entity.items.length > 81) {
      templateSize = 'Reorder2Sheet.xlsx';
      sheetCount = 2;
    }

    fs.readFile(path.join(__dirname, templateSize), function(err, data) {

      // Prepare template
      var template = new XlsxTemplate(data);

      // Prepare placeholders
      var values = {
        chainStore: entity.chainStore,
        town: entity.town,
        salesmanNo: entity.user.salesmanNo,
        firstName: entity.user.firstName,
        lastName: entity.user.lastName,
        dateServiced: dateServiced,
        dateInStore: dateInStore,
        districtMgr: entity.user.districtMgr.firstName + ' ' + entity.user.districtMgr.lastName,
        repPhoneNo: entity.user.repPhoneNo,
        invoice1: invoice1,
        invoice2: invoice2,
        invoice3: invoice3,
        items1: items1,
        items2: items2,
        items3: items3,
        items4: items4,
        items5: items5,
        items6: items6
      };

      // Perform substitution
      for(var i = 1; i <= sheetCount; i++) {
        template.substitute(i, values);  
      }
      
      // Get binary data
      var blob = template.generate();

      // File attachment buffer
      var buffer = new Buffer(blob, "binary");

      // Add # pages to filename
      var pgsStr = '_1-pg';
      if (sheetCount > 1) {
        pgsStr = '_' + sheetCount + '-pgs';
      }

      var payload = {
        to      : entity.user.districtMgr.email,
        cc      : entity.user.email,
        from    : 'orders@lamijet.herokuapp.com',
        subject : entity.user.name + "'s " + dateServiced + " order for " + entity.chainStore,
        text    : 'https://lamijet.herokuapp.com/orders/edit/' + entity._id,
        files   : [
          {
            filename    : 'Reorder_' + entity.chainStore.replace(/ /g, '_') + '_' + 
                                            dateServiced.replace(/\//g,'-') + pgsStr + '.xlsx',
            contentType : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            content     : buffer
          }
        ]
      }

      // Send email
      sendgrid.send(payload, function(err, json) {
        if (err) { 
          console.error(err);
          console.log(json);
        }
      });
      
      if (err) {
        console.error(err);
      }

    });
    return entity;
   }
}

Date.prototype.mmddyy = function() {
  var yy = this.getFullYear().toString().substr(2,2);
  var mm = (this.getMonth()+1).toString();
  var dd  = this.getDate().toString();
  return (mm[1]?mm:"0"+mm[0]) +'/'+ (dd[1]?dd:"0"+dd[0]) +'/'+ yy;
};
