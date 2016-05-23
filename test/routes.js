'use strict';

const Request = require('supertest');
const HttpStatus = require('http-status');
const Expect = require('chai').expect;

const app = require('../app');

describe('Routing', () => {
  describe('GET /asdf', () => {
    it('should return 404 Not Found', (done) => {
      Request(app)
        .get('/asdf')
        .set('Accept', 'application/json')
        .expect(HttpStatus.NOT_FOUND, (err, res) => {
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
            .and.to.be.equal(HttpStatus.NOT_FOUND);

          Expect(res.body.error).to.have.property('message')
            .and.to.be.equal('Not Found');

          done();
        });
    });
  });
});
