import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'pow-wow-frontend/tests/helpers/start-app';
import confirmFaux from 'pow-wow-frontend/tests/helpers/confirm-faux-requests';

var application;

module('Acceptance: Login', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function(assert) {
    Ember.run(application, 'destroy');
    confirmFaux(assert);
    $.fauxjax.clear();
  }
});

test('visiting /login', function(assert) {
  visit('/login');

  andThen(function() {
    assert.equal(currentPath(), 'authentication.login');
  });
});

test('access token is stored in local storage', function(assert) {
  $.fauxjax.new({
    type: 'POST',
    url: 'http://powwowapi.com/session',
    dataType: 'json',
    responseText: {
      api_key: {
        access_token: "d7a31c8423c6045d9beda1e774d6a105",
        id: 40,
        user_id: 1
      }
    }
  });
  visit('/login');
  fillIn('#login', 'testuser@test.com');
  fillIn('#password', 'testing1');
  click('button[type=submit]');
  andThen(function() {
    assert.equal(currentPath(), 'authentication.login');
  });
});
