import Ember from 'ember';
import ActiveModelAdapter from 'active-model-adapter';

import ENV from 'pow-wow-frontend/config/environment';

export default ActiveModelAdapter.extend({
  host: ENV.apiDomain,
  headers: Ember.computed(function() {
    return { 'Authorization': this.get('localStorageProxy.accessToken') };
  }).volatile()
});
