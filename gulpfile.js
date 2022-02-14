const gulp = require('gulp'),
	sass = require('gulp-sass')(require('sass')),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	webserver = require('gulp-webserver');

const { src, dest, watch, series, parallel } = gulp;
const scssFiles = './src/scss/fibonacci.scss';
const jsFiles = './src/js/export.js';

/**
 * Compiles and concatenates SCSS files to a single CSS file.
 */
function compileScss() {
	return src([scssFiles].join('/'))
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('fibonacci.css'))
		.pipe(dest('./src'));
}

/**
 * Watch for any changes in SCSS files.
 */
function watchScss() {
	return watch(scssFiles, compileScss);
}

/**
 * Transpiles JS files with Babel.
 */
function transpileJs() {
	return src([jsFiles].join('/'))
		.pipe(babel())
		.pipe(concat('fibonacci.js'))
		.pipe(dest('./src'));
}

/**
 * Watch for any changes in JS files.
 */
function watchJs() {
	return watch(jsFiles, transpileJs);
}

/**
 * Starts a simple server to launch the app.
 */
function kickServer() {
	return src('./src').pipe(
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

exports.compile = parallel(compileScss, transpileJs);
exports.default = parallel(series(parallel(compileScss, transpileJs), kickServer), watchScss, watchJs);