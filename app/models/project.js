import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  owner: DS.belongsTo('owner')
});
