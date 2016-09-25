
const gulp = require('gulp');
const Metalsmith = require('metalsmith');
const siteconfig = require('./site-config');
const del = require('del');

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

    // callback();
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

gulp.task('default', ['metalsmith']);
