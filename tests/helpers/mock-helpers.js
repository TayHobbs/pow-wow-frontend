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

var loginUser = function() {
  localStorage.accessToken = 'abc123';
  localStorage.userId = 1;
  localStorage.username = 'testUser';
};


export { loginEndpoint, loginUser };
