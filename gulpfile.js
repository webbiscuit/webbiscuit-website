
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
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const semanticBuild = require('./semantic/tasks/build');

// Handlebars
var Handlebars = require('handlebars');
var HandlebarsLib = require('./lib/handlebars-config')(Handlebars);

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

    // Hashes


    const PATHS = {
        bodyVendor: path.join(__dirname, siteconfig.metalsmith.config["scripts-dir"], 'bodyvendor.js'),
        headVendor: path.join(__dirname, siteconfig.metalsmith.config["scripts-dir"], 'headvendor.js'),
        buildDir: path.join(__dirname, siteconfig.metalsmith.config["dest-dir"], 'assets'),
    };

    const commonPlugins = [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['bodyvendor', 'headvendor']
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(args.production ? 'production' : 'development'),
            },
        })
    ];

    const prodPlugins = [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ];

    var plugins = commonPlugins;
    if (args.production) {
        console.log("Adding prod settings");
        plugins = plugins.concat(prodPlugins);
    }

    var webpackConfig = {
        entry: 
        {
            bodyvendor : PATHS.bodyVendor,
            headvendor: PATHS.headVendor
        },
        output: {
            path: PATHS.buildDir,
            filename: '[name].js'
        },
        module: {
            rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            { test: /\.(png)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }],
        },
        plugins: plugins
    };

    gulp.src([PATHS.headVendor, PATHS.bodyVendor])
        .pipe(named())
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest(PATHS.buildDir));

    callback();
});


gulp.task('validate', ['metalsmith'], function (callback) {   
    var dest = path.join(__dirname, siteconfig.metalsmith.config["dest-dir"]);

    gulp.src(dest + '/**/*.html')
        .pipe(w3cjs())
        .pipe(w3cjs.reporter());

    callback();
});

gulp.task('semantic', semanticBuild);
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

gulp.task('build-cv', function (callback) {   
    var dest = path.join(__dirname, "cv-build");
    var src = path.join(__dirname, siteconfig.metalsmith.config["source-dir"], "resume.md");

    const pandoc = require('gulp-pandoc');

    del(dest);

    gulp.src(src)
        .pipe(pandoc({
            from: 'markdown',
            to: 'html5',
            ext: '.html',
            args: ['--smart']
        }))
        .pipe(gulp.dest(dest));

    var pdfFileName = 'resume.pdf';
    gulp.src(src)
        .pipe(pandoc({
            from: 'markdown',
            to: 'latex',
            ext: '.pdf',
            args: ['--smart', '-o', dest + "/" + pdfFileName]
        }));

    gulp.src(src)
        .pipe(pandoc({
            from: 'markdown',
            to: 'docx',
            ext: '.docx',
            args: ['--smart', '-o', dest + '/resume.docx']
        }));

    // Copy pdf to web dir as well
    var webDest = path.join(__dirname, siteconfig.metalsmith.config["source-dir"], "files");
    del(webDest + "/" + pdfFileName)
    gulp.src(dest + "/" + pdfFileName)
        .pipe(gulp.dest(webDest));    

    callback();
});