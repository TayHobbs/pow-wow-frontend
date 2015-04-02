import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessage: null,

  timeOutFlashMessage: function() {
    var controller = this;
    if (this.flashMessage) {
      Ember.run.later(() => {
        this.send('dismissFlashMessage');
      }, 3000);
    }
  }.observes('flashMessage').on('init'),

  actions: {
    dismissFlashMessage: function() {
      this.set('flashMessage', null);
    }
  }
});
