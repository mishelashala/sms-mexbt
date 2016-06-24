# Email verfication - Twilio microservice

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)
![travis-ci](https://travis-ci.com/mishelashala/twilio-microservice.svg?token=WCBiHXcfLbDzxM7ZVczp&branch=master)

## Index

### Instalation

```
$ git clone git@bitbucket.org:mexbtcore/twilio-email-verification.git
$ cd twilio-email-verification
$ npm install
$ NODE_ENV=production node bin/www
```

### Seting Up Enviroment

#### Global
Save this in env var in `~/.bashrc` file (this independient of the enviroment).
**Twilio:**
```
export TWILIO_ACCOUNT_SID = ...
export TWILIO_PHONE_NUMBER = ...
export TWILIO_AUTH_TOKEN = ...
```

#### Production
Save this env vars in `~/.bashrc` file  

```
NODE_ENV=production
```


**Database:**
```
export PROD_DB_USER = ...
export PROD_DB_PASS = ...
export PROD_DB_HOST = ...
export PROD_DB_PORT = ...
export PROD_DB_NAME = ...
```

#### Staging
Save this env vars in `~/.bashrc` file  

```
NODE_ENV=staging
```

**Database:**
```
export STAG_DB_USER = ...
export STAG_DB_PASS = ...
export STAG_DB_HOST = ...
export STAG_DB_PORT = ...
export STAG_DB_NAME = ...
```

#### Development (local) and testing
Save this env vars in `~/.bashrc` file  

**Database:**
```
export DEV_DB_USER = ...
export DEV_DB_PASS = ...
export DEV_DB_HOST = ...
export DEV_DB_PORT = ...
export DEV_DB_NAME = ...

export DEV_PHONE_REGION = ...
export DEV_PHONE_NUMBER = ...

export DEV_VERIFICATION_CODE = ...

export DEV_USER_EMAIL = ...
```

## Testing the project

### Local
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

### Remote
Every time you make a push to origin travis-ci will run the tests.

## API
Read the CONTRACT.md file

## Technical Debt
Read the DEBT.md file
