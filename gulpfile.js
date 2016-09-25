
const gulp = require('gulp');
const argv = require('minimist')(process.argv.slice(2));
const Metalsmith = require('metalsmith');
const siteconfig = require('./site-config');
const del = require('del');

// Configuration
const args = {
  dev: !!argv.dev,
  prod: !!argv.prod
};

// Metalsmith
function setupMetalsmith(callback) {
  var ms = new Metalsmith(process.cwd());
  var msconfig = siteconfig.metalsmith || {};
  var msplugins = msconfig.plugins || {};

  ms.source(msconfig.config["source-dir"]);
  ms.destination(msconfig.config["dest-dir"]);
  ms.metadata(msconfig.metadata);

  Object.keys(msplugins).forEach(function(key) {
    var plugin = require(key);
    var options = msplugins[key];

    ms.use(plugin(options));
  });

  ms.build(function(err) {
    if (err) {
      console.log(err);
      throw err;
    }

    callback();
  });
}

//Gulp tasks
gulp.task('metalsmith', function(callback) {
  setupMetalsmith(callback);
});

gulp.task('clean', function(callback) {
  var msconfig = siteconfig.metalsmith || {};
  del(msconfig.config["dest-dir"]);
});

gulp.task('serve', ['metalsmith'], function(callback) {
  var http = require('http');
  var serveStatic = require('serve-static');
  var finalhandler = require('finalhandler');

  var serve = serveStatic(siteconfig.metalsmith.config["dest-dir"], {
    "index": ['index.html', 'index.htm']
  });

  var server = http.createServer(function(req, res){
    var done = finalhandler(req, res);
    serve(req, res, done);
  })

  var serverPort = 8090 // Math.floor((Math.random() * 1000) + 3000);
  if (argv.port) {
    serverPort = parseInt(argv.port);
  }

  server.listen(serverPort, function() {
    console.log("Server: http://localhost:%s", serverPort);
    callback();
  });
});

gulp.task('build', ['metalsmith']);
gulp.task('default', ['metalsmith']);
