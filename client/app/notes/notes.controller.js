'use strict';
(function(){

  class NotesComponent {
    constructor(Auth, notesService, alertService) {
      this.isAdmin = Auth.isAdmin;
      this.getCurrentUser = Auth.getCurrentUser;

      this.notesService = notesService;
      this.alertService = alertService;

      this.filter = '';
      this.sortDirection = false;
    }

    $onInit() {
      // Fetch notes
      this.notesService.fetchNotes().then(response => {  
        this.notes = response;
      });
    }

    deleteNote(id) {
      this.notesService.deleteNote(id).then(() => {
        this.notesService.fetchNotes().then(response => {
          this.notes = response;
          this.alertService.add('success', 'Note deleted!', 5000);
        });
      });
    }

    // Flip filter direction by updatedAt
    sortReverse() {
      this.sortDirection = !this.sortDirection;
    }

    // Check user is owner or admin
    userCanEdit(user) {
      if (this.getCurrentUser().name === user || this.isAdmin()) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  angular.module('lamiJetApp')
    .component('notes', {
      templateUrl: 'app/notes/notes.html',
      controller: NotesComponent,
      controllerAs: 'vm',
    });
})();