#!/usr/bin/env node

var browserstack = require('browserstack-local');
var fs = require('fs');

var pidFile = 'browserStackLocal.pid';
var bs_local = new browserstack.Local();
var bs_local_args = {
  'key': process.env.BROWSERSTACK_ACCESS_KEY,
  'forcelocal': true,
  'v': true
};

process.on('SIGINT', function() {
  if (bs_local !== null) {
    bs_local.stop(function(error) {
      if (error) {
        console.log(error);
      } else {
        console.log('BrowserStackLocal disconnected');
        process.exit();
      }
    });
  }
});

fs.writeFile(pidFile, process.pid);

bs_local.start(bs_local_args, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Tunnel started");
  }
});
