'use strict';
(function(){

  class NotesEditComponent {
    constructor($state, Auth, notesService, focus, alertService) {
      this.$state = $state;
      this.getCurrentUser = Auth.getCurrentUser;

      this.notesService = notesService;
      this.note = {};

      this.focus = focus;
      this.alertService = alertService;

      this.submitted = false;
    }

    $onInit() {
      // Fetch note
      this.notesService.fetchNote(this.$state.params.id).then(response => {
        this.note = response;
      })
      .catch(err => {
        console.error(err);
        // State => notes
        this.$state.go('notes');
      });
    }

    saveNote(form) {
      if (form.$valid) {
        // Update note
        this.notesService.updateNote(this.note).then(() => {
          // State => notes.view, params.id: 'note._id'
          this.$state.go('notes.view', {id:this.note._id});
          this.alertService.add('success', 'Note saved!', 5000);
          this.note = {};
          this.submitted = false;
        });
      }
      else {
        this.submitted = true;
        if (form.title.$invalid) {
          this.focus('title');
        }
        else if (form.message.$invalid) {
          this.focus('message');
        }
      }
    }

    // Flip filter direction by updatedAt
    sortReverse() {
      this.sortDirection = !this.sortDirection;
    }
  }

  angular.module('lamiJetApp')
    .component('notesEdit', {
      templateUrl: 'app/notes/notesEdit/notesEdit.html',
      controller: NotesEditComponent,
      controllerAs: 'vm'
    });

})();
