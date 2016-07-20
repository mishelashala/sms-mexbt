'use strict';

const Request = require('supertest');
const HttpStatus = require('http-status');
const Expect = require('chai').expect;

const ClientStatus = require('../utils/client/status');
const keys = require('../keys');
const app = require('../app');

describe('Test /api/verify', () => {
  context('POST', () => {
    it('should verify an email account', function (done) {
      this.timeout(100000000);

      const data = {
        user: {
          email: keys.user_email
        },
        message: {
          code: keys.verification_code
        }
      };

      Request(app)
        .post('/api/verify')
        .send(data)
        .expect('content-type', /application\/json/)
        .expect(HttpStatus.ACCEPTED, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res.body.server.status)
            .to.be.equal(HttpStatus.ACCEPTED);

          Expect(res.body.server.message)
            .to.be.equal('Accepted');

          Expect(res.body.client.status)
            .to.be.equal(ClientStatus.USER_VERIFIED);

          Expect(res.body.client.message)
            .to.be.equal('User Verified');

          Expect(res.body.data.user.email)
            .to.be.equal(keys.user_email);

          Expect(res.body.data.message.code)
            .to.be.equal(keys.verification_code);

          Expect(res.body.data.verified)
            .to.be.equal(true);

          Expect(res.body.data.phone.number)
            .to.be.equal(keys.phone_number);

          Expect(res.body.data.phone.region)
            .to.be.equal(keys.phone_region);

          done();
        });
    });

    it('should send wrong Accept Header', (done) => {
      Request(app)
        .post('/api/verify')
        .set('Accept', 'text/html')
        .expect('content-type', /application\/json/)
        .expect(HttpStatus.NOT_ACCEPTABLE, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res.body.server.status)
            .to.be.equal(HttpStatus.NOT_ACCEPTABLE);

          Expect(res.body.server.message)
            .to.be.equal('Not Acceptable');

          done();
        });
    });

    it('should send incomplete data', (done) => {
      const data = {
      };

      Request(app)
        .post('/api/verify')
        .set('Accept', 'application/json')
        .send(data)
        .expect('content-type', /application\/json/)
        .expect(HttpStatus.BAD_REQUEST, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res.body.server.status)
            .to.be.equal(HttpStatus.BAD_REQUEST);

          Expect(res.body.server.message)
            .to.be.equal('Bad Request');

          Expect(res.body.client.status)
            .to.be.equal(ClientStatus.INVALID_USER_INPUT);

          Expect(res.body.client.message)
            .to.be.equal('Invalid User Input');

          done();
        });
    });

    it('should send an invalid email account', function (done) {
      this.timeout(100000000);

      const data = {
        user: {
          email: 'example@outlook.com'
        },
        message: {
          code: keys.verification_code
        }
      };

      Request(app)
        .post('/api/verify')
        .set('Accept', 'application/json')
        .send(data)
        .expect('content-type', /application\/json/)
        .expect(HttpStatus.BAD_REQUEST, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res.body.server.status)
            .to.be.equal(HttpStatus.BAD_REQUEST);

          Expect(res.body.server.message)
            .to.be.equal('Bad Request');

          Expect(res.body.client.status)
            .to.be.equal(ClientStatus.USER_NOT_FOUND);

          Expect(res.body.client.message)
            .to.be.equal('User Not Found');

          done();
        });
    });

    it('should send an invalid verification code', (done) => {
      const data = {
        user: {
          email: keys.user_email
        },
        message: {
          code: '123457'
        }
      };

      Request(app)
        .post('/api/verify')
        .set('Accept', 'application/json')
        .send(data)
        .expect('content-type', /application\/json/)
        .expect(HttpStatus.BAD_REQUEST, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res.body.server.status)
            .to.be.equal(HttpStatus.BAD_REQUEST);

          Expect(res.body.server.message)
            .to.be.equal('Bad Request');

          Expect(res.body.client.status)
            .to.be.equal(ClientStatus.INVALID_VERIFICATION_CODE);

          Expect(res.body.client.message)
            .to.be.equal('Invalid Verification Code');

          done();
        });
    });
  });

  context('GET', () => {
    it('should return 405 Method Not Allowed', (done) => {
      Request(app)
        .get('/api/verify')
        .expect('content-type', /application\/json/)
        .expect(HttpStatus.METHOD_NOT_ALLOWED, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res.body.server.status)
            .to.be.equal(HttpStatus.METHOD_NOT_ALLOWED);

          Expect(res.body.server.message)
            .to.be.equal('Method Not Allowed');

          done();
        });
    });
  });

  context('PUT', () => {
    it('should return 405 Method Not Allowed', (done) => {
      Request(app)
        .put('/api/verify')
        .expect('content-type', /application\/json/)
        .expect(HttpStatus.METHOD_NOT_ALLOWED, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res.body.server.status)
            .to.be.equal(HttpStatus.METHOD_NOT_ALLOWED);

          Expect(res.body.server.message)
            .to.be.equal('Method Not Allowed');

          done();
        });
    });
  });

  context('DELETE', () => {
    it('should return 405 Method Not Allowed', (done) => {
      Request(app)
        .delete('/api/verify')
        .expect('content-type', /application\/json/)
        .expect(HttpStatus.METHOD_NOT_ALLOWED, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res.body.server.status)
            .to.be.equal(HttpStatus.METHOD_NOT_ALLOWED);

          Expect(res.body.server.message)
            .to.be.equal('Method Not Allowed');

          done();
        });
    });
  });
});

describe('Test /api/message', () => {
  context('POST', () => {
    it('should try to verify a verified account', (done) => {
      const data = {
        user: {
          email: keys.user_email
        },
        message: {
          code: keys.verification_code
        }
      };

      Request(app)
        .post('/api/verify')
        .set('Accept', 'application/json')
        .send(data)
        .expect('content-type', /application\/json/)
        .expect(HttpStatus.BAD_REQUEST, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res.body.server.status)
            .to.be.equal(HttpStatus.BAD_REQUEST);

          Expect(res.body.server.message)
            .to.be.equal('Bad Request');

          Expect(res.body.client.status)
            .to.be.equal(ClientStatus.USER_ALREADY_VERIFIED);

          Expect(res.body.client.message)
            .to.be.equal('User Already Verified');

          done();
        });
    });
  });
});
