'use strict';

/* dependencies */
const _ = require('lodash');
const faker = require('faker');

function sample(n = 3) {
  return {
    name: faker.name.findName()
  };
}

module.exports = function (size = 10) {
  size = size > 0 ? size : 10;
  return _.times(size, sample);
};