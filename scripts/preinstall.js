#!/usr/bin/env node

var spawn = require('child_process').spawn;

function run(cmd, options) {
  var child = spawn(cmd, options);
  child.on('data', function(data) {
    process.stdout.write(data);
  });
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
}

function npmInstallGlobally(module) {
  run('npm', ['install', '-g', module]);
}

['grunt-cli', 'bower', 'coffee-script'].forEach(npmInstallGlobally);
