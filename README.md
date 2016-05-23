# Email verfication - Twilio microservice

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

## Instalation
```
$ git clone git@bitbucket.org:mishelashala/twilio-email-verification.git
$ cd twilio-email-verification
$ npm install
$ NODE_ENV=production node bin/www
```

## Testing
```
$ npm test
```
This command will run two different tasks.  
The first one is `lint`, which will review the coding style
([semistandard](https://www.npmjs.com/package/semistandard)).
The second one is `cover`, which will make a code coverage analysis
([istanbul](https://www.npmjs.com/package/semistandard)) and will run all the
tests ([mocha](https://www.npmjs.com/package/mocha)) at the same time.

`cover` creates a directory called `coverage` in which you can see all the
analysis.

## API
Read the CONTRACT.md file
