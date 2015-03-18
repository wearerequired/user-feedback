module.exports = {
  dist: {
    files  : {
      'js/build/feedback.js': ['js/src/feedback.js']
    },
    options: {
      transform: ['node-underscorify'],
      //debug    : true,
      external : ['jquery', 'underscore', 'backbone']
    }
  }
};