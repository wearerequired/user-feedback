var collapse = require('bundle-collapser/plugin');
module.exports = {
  dist: {
    files  : {
      'js/build/user-feedback.js': ['js/src/feedback.js']
    },
    options: {
      transform: ['node-underscorify'],
      external : ['jquery', 'underscore', 'backbone'],
      plugin   : [collapse]
    }
  }
};