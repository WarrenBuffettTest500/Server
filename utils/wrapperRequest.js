const request = require('request');

exports.wrapperRequest = options => {
  return new Promise((res, rej) => {
    request(options, function (error, response, data) {
      if (error) return rej(error);
      res(data);
    });
  });
};
