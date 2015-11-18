'use strict';

module.exports = {

  source: {
    folder: 'src',
    vendorFolder: 'src/vendor',

    files: {
      app: {
        ts: '**/*.ts',
        js: '**/*.js',
        static: '**/*.html',
        index: 'index.html',
        css: '**/*.css',
        assets: 'assets/**/!(*.js|*.css)'
      },
      vendor: {
        js: '**/*.js',
        css: '**/*.css',
        static: '**/*.html',
        assets: '**/!(*.js|*.css)'
      },
      typings: 'typings/tsd.d.ts'
    }
  },

  target: {
    buildFolder: 'build',
    distFolder: 'dist',
    assetsFolder: 'assets',
    resourcesFolder: 'resources',
    vendorFolder: 'vendor',
    minified: {
      js: 'app.js',
      css: 'app.css'
    }
  },

  angularModuleName: 'pms-sample-ng2'
};
