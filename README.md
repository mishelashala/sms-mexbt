# Email verfication - Twilio microservice

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)
![travis-ci](https://travis-ci.com/mishelashala/twilio-microservice.svg?token=WCBiHXcfLbDzxM7ZVczp&branch=master)
## Instalation
```
$ git clone git@bitbucket.org:mexbtcore/twilio-email-verification.git
$ cd twilio-email-verification
$ npm install
$ NODE_ENV=production node bin/www
```

### Seting Up Enviroment
This project needs the next env vars:
```
Database:
DB_USER = ...
DB_PASS = ...
DB_HOST = ...
DB_PORT = ...
DB_NAME = ...

Twilio:
TWILIO_ACCOUNT_SID = ...
TWILIO_PHONE_NUMBER = ...
TWILIO_AUTH_TOKEN = ...
```

If you are testing the project this should be set to.
Only in case of testing, not for production.
```
TEST_VERIFY_CODE = 123456
TEST_PHONE_NUMBER = ...
```

This env vars should be set in the `~/.bashrc` file:
```
export DB_USER = ...
export DB_PASS = ...
export DB_HOST = ...
...
```

## Testing
```
$ npm test
```
This command will run two different tasks.  
The first one is `lint`, which will review the coding style
([semistandard](https://www.npmjs.com/package/semistandard)).
The second one is `cover`, which will make a code coverage analysis
([istanbul](https://www.npmjs.com/package/istanbul)) and will run all the
tests ([mocha](https://www.npmjs.com/package/mocha)) at the same time.

`cover` creates a directory called `coverage` in which you can see all the
analysis.

## API
Read the CONTRACT.md file

## Technical Debt
Read the DEBT.md file
