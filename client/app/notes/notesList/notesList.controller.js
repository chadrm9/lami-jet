'use strict';
(function(){

  class NotesListComponent {
    constructor(Auth, notesService, alertService) {
      this.isAdmin = Auth.isAdmin;
      this.getCurrentUser = Auth.getCurrentUser;
      this.notesService = notesService;
      this.alertService = alertService;

      // Descending by createdAt
      this.sortDirection = true;
    }

    $onInit() {
      // Fetch notes
      this.notesService.fetchNotes().then(response => {  
        this.notes = response;
      });
    }

    deleteNote(id) {
      // Delete note
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
    isOwnerOrAdmin(user) {
      if (this.getCurrentUser().name === user || this.isAdmin()) {
        return true;
      }
      else {
        return false;
      }
    }

    // Check user is owner
    isOwner(user) {
      if (this.getCurrentUser().name === user) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  angular.module('lamiJetApp')
    .component('notesList', {
      templateUrl: 'app/notes/notesList/notesList.html',
      controller: NotesListComponent,
      controllerAs: 'vm',
    });
})();