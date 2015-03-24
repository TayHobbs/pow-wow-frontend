import Ember from 'ember';
import ENV from 'pow-wow-frontend/config/environment';

export default Ember.Controller.extend({
  updateToken: function() {
    ENV.APP.accessToken = this.get('localStorageProxy.accessToken');
  }.observes("localStorageProxy.accessToken").on("init")
});