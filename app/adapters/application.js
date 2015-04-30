import Ember from 'ember';
import DS from 'ember-data';

import ENV from 'pow-wow-frontend/config/environment';

export default DS.ActiveModelAdapter.extend({
  host: ENV.apiDomain,
  headers: Ember.computed(function() {
    return { 'Authorization': this.get('localStorageProxy.accessToken') };
  }).volatile()
});
