'use strict';

const Expect = require('chai').expect;
const ClientResponse = require('../../utils/client-response');
const ClientStatus = require('../../utils/client-status');

describe('Response', () => {
  context('Successful Responses', () => {
    it('should return an object response when a message is sent', () => {
      const clientResponse = ClientResponse.create(ClientStatus.MESSAGE_SENT);

      Expect(clientResponse.status)
        .to.be.equal(ClientStatus.MESSAGE_SENT);

      Expect(clientResponse.message)
        .to.be.equal('Message Sent');
    });

    it('should return an object response when a user is verified', () => {
      const clientResponse = ClientResponse.create(ClientStatus.USER_VERIFIED);

      Expect(clientResponse.status)
        .to.be.equal(ClientStatus.USER_VERIFIED);

      Expect(clientResponse.message)
        .to.be.equal('User Verified');
    });
  });

  context('User Error Responses', () => {
    it('should return an object response when a user submit invalid data', () => {
      const clientResponse = ClientResponse.create(ClientStatus.INVALID_USER_INPUT);

      Expect(clientResponse.status)
        .to.be.equal(ClientStatus.INVALID_USER_INPUT);

      Expect(clientResponse.message)
        .to.be.equal('Invalid User Input');
    });

    it('should return an object response when a user try to verify an invalid email', () => {
      const clientResponse = ClientResponse.create(ClientStatus.USER_NOT_FOUND);

      Expect(clientResponse.status)
        .to.be.equal(ClientStatus.USER_NOT_FOUND);

      Expect(clientResponse.message)
        .to.be.equal('User Not Found');
    });

    it('should return an object response when the user submit an invalid code', () => {
      const clientResponse = ClientResponse.create(ClientStatus.INVALID_VERIFICATION_CODE);

      Expect(clientResponse.status)
        .to.be.equal(ClientStatus.INVALID_VERIFICATION_CODE);

      Expect(clientResponse.message)
        .to.be.equal('Invalid Verification Code');
    });

    it('should return an object response when the user is already verified', () => {
      const objectResponse = ClientResponse.create(ClientStatus.USER_ALREADY_VERIFIED);

      Expect(objectResponse.status)
        .to.be.equal(ClientStatus.USER_ALREADY_VERIFIED);

      Expect(objectResponse.message)
        .to.be.equal('User Already Verified');
    });
  });

  context('Application Error Responses', () => {
    it('should return an object response when a message is not sent', () => {
      const clientResponse = ClientResponse.create(ClientStatus.MESSAGE_NOT_SENT);

      Expect(clientResponse.status)
        .to.be.equal(ClientStatus.MESSAGE_NOT_SENT);

      Expect(clientResponse.message)
        .to.be.equal('Message Not Sent');
    });

    it('should return an object response when the database connection failed', () => {
      const clientResponse = ClientResponse.create(ClientStatus.DATABASE_CONNECTION_FAILED);

      Expect(clientResponse.status)
        .to.be.equal(ClientStatus.DATABASE_CONNECTION_FAILED);

      Expect(clientResponse.message)
        .to.be.equal('Database Connection Failed');
    });
  });

  context('Alphapoint Error Responses', () => {
    it('should return an object response when cant auth with alphapoint', () => {
      const clientResponse = ClientResponse.create(ClientStatus.CANNOT_AUTH_TO_ALPHAPOINT);

      Expect(clientResponse.status)
        .to.be.equal(ClientStatus.CANNOT_AUTH_TO_ALPHAPOINT);

      Expect(clientResponse.message)
        .to.be.equal('Cannot Auth To Alphapoint');
    });

    it('should return an object response when the database connection failed', () => {
      const clientResponse = ClientResponse.create(ClientStatus.CANNOT_CHANGE_VERIFICATION_LEVEL);

      Expect(clientResponse.status)
        .to.be.equal(ClientStatus.CANNOT_CHANGE_VERIFICATION_LEVEL);

      Expect(clientResponse.message)
        .to.be.equal('Cannot Change Verification Level');
    });
  });
});
