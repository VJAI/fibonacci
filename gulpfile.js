'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');

gulp.task('sass', function () {
	return gulp.src(['./scss', '*.scss'].join('/'))
	           .pipe(sass().on('error', sass.logError))
	           .pipe(concat('fibonacci.css'))
	           .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
	gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('server', ['sass', 'watch'], function () {
	gulp.src('.').pipe(
		webserver(
			{
				port: 4200,
				livereload: true,
				directoryListing: false,
				open: true
			}
		)
	);
});

gulp.task('default', ['server']);