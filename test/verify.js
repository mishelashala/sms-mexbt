'use strict';

const Request = require('supertest');
const HttpStatus = require('http-status');
const Expect = require('chai').expect;

const app = require('../app');

describe('Test /api/verify', () => {
  describe('POST', () => {
    it('should verify an email account', (done) => {
      const data = {
        user: {
    			email: "starships@outlook.com"
    		},
        message: {
          code: 'ciokl2a0'
        }
      };

      Request(app)
        .post('/api/verify')
        .send({ data })
        .expect(HttpStatus.ACCEPTED, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res).to.have.property('headers')
            .and.to.be.an('object');

          Expect(res).to.have.property('body')
            .and.to.be.an('object');

          Expect(res.headers).to.have.property('content-type')
            .and.to.be.equal('application/json; charset=utf-8');

          done();
        });
    });

    it('should send wrong Accept Header', (done) => {
      Request(app)
        .post('/api/verify')
        .set('Accept', 'text/html')
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
  });

  describe('GET', () => {
    it('should return 405 Method Not Allowed', (done) => {
      Request(app)
        .get('/api/verify')
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
    it('should return 405 Method Not Allowed', (done) => {
      Request(app)
        .put('/api/verify')
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

  describe('DELETE', () => {
    it('should return 405 Method Not Allowed', (done) => {
      Request(app)
        .delete('/api/verify')
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
});
