
const gulp = require('gulp');
const argv = require('minimist')(process.argv.slice(2));
const Metalsmith = require('metalsmith');
const siteconfig = require('./site-config');
const del = require('del');
const express = require('express');
const browserSync = require('browser-sync');
const gutil = require('gulp-util');

var server = null;

// Configuration
const args = {
    production: !!argv.prod
};

// Metalsmith
function setupMetalsmith(callback) {
    var ms = new Metalsmith(process.cwd());
    var msconfig = siteconfig.metalsmith || {};
    var msplugins = msconfig.plugins || {};

    ms.source(msconfig.config["source-dir"]);
    ms.destination(msconfig.config["dest-dir"]);
    ms.metadata(msconfig.metadata);

    Object.keys(msplugins).forEach(function (key) {
        var plugin = require(key);
        var options = msplugins[key];

        ms.use(plugin(options));
    });

    ms.build(function (err) {
        if (err) {
            console.log(err);
            throw err;
        }

        callback();
    });
}

//Gulp tasks
gulp.task('metalsmith', function (callback) {
    setupMetalsmith(callback);
    reload();
});

gulp.task('clean', function (callback) {
    var msconfig = siteconfig.metalsmith || {};
    del(msconfig.config["dest-dir"]);
});

gulp.task('serve', ['metalsmith', 'watch'], function (callback) {
    server = express();
    server.use(express.static(siteconfig.metalsmith.config["dest-dir"]));

    var serverPort = 8000; // Math.floor((Math.random() * 1000) + 3000);
    if (argv.port) {
        serverPort = parseInt(argv.port);
    }

    server.listen(serverPort, function () {
        var server = "localhost:" + serverPort;
        console.log("Server: %s", server);
        browserSync({ proxy: server });
        callback();
    });
});

gulp.task('watch', ['default'], function () {
    gulp.watch(['gulpfile.js', 'site-config.js'], ['default']);
    //   gulp.watch([site.metalsmith.config.styleRoot+'/**/*'], ['styles']);
    //   gulp.watch([site.metalsmith.config.scriptRoot+'/**/*'], ['scripts']);
    gulp.watch([
        siteconfig.metalsmith.config["source-dir"] + '/**/*',
        siteconfig.metalsmith.config["layout-dir"] + '/**/*'
    ], ['metalsmith']);
});

gulp.task('build', ['metalsmith']);
gulp.task('default', ['metalsmith']);

// Utils
function reload() {
    if (server) {
        return browserSync.reload();
    }

    return gutil.noop();
}
