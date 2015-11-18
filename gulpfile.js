var gulp = require('gulp');
var path = require('path');
var runSequence = require('run-sequence');

var buildConfig = require('./gulp.config');

gulp.task('clean', function () {
  var del = require('del');
  del([
    buildConfig.target.distFolder
  ])
});


gulp.task('copy-index', function () {
  gulp.src(buildConfig.source.folder + "/" + buildConfig.source.files.app.index).pipe(gulp.dest(buildConfig.target.distFolder));
});

gulp.task('copy-static', function () {
  gulp.src(buildConfig.source.folder + "/" + buildConfig.source.files.app.static).pipe(gulp.dest(buildConfig.target.distFolder));
});

gulp.task('copy-assets', function () {
  gulp.src(buildConfig.source.folder + "/" + buildConfig.source.files.app.assets).pipe(gulp.dest(buildConfig.target.distFolder));
});

gulp.task('copy-css', function () {
  gulp.src(buildConfig.source.folder + "/" + buildConfig.source.files.app.css).pipe(gulp.dest(buildConfig.target.distFolder));
});

gulp.task('copy-assets', function () {
  gulp.src(buildConfig.source.folder + "/" + buildConfig.source.files.app.assets).pipe(gulp.dest(buildConfig.target.distFolder));
});

gulp.task('copy-app', function (done) {
  runSequence(
    'copy-index',
    'copy-static',
    'copy-assets',
    'copy-css',
    done
  );
});


gulp.task('copy-vendor-static', function () {
  gulp.src(buildConfig.source.vendorFolder + "/" + buildConfig.source.files.vendor.static).pipe(gulp.dest(buildConfig.target.distFolder + "/" + buildConfig.target.vendorFolder));
});

gulp.task('copy-vendor-assets', function () {
  gulp.src(buildConfig.source.vendorFolder + "/" + buildConfig.source.files.vendor.assets).pipe(gulp.dest(buildConfig.target.distFolder + "/" + buildConfig.target.vendorFolder));
});

gulp.task('copy-vendor-js', function () {
  gulp.src(buildConfig.source.vendorFolder + "/" + buildConfig.source.files.vendor.js).pipe(gulp.dest(buildConfig.target.distFolder + "/" + buildConfig.target.vendorFolder));
});

gulp.task('copy-vendor-css', function () {
  gulp.src(buildConfig.source.vendorFolder + "/" + buildConfig.source.files.vendor.css).pipe(gulp.dest(buildConfig.target.distFolder + "/" + buildConfig.target.vendorFolder));
});

gulp.task('copy-vendor', function (done) {
  runSequence(
    'copy-vendor-static',
    'copy-vendor-assets',
    'copy-vendor-js',
    'copy-vendor-css',
    done
  );
});

// Hint: was orginally => module: 'system', noImplicitAny: true,
gulp.task('ts2js', function () {
  var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
  });
  // tsProject.src() instead instead of gulp.src(...)
  var tsResult = tsProject.src([buildConfig.source.folder + "/" + buildConfig.source.files.app.ts, buildConfig.source.files.typings])
    .pipe(ts(tsProject));

  /*
   // Without tsconfig.json
   var typescript = require('gulp-typescript');
   var tsResult = gulp.src([buildConfig.source.folder + "/" + buildConfig.source.files.app.ts, buildConfig.source.files.typings])
   .pipe(typescript({
     noImplicitAny: false,
     module: 'system',
     target: 'ES5',
     sourceMap: false,
     emitDecoratorMetadata: true,
     experimentalDecorators: true,
     removeComments: false
   }));
   */

  return tsResult.js.pipe(gulp.dest(buildConfig.target.distFolder));
});

// Hint: was orginally => module: 'system', noImplicitAny: true,
gulp.task('ts2js', function () {
  var typescript = require('gulp-typescript');
  var tsResult = gulp.src([buildConfig.source.folder + "/" + buildConfig.source.files.app.ts, buildConfig.source.files.typings])
    .pipe(typescript({
      noImplicitAny: false,
      module: 'system',
      target: 'ES5',
      sourceMap: false,
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      removeComments: false
    }));

  return tsResult.js.pipe(gulp.dest(buildConfig.target.distFolder));
});


gulp.task('run', ['copy-app', 'copy-vendor', 'ts2js'], function () {
  var http = require('http');
  var connect = require('connect');
  var serveStatic = require('serve-static');
  var open = require('open');

  var port = 9998;

  gulp.watch(buildConfig.source.folder + "/" + buildConfig.source.files.app.ts, ['ts2js']);

  var app = connect().use(serveStatic(path.join(__dirname, buildConfig.target.distFolder)));

  http.createServer(app).listen(port, function () {
    open('http://localhost:' + port);
  });
});
