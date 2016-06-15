'use strict';

const Request = require('supertest');
const HttpStatus = require('http-status');
const Expect = require('chai').expect;
const User = require('../databases/').models.user;

const app = require('../app');

describe('Test /api/message', () => {
  before(() => {
    User.find({}).remove().exec();
  });

  context('POST', () => {
    it.skip('should create a new email verification code', function (done) {
      this.timeout(100000);

      const data = {
        phone: {
          region: 52,
          number: process.env.TEST_PHONE_NUMBER
        },
        user: {
          email: 'starships@outlook.com'
        },
        verified: false
      };

      Request(app)
        .post('/api/messages')
        .send({ data })
        .expect('content-type', /application\/json/)
        .expect(HttpStatus.CREATED, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res).to.have.property('body')
            .and.to.be.an('object');

          Expect(res.body).to.have.property('data')
            .and.to.be.an('object');

          Expect(res.body.data).to.have.property('message')
            .and.to.be.an('object');

          Expect(res.body.data.message).to.have.property('code')
            .and.to.be.a('string');

          Expect(res.body.data.phone).to.have.property('region')
            .and.to.be.equal(data.phone.region);

          Expect(res.body.data.phone).to.have.property('number')
            .and.to.be.equal(Number(data.phone.number));

          Expect(res.body.data).to.have.property('user')
            .and.to.be.an('object');

          Expect(res.body.data.user).to.have.property('email')
            .and.to.be.equal(data.user.email);

          Expect(res.body.data).to.have.property('verified')
            .and.to.be.equal(false);

          done();
        });
    });

    it('should send the wrong Accept header', (done) => {
      const data = {
        phone: {
          region: 52,
          number: 9621087445
        },
        user: {
          email: 'starships@outlook.com'
        }
      };

      Request(app)
        .post('/api/messages')
        .set('Accept', 'text/html')
        .send({ data })
        .expect('content-type', /application\/json/)
        .expect(HttpStatus.NOT_ACCEPTABLE, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res).to.have.property('body')
            .and.to.be.an('object');

          Expect(res.body).to.have.property('error')
            .and.to.be.an('object');

          Expect(res.body.error).to.have.property('status')
            .and.to.be.equal(HttpStatus.NOT_ACCEPTABLE);

          Expect(res.body.error).to.have.property('message')
            .and.to.be.equal('Not Acceptable');

          done();
        });
    });

    it('should send incomplete data', (done) => {
      const data = {
        phone: {
          region: null,
          number: null
        },
        user: {
          email: null
        }
      };

      Request(app)
        .post('/api/messages')
        .send({ data })
        .expect('content-type', /application\/json/)
        .expect(HttpStatus.BAD_REQUEST, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res).to.have.property('body')
            .and.to.be.an('object');

          Expect(res.body).to.have.property('error')
            .and.to.be.an('object');

          Expect(res.body.error).to.have.property('status')
            .and.to.be.equal(HttpStatus.BAD_REQUEST);

          Expect(res.body.error).to.have.property('message')
            .and.to.be.equal('Bad Request');

          done();
        });
    });

    it('should fail to send the message', function (done) {
      this.timeout(100000);

      const data = {
        phone: {
          region: 111,
          number: 10000000009621087445
        },
        user: {
          email: 'starships@outlook.com'
        }
      };

      Request(app)
        .post('/api/messages')
        .set('Accept', 'application/json')
        .send({ data })
        .expect('content-type', /application\/json/)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res).to.have.property('body')
            .and.to.be.an('object');

          Expect(res.body).to.have.property('error')
            .and.to.be.an('object');

          Expect(res.body.error).to.have.property('status')
            .and.to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);

          Expect(res.body.error).to.have.property('message')
            .and.to.be.equal('Internal Server Error');

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

          Expect(res).to.have.property('body')
            .and.to.be.an('object');

          Expect(res.body).to.have.property('error')
            .and.to.be.an('object');

          Expect(res.body.error).to.have.property('status')
            .and.to.be.equal(HttpStatus.METHOD_NOT_ALLOWED);

          Expect(res.body.error).to.have.property('message')
            .and.to.be.equal('Method Not Allowed');

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

          Expect(res).to.have.property('body')
            .and.to.be.an('object');

          Expect(res.body).to.have.property('error')
            .and.to.be.an('object');

          Expect(res.body.error).to.have.property('status')
            .and.to.be.equal(HttpStatus.METHOD_NOT_ALLOWED);

          Expect(res.body.error).to.have.property('message')
            .and.to.be.equal('Method Not Allowed');

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

          Expect(res).to.have.property('body')
            .and.to.be.an('object');

          Expect(res.body).to.have.property('error')
            .and.to.be.an('object');

          Expect(res.body.error).to.have.property('status')
            .and.to.be.equal(HttpStatus.METHOD_NOT_ALLOWED);

          Expect(res.body.error).to.have.property('message')
            .and.to.be.equal('Method Not Allowed');

          done();
        });
    });
  });
});
describe.skip('Test /api/message', () => {
  context('POST', () => {
    it('should try to verify a verified account', (done) => {
      const data = {
        user: {
          email: 'starships@outlook.com'
        },
        message: {
          code: process.env.TEST_VERIFY_CODE
        }
      };

      Request(app)
        .post('/api/verify')
        .set('Accept', 'application/json')
        .send({ data })
        .expect('content-type', /application\/json/)
        .expect(HttpStatus.BAD_REQUEST, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res).to.have.property('body')
            .and.to.be.an('object');

          Expect(res.body).to.have.property('error')
            .and.to.be.an('object');

          Expect(res.body.error).to.have.property('status')
            .and.to.be.equal(HttpStatus.BAD_REQUEST);

          Expect(res.body.error).to.have.property('message')
            .and.to.be.equal('Bad Request');

          done();
        });
    });
  });
});

