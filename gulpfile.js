'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', function () {
	return gulp.src(['./scss', '*.scss'].join('/'))
	           .pipe(sass())
	           .pipe(concat('fibonacci.css'))
	           .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
	gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);