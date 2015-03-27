import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { loginEndpoint } from '../helpers/mock-helpers';

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

test('login', function(assert) {
  loginEndpoint()
  visit('/login');

  fillIn('#login', 'test@test.com');
  fillIn('#password', 'testing1');
  click('button[type=submit]')
  andThen(function() {
    assert.equal(localStorage.accessToken, 'abc123');
    assert.equal(localStorage.userId, 1);
    assert.equal(localStorage.username, 'testUser');
    assert.equal(currentPath(), 'index');
  });
});

test('shows username in navbar after login', function(assert) {
  loginEndpoint()
  visit('/login');

  fillIn('#login', 'test@test.com');
  fillIn('#password', 'testing1');
  click('button[type=submit]')
  andThen(function() {
    assert.equal(find('#current-user').text().trim(), 'testUser');
  });
});
