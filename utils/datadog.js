'use strict';

const Statsd = require('node-dogstatsd').StatsD;
const datadog = new Statsd('localhost', 8125);

const report = (stage, status) => {
  if (process.env.NODE_ENV === 'production') {
    datadog.increment(`mexbt.production.verification.${stage}.${status}`);
  } else if (process.env.NODE_ENV === 'staging') {
    datadog.increment(`mexbt.staging.verification.${stage}.${status}`);
  }
};

module.exports = report;
