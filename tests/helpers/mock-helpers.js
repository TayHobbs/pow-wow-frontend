import ENV from 'pow-wow-frontend/config/environment';

var loginEndpoint = function() {
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

var getUserEndpoint = function() {
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

var loginUser = function() {
  localStorage.accessToken = 'abc123';
  localStorage.userId = 1;
  localStorage.username = 'testUser';
};


export { loginEndpoint, loginUser, getUserEndpoint };
