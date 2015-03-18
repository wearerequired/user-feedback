module.exports = {
  options: {
    livereload: true
  },

  config: {
    files: 'grunt/watch.js'
  },

  css: {
    files: 'css/src/**/*.scss',
    tasks: ['sass', 'cssmin', 'autoprefixer']
  },

  jsminify: {
    files: 'js/src/**/*.js',
    tasks: ['browserify', 'concat', 'uglify']
  }
};