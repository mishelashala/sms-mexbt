'use strict';

const Expect = require('chai').expect;

const keys = require('../keys');
const validData = require('../utils').validData;

describe('utilities', () => {
  context('#validData', () => {
    it('should pass valid data', () => {
      const data = {
        phone: {
          region: keys.phone_region,
          number: keys.phone_number
        },
        user: {
          email: keys.user_email
        }
      };

      Expect(validData(data)).to.be.equal(true);
    });
  });
});
