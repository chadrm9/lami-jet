'use strict';

angular.module('lamiJetApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('notes', {
        abstract: true,
        url: '',
        'authenticate': 'true',
        template: '<div ui-view></div>',
      })
      .state('notes.list', {
        url: '/notes',
        'authenticate': 'true',
        template: '<notes-list></notes-list>',
        ncyBreadcrumb: {
          label: 'Notes'
        }
      })
			.state('notes.view', {
				url: '/notes/view/:id',
				'authenticate': 'true',
				views: {
          '': {
            template: '<notes-view></notes-view>'
          },
					'commentsEdit@notes.view': {
						templateUrl: 'app/notes/views/commentsEdit.html'
					},
          'commentEdit@notes.view': {
            templateUrl: 'app/notes/views/commentEdit.html'
          }
				},
        ncyBreadcrumb: {
          label: 'View Note',
          parent: 'notes.list'
        }
			})
      .state('notes.edit', {
        url: '/notes/edit/:id',
        'authenticate': 'true',
        views: {
          '': {
            template: '<notes-edit></notes-edit>',
          },
          'noteEdit@notes.edit': {
            templateUrl: 'app/notes/views/noteEdit.html'
          },
          'commentsView@notes.edit': {
            templateUrl: 'app/notes/views/commentsView.html'
          }
        },
        ncyBreadcrumb: {
          label: 'Edit Note',
          parent: 'notes.list'
        }
      })
      .state('notes.create', {
        url: '/notes/create',
        'authenticate': 'true',
        views: {
          '': {
            template: '<notes-create></notes-create>',
          },
          'noteEdit@notes.create': {
            templateUrl: 'app/notes/views/noteEdit.html'
          }
        },
        ncyBreadcrumb: {
          label: 'Create Note',
          parent: 'notes.list'
        }
      });
  });
