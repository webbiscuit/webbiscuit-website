
const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
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
const w3cjs = require('gulp-w3cjs');
const ExtractTextPlugin = require('extract-text-webpack-plugin')


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
    ms.clean(false);
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

    callback();
});

gulp.task('serve', ['build', 'watch'], function (callback) {
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
        siteconfig.metalsmith.config["layouts-dir"] + '/**/*'
    ], ['metalsmith']);
});

gulp.task('webpack', function (callback) {    
    var webpackPlugins = [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(args.production ? 'production' : 'development'),
            },
        }),
        new ExtractTextPlugin('[name].css')
    ];

    if (args.production) {
        console.log("Uglifying");
        webpackPlugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
    }

    const PATHS = {
        vendor: path.join(__dirname, siteconfig.metalsmith.config["scripts-dir"], 'vendor'),
        buildDir: path.join(__dirname, siteconfig.metalsmith.config["dest-dir"], 'assets'),
    };

    var webpackConfig = {
        // context: path.join(__dirname, siteconfig.metalsmith.config["scripts-dir"]),
        entry: 
        {
            vendor : PATHS.vendor
        },
        output: {
            path: PATHS.buildDir,
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
                        compact: false,
                        presets: ['es2015']
                    }
                },
                { 
                    test: /\.css$/, 
                    // loader: "style-loader!css-loader" ,
                    exclude: /(node_modules|bower_components)/,
                    loader: ExtractTextPlugin.extract('style', 'css'),
                },
                { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
                { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
                { test: /\.(png)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
                
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


gulp.task('validate', ['metalsmith'], function (callback) {   
    var dest = path.join(__dirname, siteconfig.metalsmith.config["dest-dir"]);

    gulp.src(dest + '/**/*.html')
        .pipe(w3cjs())
        .pipe(w3cjs.reporter());

    callback();
});

gulp.task('scripts', ['webpack']);
gulp.task('build', gulpSequence(['clean'], ['scripts', 'metalsmith', 'validate']));
gulp.task('default', ['build']);

// Utils
function reload() {
    if (server) {
        return browserSync.reload();
    }

    return gutil.noop();
}
