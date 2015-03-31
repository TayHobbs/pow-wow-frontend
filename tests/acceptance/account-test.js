import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

import { loginEndpoint, loginUser, getUserEndpoint } from '../helpers/mock-helpers';
import ENV from 'pow-wow-frontend/config/environment';

var application = undefined

module('Acceptance: Account', {
  beforeEach: function() {
    application = startApp();
    localStorage.clear();
    $.fauxjax.settings.debug = true
    $.fauxjax.settings.strictMatching = false
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    $.fauxjax.clear()
  }
});

test('user must be logged in to visit account route', function(assert) {
  visit('/account');
  andThen(function() {
    assert.equal(currentPath(), 'authentication.login');
  });
});

test('user must be logged in to visit account.delete route', function(assert) {
  visit('/account/delete');
  andThen(function() {
    assert.equal(currentPath(), 'authentication.login');
  });
});

test('logged in user can visit account route', function(assert) {
  assert.equal(localStorage.accessToken, null);
  loginUser();

  visit('/index');
  click('#account');
  andThen(function() {
    assert.equal(currentPath(), 'account.index');
    visit('/account/delete');
    andThen(function() {
      assert.equal(currentPath(), 'account.delete');
    });
  });
});

test('clicking Delete Account shows confirmation text', function(assert) {
  loginUser();

  visit('/account');

  click('#delete-account')
  andThen(function() {
    assert.equal(currentPath(), 'account.delete');
    assert.equal(find('#delete-confirmation').text().trim(), 'Are you sure you want to delete your account?');
  });
});

test('clicking no button takes you back to account.index', function(assert) {
  loginUser();
  visit('/account/delete');

  click('#no');
  andThen(function() {
    assert.equal(currentPath(), 'account.index');
  });
});

test('delete user account', function(assert) {
  assert.equal(localStorage.accessToken, null);
  loginUser();
  $.fauxjax.new({
    request: {
      type: 'DELETE',
      url: ENV.apiDomain.concat('/users/1'),
      headers: {Authorization: 'abc123'}
    },
    response: {
      // This is required for some reason, even though the real response is {}
      content: {user:{id:1}}
    }
  });

  visit('/account/delete');

  click('#yes');
  andThen(function() {
    assert.equal(localStorage.accessToken, null);
    assert.equal(localStorage.userId, null);
    assert.equal(localStorage.username, null);
    assert.equal(currentPath(), 'index');
  });
});

test('link to account.edit', function(assert) {
  loginUser();
  visit('/account');

  click('#edit-account');
  andThen(function() {
    assert.equal(currentPath(), 'account.edit');
  });
});

test('edit user account', function(assert) {
  loginUser();
  getUserEndpoint();
  $.fauxjax.new({
    request: {
      type: 'PUT',
      url: ENV.apiDomain.concat('/users/1'),
      headers: {Authorization: 'abc123'},
      data: JSON.stringify({user: {username: "test", email: "testUser@test.com", password: null, admin: false}})
    },
    response: {
      // This is required for some reason, even though the real response is {}
      content: {user:{id:1}}
    }
  });

  visit('/account/edit');

  fillIn('#username', 'test')
  fillIn('#email', 'testUser@test.com')
  click('button[type=submit]');
  andThen(function() {
    assert.equal(localStorage.username, 'test');
    assert.equal(find('#current-user').text().trim(), 'test', 'Username not shown in navbar');
    assert.equal(currentPath(), 'account.index');
  });
});
