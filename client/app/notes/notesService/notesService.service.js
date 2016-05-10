'use strict';

angular.module('lamiJetApp')
  .factory('notesService', ['$http', function ($http) {

    var notesService = {};

    // Fetch note by id
    notesService.fetchNote = function(id) {
      return $http.get('/api/notes/' + id).then(response => {
        return response.data;
      });
    };

    // Fetch notes
    notesService.fetchNotes = function() {
      return $http.get('/api/notes').then(response => {
        return response.data;
      });
    };

    // Update note
    notesService.updateNote = function(note) {
      return $http.put('/api/notes/' + note._id, note).then(response => {
        return response.data;
      });
    };

    // Create note
    notesService.createNote = function(note) {
      return $http.post('/api/notes', note).then(response => {
        return response.data;
      });
    };

    // Delete note
    notesService.deleteNote = function(id) {
      return $http.delete('/api/notes/' + id).then(response => {
        return response.data;
      });
    };

    // Submit comment
    notesService.submitComment = function(id, comment) {
      return $http.post('/api/notes/' + id + '/comments', comment).then(response => {
        return response.data;
      });
    };

    // Update comment
    notesService.updateComment = function(id, comment) {
      return $http.put('/api/notes/' + id + '/comments/' + comment._id).then(response => {
        return response.data;
      });
    };

    // Delete comment
    notesService.deleteComment = function(id, commentId) {
      return $http.delete('/api/notes/' + id + '/comments/' + commentId).then(response => {
        return response.data;
      });
    };

    return notesService;

  }]);
