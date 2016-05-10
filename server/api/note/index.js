	'use strict';

var express = require('express');
var controller = require('./note.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/:id/comments', auth.isAuthenticated(), controller.createComment);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/:id/comments/:commentId', auth.isAuthenticated(), controller.updateComment);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.delete('/:id/comments/:commentId', auth.isAuthenticated(), controller.destroyComment);

module.exports = router;
