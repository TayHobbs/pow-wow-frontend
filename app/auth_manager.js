import Ember from 'ember';
import ApiKey from './models/api-key';
import App from './app';
import DS from 'ember-data';
import ENV from 'pow-wow-frontend/config/environment';

export default Ember.Object.extend({
  rememberMe: false,

  // Load the current user if the cookies exist and is valid
  init: function() {
    this._super();
    if (ENV.APP.authToken) {
      var accessToken = ENV.APP.authToken.token;
      var authUserId  = ENV.APP.authToken.user_id;
      if (!Ember.isEmpty(accessToken) && !Ember.isEmpty(authUserId)) {
        this.authenticate(accessToken, authUserId);
      }
    }
  },

  // Determine if the user is currently authenticated.
  isAuthenticated: function() {
    return !Ember.isEmpty(this.get('apiKey.accessToken')) && !Ember.isEmpty(this.get('apiKey.user'));
  },

  // Authenticate the user. Once they are authenticated, set the access token to be submitted with all
  // future AJAX requests to the server.
  authenticate: function(accessToken, userId, rememberMe) {
    var self = this;
    Ember.run(function() {
      Ember.$.ajaxSetup({
        headers: { 'Authorization': accessToken }
      });
      var $this = self;
      $this.get('store').find('user', userId).then(function(user) {
        $this.set('apiKey', ApiKey.create({
          accessToken: accessToken,
          user: user
        }));
      }, function(reason) {
        // on rejection
        console.error(reason);
      });
      // set the rememberMe flag which determines if an authentication cookie is used
      $this.set('rememberMe', rememberMe);
    });
  },

  // Log out the user
  reset: function() {
    Ember.run.sync();
    Ember.run.next(this, function(){
      this.set('apiKey', null);
      Ember.$.ajaxSetup({
        headers: { 'Authorization': 'None' }
      });
    });
  },

  // Ensure that when the apiKey changes, we store the data in cookies in order for us to load
  // the user when the browser is refreshed.
  apiKeyObserver: function() {
    if (Ember.isEmpty(this.get('apiKey'))) {
      ENV.APP.authToken = '';
      ENV.APP.user_id = '';
    } else {
      // Store in local storage if rememberMe is true
    }
  }.observes('apiKey')
});

// Reset the authentication if any ember data request returns a 401 unauthorized error
DS.rejectionHandler = function(reason) {
  if (reason.status === 401) {
    App.AuthManager.reset();
  }
  throw reason;
};
