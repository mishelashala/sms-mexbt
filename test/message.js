'use strict';

const Request = require('supertest');
const HttpStatus = require('http-status');
const Expect = require('chai').expect;

const ClientStatus = require('../utils/client/status');
const keys = require('../keys');
const User = require('../databases/').models.user;
const app = require('../app');

describe('Test /api/messages', () => {
  before(() => {
    User.find({}).remove().exec();

    const user = new User({
      phone: {
        region: keys.phone_region,
        number: keys.phone_number
      },
      user: {
        email: keys.user_email
      },
      message: {
        code: keys.verification_code
      },
      verified: false
    });

    user.save();
  });

  context('POST', () => {
    it.skip('should create a new email verification code', function (done) {
      this.timeout(100000);

      const data = {
        phone: {
          region: keys.phone_region,
          number: keys.phone_number
        },
        user: {
          email: keys.user_email
        },
        verified: false
      };

      Request(app)
        .post('/api/messages')
        .send(data)
        .expect('content-type', /application\/json/)
        .expect(HttpStatus.CREATED, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res.body.server.status)
            .to.be.equal(HttpStatus.CREATED);

          Expect(res.body.server.message)
            .to.be.equal('Created');

          Expect(res.body.client.status)
            .to.be.equal(ClientStatus.MESSAGE_SENT);

          Expect(res.body.client.message)
            .to.be.equal('Message Sent');

          Expect(res.body.data.user.email)
            .to.be.equal(data.user.email);

          Expect(res.body.data.verified)
            .to.be.equal(false);

          Expect(res.body.data.phone.region)
            .to.be.equal(data.phone.region);

          Expect(res.body.data.phone.number)
            .to.be.equal(data.phone.number);

          Expect(res.body.data.message.code)
            .to.be.equal(keys.verification_code);

          done();
        });
    });

    it('should send the wrong Accept header', (done) => {
      const data = {
        phone: {
          region: keys.phone_number,
          number: keys.phone_region
        },
        user: {
          email: keys.user_email
        }
      };

      Request(app)
        .post('/api/messages')
        .set('Accept', 'text/html')
        .send(data)
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
        phone: {
          region: '',
          number: ''
        },
        user: {
          email: ''
        }
      };

      Request(app)
        .post('/api/messages')
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
  });

  context('GET', () => {
    it('should get a 405 Method Not Allowed error code', (done) => {
      Request(app)
        .get('/api/messages')
        .set('Accept', 'application/json')
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
    it('should get a 405 Method Not Allowed error code', (done) => {
      Request(app)
        .put('/api/messages')
        .set('Accept', 'application/json')
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
    it('should get a 405 Method Not Allowed error code', (done) => {
      Request(app)
        .delete('/api/messages')
        .set('Accept', 'application/json')
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
