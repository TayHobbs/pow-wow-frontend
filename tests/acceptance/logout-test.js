import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'pow-wow-frontend/tests/helpers/start-app';

var application;

module('Acceptance: Logout', {
  beforeEach: function() {
    application = startApp();
    localStorage.accessToken = 'abc123';
    localStorage.userId = 1;
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('logout action clears local storage', function(assert) {
  visit('/index');

  andThen(function() {
    assert.equal(localStorage.accessToken, 'abc123');
    assert.equal(localStorage.userId, 1);

    click('#logout');
    andThen(function() {
      assert.equal(localStorage.accessToken, null);
      assert.equal(localStorage.userId, null);
      assert.equal(localStorage.username, null);
      assert.equal(currentPath(), 'index');
    });
  });
});
