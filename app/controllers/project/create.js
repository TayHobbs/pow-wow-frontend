import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createProject() {
      this.store.createRecord('project', {
        name: this.get('name'),
        owner: this.store.fetchById('user', this.get('localStorageProxy.userId'))
      });
      this.transitionToRoute('project');
    }
  }
});
