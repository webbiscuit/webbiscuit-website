
const gulp = require('gulp');
const argv = require('minimist')(process.argv.slice(2));
const Metalsmith = require('metalsmith');
const siteconfig = require('./site-config');
const del = require('del');
const express = require('express');
const browserSync = require('browser-sync');
const gutil = require('gulp-util');
const path = require('path');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');

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

gulp.task('watch', ['build'], function () {
    gulp.watch(['gulpfile.js', 'site-config.js'], ['webpack']);
    //   gulp.watch([site.metalsmith.config.styleRoot+'/**/*'], ['styles']);
    gulp.watch([siteconfig.metalsmith.config["scripts-dir"] + '/**/*'], ['scripts']);
    gulp.watch([
        siteconfig.metalsmith.config["source-dir"] + '/**/*',
        siteconfig.metalsmith.config["layout-dir"] + '/**/*'
    ], ['metalsmith']);
});

gulp.task('webpack', function (callback) {    
    var webpackPlugins = [
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery"
        // }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(args.production ? 'production' : 'development'),
            },
        })
    ];

    if (args.production) {
        console.log("Uglifying");
        webpackPlugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
    }

    var webpackConfig = {
        context: path.join(__dirname, siteconfig.metalsmith.config["scripts-dir"]),
       // entry: ["vendor.js"],
        output: {
            //path: path.join(__dirname, siteconfig.metalsmith.config["dest-dir"], 'assets'),
            filename: '[name].js'
        },
        // // resolveLoader: {
        // //     root: path.join(__dirname, 'node_modules')
        // // },
        // resolve: { modulesDirectories: [siteconfig.metalsmith.config["scripts-dir"]], extension: ['', '.js', '.scss'] },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015']
                    }
                },
                { 
                    test: /\.css$/, 
                    loader: "style-loader!css-loader" 
                }
            ]
        },
        plugins: webpackPlugins
    };

    var source = path.join(__dirname, siteconfig.metalsmith.config["scripts-dir"], "vendor.js");
    var dest = path.join(__dirname, siteconfig.metalsmith.config["dest-dir"], 'assets');

    gulp.src(source)
            .pipe(named())
            .pipe(webpackStream(webpackConfig))
            .pipe(gulp.dest(dest));

    callback();

    // webpack(webpackConfig, function (err, stats) {
    //     if (err) {
    //         return callback(err);
    //     }

    //     console.log(stats.toString({}));
    //     callback();
    // });
});

gulp.task('scripts', ['webpack']);
gulp.task('build', ['scripts', 'metalsmith']);
gulp.task('default', ['build']);

// Utils
function reload() {
    if (server) {
        return browserSync.reload();
    }

    return gutil.noop();
}
