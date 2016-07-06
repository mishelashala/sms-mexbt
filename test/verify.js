'use strict';

const Request = require('supertest');
const HttpStatus = require('http-status');
const Expect = require('chai').expect;

const keys = require('../keys');
const app = require('../app');

describe('Test /api/verify', () => {
  context('POST', () => {
    it('should verify an email account', (done) => {
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
        .send({ data })
        .expect('content-type', /application\/json/)
        .expect(HttpStatus.ACCEPTED, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res).to.have.property('body')
            .and.to.be.an('object');

          Expect(res.body).to.have.property('status')
            .and.to.be.an('object');

          Expect(res.body.status).to.have.property('code')
            .and.to.be.equal(HttpStatus.ACCEPTED);

          Expect(res.body.status).to.have.property('message')
            .and.to.be.equal('Accepted');

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
        user: {
          email: keys.user_email
        },
        message: {
          code: ''
        }
      };

      Request(app)
        .post('/api/verify')
        .set('Accept', 'application/json')
        .send(({ data }))
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

    it('should send an invalid verification code', (done) => {
      const data = {
        user: {
          email: keys.user_email
        },
        message: {
          code: String(231456677777)
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

  context('GET', () => {
    it('should return 405 Method Not Allowed', (done) => {
      Request(app)
        .get('/api/verify')
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
    it('should return 405 Method Not Allowed', (done) => {
      Request(app)
        .put('/api/verify')
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
    it('should return 405 Method Not Allowed', (done) => {
      Request(app)
        .delete('/api/verify')
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

describe('Test /api/message', () => {
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
