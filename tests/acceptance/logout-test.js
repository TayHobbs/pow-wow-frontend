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
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /logout', function(assert) {
  visit('/logout');

  andThen(function() {
    assert.equal(currentPath(), 'authentication.logout');
  });
});
