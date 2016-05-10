/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/notes              ->  index
 * POST    /api/notes              ->  create
 * GET     /api/notes/:id          ->  show
 * PUT     /api/notes/:id          ->  update
 * DELETE  /api/notes/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Note from './note.model';

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
    var updated = _.merge(entity, updates);
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

// Gets a list of Notes
export function index(req, res) {
  // Sort by timestamp
  return Note.find().sort( { 'updatedAt': -1 } ).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Note from the DB
export function show(req, res) {
  return Note.findById(req.params.id).populate('user', 'name').populate('comments.user', 'name').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Note in the DB
export function create(req, res) {
  req.body.user = req.user
  return Note.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Note in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Note.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(handleUnauthorized(req, res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Note from the DB
export function destroy(req, res) {
  return Note.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(handleUnauthorized(req, res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

/* comments APIs */
export function createComment(req, res) {
  req.body.user = req.user.id;
  Note.update({_id: req.params.id}, {$push: {comments: req.body}}, function(err, num){
    if(err) {return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  })
}
export function destroyComment(req, res) {
  Note.update({_id: req.params.id}, {$pull: {comments: {_id: req.params.commentId , 'user': req.user._id}}}, function(err, num) {
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}
export function updateComment(req, res) {
  Note.update({_id: req.params.id, 'comments._id': req.params.commentId}, {'comments.$.message': req.body.message, 'comments.$.user': req.user.id}, function(err, num){
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}