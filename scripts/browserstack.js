#!/usr/bin/env node

var WORKER_ID = 0;
var BrowserStack = require('browserstack');
var name = null

var client = BrowserStack.createClient({
  username: process.env.BROWSERSTACK_USERNAME,
  password: process.env.BROWSERSTACK_ACCESS_KEY
});

'SIGINT SIGTERM SIGHUP'.split(' ').forEach(function(evt) {
  process.on(evt, function() {
    console.log("Closed BrowserStack Worker process "+evt);
    if (client !== null) {
      client.terminateWorker(WORKER_ID, function() {
        process.exit();
      });
    }
  });
});

if (process.env.TRAVIS_JOB_NUMBER) {
  name = process.env.TRAVIS_JOB_NUMBER;
} else if (process.env.CIRCLE_BUILD_NUM) {
  name = process.env.CIRCLE_BUILD_NUM;
}

var settings = {
  os: process.argv[2],
  os_version: process.argv[3],
  browser: process.argv[4],
  browser_version: process.argv[5],
  device: process.argv[6],
  url: process.argv[7],
  'browserstack.local': true,
  name: name,
  build: process.env.BUILD_NAME || 'testem-browserstack'
};

if (process.env.CIRCLE_PROJECT_REPONAME) {
  settings.project = process.env.CIRCLE_PROJECT_REPONAME;
} else if (process.env.PROJECT_NAME) {
  settings.project = process.env.PROJECT_NAME;
}

if (process.env.BROWSERSTACK_IDLE_TIMEOUT) {
  settings.timeout = process.env.BROWSERSTACK_IDLE_TIMEOUT;
}

for (var i in settings) {
  if (settings[i] === null || settings[i] === '' || settings[i] === 'nil') {
    delete settings[i];
  }
}

client.createWorker(settings, function(error, worker) {
  if (error) console.log(error);
  WORKER_ID = worker.id
});

setTimeout(function() {
  client.terminateWorker(WORKER_ID);
}, 600000);
