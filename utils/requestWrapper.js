const request = require('request');

exports.requestWrapper = options => {
  return new Promise((res, rej) => {
    request(options, (error, response, data) => {
      if (error) return rej(error);
      res(data);
    });
  });
};
