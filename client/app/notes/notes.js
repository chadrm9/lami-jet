'use strict';

angular.module('lamiJetApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('notes', {
        url: '/notes',
        'authenticate': 'true',
        template: '<notes></notes>'
      })
			.state('notesView', {
				url: '/notes/view/:id',
				'authenticate': 'true',
				views: {
					'': {
						template: '<notes-view></notes-view>',
					},
					'commentsEdit@notesView': {
						templateUrl: 'app/notes/views/commentsEdit.html'
					},
          'commentEdit@notesView': {
            templateUrl: 'app/notes/views/commentEdit.html'
          }
				}
			})
      .state('notesEdit', {
        url: '/notes/edit/:id',
        'authenticate': 'true',
        views: {
          '': {
            template: '<notes-edit></notes-edit>',
          },
          'noteEdit@notesEdit': {
            templateUrl: 'app/notes/views/noteEdit.html'
          },
          'commentsView@notesEdit': {
            templateUrl: 'app/notes/views/commentsView.html'
          }
        }
      })
      .state('notesCreate', {
        url: '/notes/create',
        'authenticate': 'true',
        views: {
          '': {
            template: '<notes-create></notes-create>',
          },
          'noteEdit@notesCreate': {
            templateUrl: 'app/notes/views/noteEdit.html'
          }
        }
      });
  });
