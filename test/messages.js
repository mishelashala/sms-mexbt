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

  describe('POST', () => {
    it('should create a new email verification code', (done) => {
      const data = {
        phone: {
          region: 52,
          number: process.env.TEST_PHONE_NUMBER
        },
        user: {
          email: 'starships@outlook.com'
        }
      };

      Request(app)
        .post('/api/messages')
        .send({ data })
        .expect(HttpStatus.CREATED, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res).to.have.property('headers')
            .and.to.be.an('object');

          Expect(res).to.have.property('body')
            .and.to.be.an('object');

          Expect(res.headers).to.have.property('content-type')
            .and.to.be.equal('application/json; charset=utf-8');

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
        .expect(HttpStatus.NOT_ACCEPTABLE, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res).to.have.property('headers')
            .and.to.be.an('object');

          Expect(res).to.have.property('body')
            .and.to.be.an('object');

          Expect(res.headers).to.have.property('content-type')
            .and.to.be.equal('application/json; charset=utf-8');

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
        .expect(HttpStatus.BAD_REQUEST, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res).to.have.property('headers')
            .and.to.be.an('object');

          Expect(res).to.have.property('body')
            .and.to.be.an('object');

          Expect(res.headers).to.have.property('content-type')
            .and.to.be.equal('application/json; charset=utf-8');

          Expect(res.body).to.have.property('error')
            .and.to.be.an('object');

          Expect(res.body.error).to.have.property('status')
            .and.to.be.equal(HttpStatus.BAD_REQUEST);

          Expect(res.body.error).to.have.property('message')
            .and.to.be.equal('Bad Request');

          done();
        });
    });

    it('should fail to send the message', (done) => {
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
        .expect(HttpStatus.INTERNAL_SERVER_ERROR, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res).to.have.property('headers')
            .and.to.be.an('object');

          Expect(res).to.have.property('body')
            .and.to.be.an('object');

          Expect(res.headers).to.have.property('content-type')
            .and.to.be.equal('application/json; charset=utf-8');

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

  describe('GET', () => {
    it('should get a 405 Method Not Allowed', (done) => {
      Request(app)
        .get('/api/messages')
        .set('Accept', 'application/json')
        .expect(HttpStatus.METHOD_NOT_ALLOWED, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res).to.have.property('headers')
            .and.to.be.an('object');

          Expect(res).to.have.property('body')
            .and.to.be.an('object');

          Expect(res.headers).to.have.property('content-type')
            .and.to.be.equal('application/json; charset=utf-8');

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

  describe('PUT', () => {
    it('should get a 405 Method Not Allowed error code', (done) => {
      Request(app)
        .put('/api/messages')
        .set('Accept', 'application/json')
        .expect(HttpStatus.METHOD_NOT_ALLOWED, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res).to.have.property('headers')
            .and.to.be.an('object');

          Expect(res.headers).to.have.property('content-type')
            .and.to.be.equal('application/json; charset=utf-8');

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

  describe('DELETE', () => {
    it('should get a 405 Method Not Allowed error code', (done) => {
      Request(app)
        .delete('/api/messages')
        .set('Accept', 'application/json')
        .expect(HttpStatus.METHOD_NOT_ALLOWED, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res).to.have.property('headers')
            .and.to.be.an('object');

          Expect(res.headers).to.have.property('content-type')
            .and.to.be.equal('application/json; charset=utf-8');

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

  after(() => {
    describe('POST', () => {
      it('should try to send a verification msg to a verified user', () => {
        setTimeout(() => {
          const data = {
            phone: {
              region: 52,
              number: process.env.TEST_PHONE_NUMBER
            },
            user: {
              email: 'starships@outlook.com'
            }
          };

          Request(app)
            .post('/api/messages')
            .send({ data })
            .expect(HttpStatus.BAD_REQUEST, (err, res) => {
              if (err) {
                return done(err);
              }

              Expect(res).to.have.property('headers')
                .and.to.be.an('object');

              Expect(res).to.have.property('body')
                .and.to.be.an('object');

              Expect(res.headers).to.have.property('content-type')
                .and.to.be.equal('application/json; charset=utf-8');

              Expect(res.body).to.have.property('data')
                .and.to.be.an('object');

              Expect(res.body).to.have.property('error')
                .and.to.be.an('object');

              Expect(res.body.error).to.have.property('status')
                .and.to.be.equal(HttpStatus.BAD_REQUEST);

              Expect(res.body.error).to.have.propert('message')
                .and.to.be.equal('Bad Request');

              done();
            });
        }, 5000);
      });
    });
  });
});
