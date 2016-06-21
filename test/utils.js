'use strict';

const Expect = require('chai').expect;

const validData = require('../utils').validData;

describe('utilities', () => {
  context('#validData', () => {
    it('should pass valid data', () => {
      const data = {
        phone: {
          region: '52',
          number: '9621087445'
        },
        user: {
          email: 'starships@outlook.com'
        }
      };

      Expect(validData(data)).to.be.equal(true);
    });
  });
});
