var get = function(url, data) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      method: "GET",
      url: url,
      data: data
    })
    .done(function( res ) {
      resolve(res);
    });
  })
};

var post = function(url, data) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      method: "POST",
      url: url,
      data: data
    })
    .done(function( res ) {
      resolve(res);
    });
  })
};

var _request = {
  get: get,
  post: post
};

function getRequest() {
  return _request;
}