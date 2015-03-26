import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'pow-wow-frontend/tests/helpers/start-app';

import { loginEndpoint } from '../helpers/mock-helpers';
import ENV from 'pow-wow-frontend/config/environment';

var application;

module('Acceptance: Signup', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function(assert) {
    Ember.run(application, 'destroy');
    $.fauxjax.clear();
  }
});

test('visiting /signup', function(assert) {
  visit('/signup');

  andThen(function() {
    assert.equal(currentPath(), 'signup');
  });
});

test('clicking register link takes you to signup route', function(assert) {
  visit('/');
  click('#register');
  andThen(function() {
    assert.equal(currentPath(), 'signup');
  });
});

test('can create new user and store token in local storage automatically', function(assert) {
  loginEndpoint()
  $.fauxjax.new({
    request: {
      type: 'POST',
      url: ENV.apiDomain.concat('/users'),
      data: JSON.stringify({user: {username: 'testUser', email: 'test@test.com', password: 'testing1', admin:false}})
    },
    response: {
      content: {user:{id: 1, username: 'testUser', email: 'test@test.com', password: 'testing1', admin:false, access_token: 'abc123'}}
    }
  });
  visit('/signup');

  fillIn('#username', 'testUser');
  fillIn('#email',    'test@test.com');
  fillIn('#password', 'testing1');
  click('button[type=submit]');
  andThen(function() {
    assert.equal(currentPath(), 'index', 'did not redirect');
    assert.equal(localStorage.accessToken, 'abc123');
    assert.equal(localStorage.userId, 1);
  });
});
