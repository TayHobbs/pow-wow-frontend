import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'pow-wow-frontend/tests/helpers/start-app';

import { loginEndpoint } from '../helpers/mock-helpers';
import ENV from 'pow-wow-frontend/config/environment';

let application;

module('Acceptance: Signup', {
  beforeEach: function() {
    application = startApp();
    localStorage.clear();
    $.fauxjax.settings.strictMatching = false;
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

test('display error messages when there is an error creating a user', function(assert) {
  $.fauxjax.new({
    request: {
      type: 'POST',
      url: ENV.apiDomain.concat('/users'),
      data: JSON.stringify({user: {username: 'testUser', email: 'test@test.com', password: 'testing1', admin:false}}),
      dataType: 'json'
    },
    response: {
      status: 422,
      content: {errors: {username: ['has already been taken']}}
    }
  });
  visit('/signup');

  fillIn('#username', 'testUser');
  fillIn('#email',    'test@test.com');
  fillIn('#password', 'testing1');
  click('button[type=submit]');
  andThen(function() {
    assert.equal(find('.error').text().trim(), 'username has already been taken.');
  });
});

test('display email is invalid message when the entered email is invalid', function(assert) {
  visit('/signup');

  fillIn('#username', 'testUser');
  fillIn('#email',    'test.com');
  fillIn('#password', 'testing1');
  click('button[type=submit]');
  andThen(function() {
    assert.equal(find('.error').text().trim(), 'Email is invalid, please enter another.');
  });
});

test('can create new user and store token in local storage automatically', function(assert) {
  loginEndpoint();
  $.fauxjax.new({
    request: {
      type: 'POST',
      url: ENV.apiDomain.concat('/users'),
      data: JSON.stringify({user: {username: 'testUser', email: 'test@test.com', password: 'testing1', admin:false}}),
      dataType: 'json'
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
