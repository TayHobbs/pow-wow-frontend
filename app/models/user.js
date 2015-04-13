import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  admin: DS.attr('boolean', {defaultValue: false}),

  validEmail: Ember.computed.match('email', /.+@.+\..+/),
  userId: Ember.computed(function() {
    return 'user-' + this.get('id');
  })
});
