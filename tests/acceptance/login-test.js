import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

import { loginEndpoint } from '../helpers/mock-helpers';
import ENV from 'pow-wow-frontend/config/environment';

let application;

module('Acceptance: Login', {
  beforeEach: function() {
    application = startApp();
    localStorage.clear();
    $.fauxjax.settings.strictMatching = false;
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    $.fauxjax.clear();
  }
});

test('visiting /login', function(assert) {
  visit('/login');

  andThen(function() {
    assert.equal(currentPath(), 'authentication.login');
  });
});

test('login', function(assert) {
  assert.equal(localStorage.accessToken, null);
  loginEndpoint();
  visit('/login');

  fillIn('#login', 'test@test.com');
  fillIn('#password', 'testing1');
  click('button[type=submit]')
  andThen(function() {
    assert.equal(localStorage.accessToken, 'abc123');
    assert.equal(localStorage.userId, 1);
    assert.equal(localStorage.username, 'testUser');
    assert.equal(currentPath(), 'index');
    assert.equal(find('#current-user').text().trim(), 'testUser', 'Username not shown in navbar');
  });
});

test('failed login', function(assert) {
  $.fauxjax.new({
    request: {
      method: 'POST',
      url: ENV.apiDomain.concat('/session'),
      data: {login: 'test@test.com', password: 'testing1'}
    },
    response: {
      status: 401
    }
  });

  visit('/login');

  fillIn('#login', 'test@test.com');
  fillIn('#password', 'testing1');
  click('button[type=submit]')
  andThen(function() {
    assert.equal(currentPath(), 'authentication.login');
    assert.equal(find('.flash-message').text().trim(), 'Incorrect username or password, please try again', 'Error message not displayed');
  });
});
