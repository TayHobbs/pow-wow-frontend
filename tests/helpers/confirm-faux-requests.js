export default function() {
  $.fauxjax.unfired().forEach(function(handler) {
    console.log("Faked url not used: " + handler.request.url);
    console.log("Fake Details: ");
    console.log("  Method: " + handler.request.type);
    console.log("  Headers: " + _.pairs(handler.request.headers));
    console.log("  Data: " + handler.request.data);
  });
  $.fauxjax.unhandled().forEach(function(ajaxCall) {
    console.log(ajaxCall);
    console.log("[" + ajaxCall.type + "] Ajax call not faked: " + ajaxCall.url);
    console.log("Real Details: ");
    console.log("  Method: " + ajaxCall.type);
    console.log("  Headers: " + _.pairs(ajaxCall.headers));
    console.log("  Data: " + ajaxCall.data);
  });
}
