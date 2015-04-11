import ENV from 'pow-wow-frontend/config/environment';

let loginEndpoint = function() {
  $.fauxjax.new({
    request: {
      method: 'POST',
      url: ENV.apiDomain.concat('/session'),
      data: {login: 'test@test.com', password: 'testing1'}
    },
    response: {
      content: {api_key: {access_token: 'abc123', id: 1, user_id: 1}, username: 'testUser'}
    }
  });
};

let getUserEndpoint = function() {
  $.fauxjax.new({
    request: {
      type: 'GET',
      url: ENV.apiDomain.concat('/users/1'),
      headers: {Authorization: 'abc123'},
    },
    response: {
      content: {user:{id: 1, username: 'testUser', email: 'test@test.com', password: 'testing1', admin:false, access_token: 'abc123'}}
    }
  });
};

let editUserEndpoint = function() {
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
};

var loginUser = function() {
  localStorage.accessToken = 'abc123';
  localStorage.userId = 1;
  localStorage.username = 'testUser';
};


export { loginEndpoint, loginUser, getUserEndpoint, editUserEndpoint };
