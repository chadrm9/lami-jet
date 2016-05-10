'use strict';

angular.module('lamiJetApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('notes', {
        url: '/notes',
        'authenticate': 'true',
        template: '<notes></notes>'
      })
      .state('notesEdit', {
        url: '/notes/edit/:id',
        'authenticate': 'true',
        views: {
          '': {
            template: '<notes-edit></notes-edit>'
          },
          'noteEdit@notesEdit': {
            templateUrl: 'app/notes/views/noteEdit.html'
          }
        }
      });
  });
