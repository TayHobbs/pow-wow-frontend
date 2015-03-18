import Ember from 'ember';
import DS from 'ember-data';
import ENV from 'pow-wow-frontend/config/environment';

export default DS.ActiveModelAdapter.extend({
  namespace: '',
  host: 'http://localhost:3000',
  // headers: {
  //   'Authorization': Ember.get('localStorageProxy.accessToken')
  // }
});
