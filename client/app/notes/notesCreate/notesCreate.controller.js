'use strict';
(function(){

  class NotesCreateComponent {
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
      this.note.user = this.getCurrentUser();
      this.focus('title');
    }

    saveNote(form) {
      if (form.$valid) {
        // Create note
        this.notesService.createNote(this.note).then(() => {
          // State => notes
          this.$state.go('notes');
          this.alertService.add('success', 'Note created!', 5000);
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
  }

  angular.module('lamiJetApp')
    .component('notesCreate', {
      templateUrl: 'app/notes/notesCreate/notesCreate.html',
      controller: NotesCreateComponent,
      controllerAs: 'vm'
    });

})();
