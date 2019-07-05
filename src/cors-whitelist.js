'use strict';

const whitelist = ['http://localhost:3000', 'https://squadup.now.sh'];
const originGenerator = function (origin, callback) {
  if (whitelist.indexOf(origin) !== -1 || !origin) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
};

module.exports = originGenerator;