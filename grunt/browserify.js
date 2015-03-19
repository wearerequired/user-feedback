var collapse = require('bundle-collapser/plugin');
var remapify = require('remapify');

module.exports = {
  dist: {
    files  : {
      'js/build/user-feedback.js': ['js/src/feedback.js']
    },
    options: {
      transform  : ['node-underscorify'],
      plugin     : [collapse],
      browserifyOptions: { "extensions": ['.html'] },
      preBundleCB: function (b) {
        b.plugin(remapify, [
          {
            cwd   : 'js/src/models',
            src   : '**/*.js',
            expose: 'models'
          },
          {
            cwd   : 'js/src/views',
            src   : '**/*.js',
            expose: 'views'
          },
          {
            cwd   : 'js/src/views/steps',
            src   : '**/*.js',
            expose: 'steps'
          },
          {
            cwd   : 'js/src/templates',
            src   : '**/*.html',
            expose: 'templates'
          }
        ]);
      }
    }
  }
};