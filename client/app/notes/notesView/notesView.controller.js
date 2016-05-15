'use strict';
(function(){

class NotesViewComponent {
  constructor($state, notesService, focus, alertService) {
      this.$state = $state;

      this.notesService = notesService;
      this.notes = [];
      this.note = {};

      this.focus = focus;
      this.alertService = alertService;

      this.submitted = false;
    }

    $onInit() {
      // Fetch existing note
      if(this.$state.params.id) {
        this.notesService.fetchNote(this.$state.params.id).then(response => {
          this.note = response;
        });
      }
      // New note
      else {
        this.focus('title');
      }
    }

    saveNote(form) {
      if (form.$valid) {
        // Update existing note
        if(this.$state.params.id) {
          this.notesService.updateNote(this.note).then(() => {
            this.$state.go('notes');
            this.alertService.add('success', 'Note saved!', 5000);
            this.note = {};
            this.submitted = false;
          });
        }
        // Create new note
        else {
          this.notesService.createNote(this.note).then(() => {
            this.$state.go('notes');
            this.alertService.add('success', 'Note created!', 5000);
            this.note = {};
            this.submitted = false;
          });
        }
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
    .component('notesView', {
      templateUrl: 'app/notes/notesView/notesView.html',
      controller: NotesViewComponent,
      controllerAs: 'vm'
    });

})();
