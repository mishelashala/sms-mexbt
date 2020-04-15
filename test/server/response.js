const Expect = require('chai').expect;
const HttpStatus = require('http-status');
const ServerResponse = require('../../utils/server/response');

describe('Server Response', () => {
  context('Successful Responses', () => {
    it('should return a 201 Created Response', () => {
      const response = ServerResponse.create(HttpStatus.CREATED);

      Expect(response.status)
        .to.be.equal(HttpStatus.CREATED);

      Expect(response.message)
        .to.be.equal('Created');
    });

    it('should return a 202 Accepted Response', () => {
      const response = ServerResponse.create(HttpStatus.ACCEPTED);

      Expect(response.status)
        .to.be.equal(HttpStatus.ACCEPTED);

      Expect(response.message)
        .to.be.equal('Accepted');
    });
  });

  context('User Error Responses', () => {
    it('should return 400 Bad Request response', () => {
      const response = ServerResponse.create(HttpStatus.BAD_REQUEST);

      Expect(response.status)
        .to.be.equal(HttpStatus.BAD_REQUEST);

      Expect(response.message)
        .to.be.equal('Bad Request');
    });

    it('should return 405 Not Acceptable', () => {
      const response = ServerResponse.create(HttpStatus.NOT_ACCEPTABLE);

      Expect(response.status)
        .to.be.equal(HttpStatus.NOT_ACCEPTABLE);

      Expect(response.message)
        .to.be.equal('Not Acceptable');
    });

    it('should return 406 Method Not Allowed', () => {
      const response = ServerResponse.create(HttpStatus.METHOD_NOT_ALLOWED);

      Expect(response.status)
        .to.be.equal(HttpStatus.METHOD_NOT_ALLOWED);

      Expect(response.message)
        .to.be.equal('Method Not Allowed');
    });

    it('should return 404 Not Found', () => {
      const response = ServerResponse.create(HttpStatus.NOT_FOUND);

      Expect(response.status)
        .to.be.equal(HttpStatus.NOT_FOUND);

      Expect(response.message)
        .to.be.equal('Not Found');
    });
  });

  context('Server Error Responses', () => {
    it('should return 500 Internal Server Error', () => {
      const response = ServerResponse.create(HttpStatus.INTERNAL_SERVER_ERROR);

      Expect(response.status)
        .to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);

      Expect(response.message)
        .to.be.equal('Internal Server Error');
    });
  });
});
