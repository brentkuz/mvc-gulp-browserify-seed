'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var log = require('gulplog');
var gutil = require("gulp-util");
var del = require("del");

var env = gutil.env.env || 'dev';

var entries = [
    'Scripts/src/index/index.js',
    "Scripts/src/about/about.js"
];
var distDir = "Scripts/dist/";

gulp.task("default", ["javascript"], function () { });

gulp.task("clean", function () {
    return del(distDir + "**");
});
gulp.task('javascript', ["clean"], function () {
    var tasks = [];
    for (var i = 0; i < entries.length; i++) {
        var src = entries[i];
        // set up the browserify instance on a task basis
        var b = browserify({
            entries: src,
            debug: env != "prod"
        });

        var file = src.substr(src.indexOf('Scripts/src') + 'Scripts/src'.length + 1);
        tasks.push(b.bundle()
            .pipe(source(file))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: env != "prod" }))
            .pipe(uglify())
            .on('error', log.error)
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(distDir)));
    }
    return Promise.all(tasks);
});

if (env == "watch") {
    gulp.watch('Scripts/src/**/*.js', ['javascript'])
}