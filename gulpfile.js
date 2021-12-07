const gulp = require('gulp'),
	sass = require('gulp-sass')(require('sass')),
	concat = require('gulp-concat'),
	webserver = require('gulp-webserver');

const { src, dest, watch, series, parallel } = gulp;
const scssFiles = './scss/*.scss';

/**
 * Compiles and concatenates SCSS files to a single CSS file.
 */
function compile() {
	return src([scssFiles].join('/'))
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('fibonacci.css'))
		.pipe(dest('.'));
}

/**
 * Watch for any changes in SCSS files.
 */
function watchScss() {
	return watch(scssFiles, series(compile));
}

/**
 * Starts a simple server to launch the app.
 */
function kickServer() {
	return src('.').pipe(
		webserver(
			{
				port: 4200,
				livereload: true,
				directoryListing: false,
				open: true
			}
		)
	);
}

exports.compile = compile;
exports.default = parallel(series(compile, kickServer), watchScss);