'use strict';
(function(){

  class NotesViewComponent {
    constructor($state, Auth, notesService, focus, alertService) {
      this.$state = $state;

      this.isAdmin = Auth.isAdmin;
      this.getCurrentUser = Auth.getCurrentUser;

      this.notesService = notesService;
      this.note = {};

      this.comment = {};
      this.comment.user = this.getCurrentUser();

      this.focus = focus;
      this.alertService = alertService;

      this.add = false;
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

    saveComment(form) {
      if (form.$valid) {
        // Update existing comment
        if(this.notNew) {
          this.notesService.updateComment(this.note._id, this.comment).then(() => {
            this.notesService.fetchNote(this.note._id).then(response => {
              this.note = response;
              this.alertService.add('success', 'Comment updated!', 5000);
              this.resetComment();
            });
          });
        }
        // Save new comment
        else {
          this.notesService.saveComment(this.note._id, this.comment).then(() => {
            this.notesService.fetchNote(this.note._id).then(response => {
              this.note = response;
              this.alertService.add('success', 'Comment saved!', 5000);
              this.resetComment();
            });
          });
        }
      }
      else {
        this.submitted = true;
        if (form.message.$invalid) {
          this.focus('comment');
        }
      }
    }

    deleteComment(commentId) {
      this.notesService.deleteComment(this.note._id, commentId).then(() => {
        this.notesService.fetchNote(this.note._id).then(response => {
          this.note = response;
          this.alertService.add('success', 'Comment deleted!', 5000);
        });
      });
    }

    editComment(comment) {
      this.comment._id = comment._id;
      this.comment.message = comment.message;
      this.add = true;
      this.notNew = true;
      this.focus('comment');
    }

    resetComment() {
      this.add = false;
      this.comment = {};
      this.notNew = false;
      this.submitted = false;
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
    .component('notesView', {
      templateUrl: 'app/notes/notesView/notesView.html',
      controller: NotesViewComponent,
      controllerAs: 'vm'
    });

})();
