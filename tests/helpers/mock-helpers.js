var loginEndpoint = function(){
  $.fauxjax.new({
    method: 'POST',
    url: 'https://www.powwowapi.com/session',
    status: 200,
    dataType: 'json',
    responseText: {
      "api_key":{
        "id": 38,
        "access_token":"123abc",
        "user_id": 1
      }
    }
  });
};

export { loginEndpoint };
