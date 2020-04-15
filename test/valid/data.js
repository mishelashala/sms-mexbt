const Expect = require('chai').expect;

const keys = require('../../keys');
const Valid = require('../../utils/valid');

describe('Data Validator', () => {
  context('#message', () => {
    it('should return true if data is valid', () => {
      const data = {
        phone: `${keys.phone_region}${keys.phone_number}`,
        email: `${keys.user_email}`
      };

      Expect(Valid.message(data)).to.be.equal(true);
    });

    it('should return false if phone property is not present', () => {
      const data = {
        email: keys.user_email
      };

      Expect(Valid.message(data)).to.be.equal(false);
    });

    it('should return false if email property is not present', () => {
      const data = {
        phone: `${keys.phone_region}${keys.phone_number}`,
      };

      Expect(Valid.message(data)).to.be.equal(false);
    });

    it('should return false if phone.length property is different from 12', () => {
      const data = {
        phone: `${keys.phone_region}${keys.phone_number}1`,
        email: keys.user_email
      };

      Expect(Valid.message(data)).to.be.equal(false);
    });
  });

  context('#verification', () => {
    it('should return true if the verification data is valid', () => {
      const data = {
        code: keys.verification_code,
        email: keys.user_email
      };

      Expect(
        Valid.verification(data)
      ).to.be.equal(true);
    });

    it('should return false if code property is not present', () => {
      const data = {
        email: keys.user_email
      };

      Expect(
        Valid.verification(data)
      ).to.be.equal(false);
    });

    it('should return false if code property is not present', () => {
      const data = {
        email: keys.user_email
      };

      Expect(
        Valid.verification(data)
      ).to.be.equal(false);
    });

    it('should return false if email property is not present', () => {
      const data = {
        code: keys.verification_code
      };

      Expect(
        Valid.verification(data)
      ).to.be.equal(false);
    });

    it('should return false if code.length is not 6', () => {
      const data = {
        code: '123456777',
        email: keys.user_email
      };

      Expect(
        Valid.verification(data)
      ).to.be.equal(false);
    });
  });
});
