import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({
  namespace: '',
  host: 'http://localhost:3000'
});
