'use strict';

const Expect = require('chai').expect;

const keys = require('../keys');
const Valid = require('../utils/valid');

describe('Utils', () => {
  context('valid #message', () => {
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

      Expect(Valid.message(data)).to.be.equal(true);
    });
  });

  context('valid #verification', () => {
    it('should return false if message property is not present', () => {
      const data = {
        user: {
          email: keys.user_email
        }
      };

      Expect(Valid.verification(data)).to.be.equal(false);
    });

    it('should return false if message.code property is not present', () => {
      const data = {
        message: {},
        user: {
          email: keys.user_email
        }
      };

      Expect(Valid.verification(data)).to.be.equal(false);
    });

    it('should return false if user property is not present', () => {
      const data = {
        message: {
          code: keys.verification_code
        }
      };

      Expect(Valid.verification(data)).to.be.equal(false);
    });

    it('should return false if user.code property is not present', () => {
      const data = {
        message: {
          code: keys.verification_code
        },
        user: {}
      };

      Expect(Valid.verification(data)).to.be.equal(false);
    });

    it('should return false if message.code.length is not 6', () => {
      const data = {
        message: {
          code: '123456777'
        },
        user: {
          email: keys.user_email
        }
      };

      Expect(Valid.verification(data)).to.be.equal(false);
    });
  });
});
