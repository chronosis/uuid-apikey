const gulp = require('gulp');
// ES6 JS/JSX Lineter -- Check for syntax errors
const eslint = require('gulp-eslint');
// Test Framework
const mocha = require('gulp-mocha');
// Prettifying
const prettier = require('gulp-prettier');

const config = require('./build.config');
const prettyConf = require('./.prettierrc.json');

const binFolder = config.binFolder;
const testFolder = config.testFolder;

const allJSFiles = [
  '*.js',
  `${testFolder}/**/*.js`,
  `${testFolder}/*.js`,
  `${binFolder}/**/*.js`,
  `${binFolder}/*.js`
];

const esLintOpts = { configFile: '.eslintrc.json', fix: true };

// Lint JS/JSX Files (For Express)
gulp.task('lint', () => {
  return gulp
    .src(allJSFiles)
    .pipe(eslint({ configFile: '.eslintrc.json' }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', () => {
  return gulp
    .src('test/index.js', { read: false })
    .pipe(mocha())
    .once('error', () => {
      process.exit(1);
    });
});

gulp.task('fix', () => {
  return gulp
    .src(allJSFiles)
    .pipe(eslint(esLintOpts))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(gulp.dest((file) => {
      return file.base;
    }));
});

gulp.task('pretty', () => {
  return gulp
    .src(allJSFiles)
    .pipe(prettier(prettyConf))
    .pipe(eslint(esLintOpts))
    .pipe(gulp.dest((file) => {
      return file.base;
    }));
});

gulp.task('default', gulp.series('lint', 'test'));
