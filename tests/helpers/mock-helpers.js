import ENV from 'pow-wow-frontend/config/environment';

var loginEndpoint = function() {
  $.fauxjax.new({
    request: {
      method: 'POST',
      url: `${ENV.apiDomain}/session`,
      data: {login: 'test@test.com', password: 'testing1'}
    },
    response: {
      content: {api_key: {access_token: 'abc123', id: 1, user_id: 1}, username: 'testUser'}
    }
  });
};

var getUserEndpoint = function() {
  $.fauxjax.new({
    request: {
      type: 'GET',
      url: `${ENV.apiDomain}/users/1`,
      headers: {Authorization: 'abc123'},
    },
    response: {
      content: {user:{id: 1, username: 'testUser', email: 'test@test.com', password: 'testing1', admin:false, access_token: 'abc123'}}
    }
  });
};

var getUsersEndpoint = function() {
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
};

var editUserEndpoint = function() {
  $.fauxjax.new({
    request: {
      type: 'PUT',
      url: `${ENV.apiDomain}/users/1`,
      headers: {Authorization: 'abc123'},
      data: JSON.stringify({user: {username: "test", email: "testUser@test.com", password: null, admin: false}})
    },
    response: {
      content: {user:{id:1}}
    }
  });
};

var loginUser = function() {
  loginEndpoint();
  getUserEndpoint();
  visit('/login');

  andThen(function() {
    fillIn('#login', 'test@test.com');
    fillIn('#password', 'testing1');
    click('button[type=submit]');
  });
};

var projectsListMock = function() {
  $.fauxjax.new({
    request: {
      type: 'GET',
      url: `${ENV.apiDomain}/projects`,
      headers: {Authorization: 'abc123'},
    },
    response: {
      content: {
        projects: [
          {
            id: 1,
            name: 'Project 1',
            owner: 1
          }
        ]
      }
    }
  });
};

export { loginEndpoint, loginUser, getUserEndpoint, getUsersEndpoint, editUserEndpoint, projectsListMock };
