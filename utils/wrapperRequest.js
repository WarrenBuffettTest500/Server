const request = require('request');

exports.wrapperRequest = options => {
  return new Promise((res, rej) => {
    request(options, function (err, response, data) {
      if (err) return rej(err);
      res(data);
    });
  });
}
