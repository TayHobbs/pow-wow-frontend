import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'pow-wow-frontend/tests/helpers/start-app';

import { loginUser, projectsListMock, createProjectMock } from '../helpers/mock-helpers';

var application;

module('Acceptance | project', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('can see list of project', function(assert) {
  loginUser();
  projectsListMock();
  visit('/project');
  andThen(function() {
    assert.equal(find('#project-1 .project-name').text(), 'Project 1');
  });
});
