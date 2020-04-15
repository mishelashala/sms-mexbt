const Statsd = require('node-dogstatsd').StatsD;
const datadog = new Statsd('localhost', 8125);

const env = process.env.NODE_ENV;

const report = (stage, status) => {
  switch (env) {
    case 'production':
      datadog.increment(`mexbt.production.verification.${stage}.${status}`);
      break;

    case 'staging':
      datadog.increment(`mexbt.staging.verification.${stage}.${status}`);
      break;
  }
};

module.exports = { report };
