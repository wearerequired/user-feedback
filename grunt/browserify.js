module.exports = {
  dist: {
    files  : {
      'js/build/feedback.js': ['js/src/feedback.js']
    },
    options: {
      transform: ['node-underscorify'],
      external : ['jquery', 'underscore', 'backbone']
    }
  }
};