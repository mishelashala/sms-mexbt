const Request = require('supertest');
const HttpStatus = require('http-status');
const Expect = require('chai').expect;

const app = require('../app');

describe('Routing', () => {
  context('GET /asdf', () => {
    it('should return 404 Not Found', (done) => {
      Request(app)
        .get('/asdf')
        .set('Accept', 'application/json')
        .expect('content-type', /application\/json/)
        .expect(HttpStatus.NOT_FOUND, (err, res) => {
          if (err) {
            return done(err);
          }

          Expect(res.body.server.status)
            .to.be.equal(HttpStatus.NOT_FOUND);

          Expect(res.body.server.message)
            .to.be.equal('Not Found');

          done();
        });
    });
  });
});
