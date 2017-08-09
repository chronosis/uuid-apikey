const
  gulp        = require('gulp')
  , eslint      = require('gulp-eslint')        // ES6 JS/JSX Lineter -- Check for syntax errors
  , mocha       = require('gulp-mocha')         // Test Framework
;

// Lint JS/JSX Files (For Express)
gulp.task('lint', () => {
  return gulp.src('index.js')
    .pipe(eslint({ configFile: 'eslint.json'}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', ['lint'], () => {
  return gulp.src('test/index.js', {read: false})
    .pipe(mocha())
    .once('error', function() {
      process.exit(1);
    });
});

gulp.task('default', ['test']);
