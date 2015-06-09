import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  owner: DS.belongsTo('user'),

  projectId: Ember.computed('id', function() {
    return `project-${this.get('id')}`;
  })
});
