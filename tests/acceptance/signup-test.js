import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'pow-wow-frontend/tests/helpers/start-app';
import confirmFaux from 'pow-wow-frontend/tests/helpers/confirm-faux-requests';

var application;

module('Acceptance: Signup', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function(assert) {
    Ember.run(application, 'destroy');
    confirmFaux(assert);
    $.fauxjax.clear();
  }
});

// test('visiting /signup', function(assert) {
//   visit('/signup');

  // andThen(function() {
  //   assert.equal(currentPath(), 'signup');
  // });
// });

// test('can create new user', function(assert) {
//   $.fauxjax.new({
//     type: 'POST',
//     url: 'https://powwowapi.com/users',
//     responseText: {api_key: 'abc123', user_id:1 }
//   });
//   visit('/signup');

//   fillIn('#username', 'testUser');
//   fillIn('#email',    'test@test.com');
//   fillIn('#password', 'testing1');
//   click('button[type=submit]');
//   andThen(function() {
//     assert.equal(currentPath(), 'index', 'did not redirect');
//   });
// });
