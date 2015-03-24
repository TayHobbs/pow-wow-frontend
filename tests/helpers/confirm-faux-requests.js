var confirmFaux;

confirmFaux = function(assert) {
  var ajaxCall, handler, _i, _j, _len, _len1, _ref, _ref1, _results;
  _ref = $.fauxjax.unfired();
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    handler = _ref[_i];
    assert.ok(false, "Faked url not used: " + handler.url + handler.type +handler.dataType);
    console.log("Faked url not used: " + handler.url + handler.type +handler.dataType);
  }
  _ref1 = $.fauxjax.unhandled();
  _results = [];
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    ajaxCall = _ref1[_j];
    console.log("[" + ajaxCall.type + "] Ajax call not faked: " + ajaxCall.url +ajaxCall.type + ajaxCall.dataType);
    console.log(ajaxCall);
    _results.push(assert.ok(false, "[" + ajaxCall.type + "] Ajax call not faked: " + ajaxCall.url));
  }
  return _results;
};

export default confirmFaux;
