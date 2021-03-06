import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'pow-wow-frontend/tests/helpers/start-app';

import ENV from 'pow-wow-frontend/config/environment';
import { loginUser, getUsersEndpoint, editUserEndpoint  } from '../helpers/mock-helpers';

let application;
$.fauxjax.settings.strictMatching = false;

module('Acceptance: Admin', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /admin', function(assert) {
  loginUser();
  visit('/admin');

  andThen(function() {
    assert.equal(currentURL(), '/admin');
  });
});

test('admin.users route shows list of users', function(assert) {
  loginUser();
  getUsersEndpoint();
  $.fauxjax.new({
    request: {
      type: 'GET',
      url: `${ENV.apiDomain}/users`,
      headers: {Authorization: 'abc123'}
    },
    response: {
      content: {users: [
        { id: 1, username: 'testUser', email: 'test@test.com', admin: true },
        { id: 2, username: 'testing', email: 'testing@test.com', admin: false }
      ]
      }
    }
  });
  visit('/admin/users');

  andThen(function() {
    assert.equal(find('#user-1 .username').text(), 'testUser');
    assert.equal(find('#user-1 .email').text(), 'test@test.com');
    assert.equal(find('#user-1 .admin').text(), 'true');

    assert.equal(find('#user-2 .username').text(), 'testing');
    assert.equal(find('#user-2 .email').text(), 'testing@test.com');
    assert.equal(find('#user-2 .admin').text(), 'false');
  });
});

test('admin.users.detail route shows a specific user', function(assert) {
  loginUser();
  getUsersEndpoint();
  editUserEndpoint();
  visit('/admin/users/1');

  andThen(function() {
    assert.equal(find('.edit-user').text(), 'Edit User: testUser');
    fillIn('#username', 'test');
    fillIn('#email', 'testUser@test.com');
    click('button[type=submit]');
    andThen(function() {
      assert.equal(find('#user-1 .username').text(), 'test');
      assert.equal(find('#user-1 .email').text(), 'testUser@test.com');
      assert.equal(find('.flash-message').text().trim(), 'User information successfully changed!');
    });
  });
});
