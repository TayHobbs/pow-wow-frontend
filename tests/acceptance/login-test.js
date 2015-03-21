import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'pow-wow-frontend/tests/helpers/start-app';

var application;

module('Acceptance: Login', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /login', function(assert) {
  visit('/login');

  andThen(function() {
    assert.equal(currentPath(), 'authentication.login');
  });
});
