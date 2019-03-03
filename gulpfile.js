'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');

gulp.task('sass', function () {
	return gulp.src(['./scss', '*.scss'].join('/'))
	           .pipe(sass())
	           .pipe(concat('fibonacci.css'))
	           .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
	gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('server', function () {
	gulp.src('.').pipe(
		webserver(
			{
				livereload: true,
				directoryListing: true,
				open: true
			}
		)
	);
});

gulp.task('default', ['sass', 'watch']);