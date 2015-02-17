module.exports = {
  dist: {
    options: {
      browsers: [
        'last 2 versions',
        '> 5%',
        'ie 9'
      ],
      map     : true
    },
    expand : true,
    flatten: true,
    src    : 'css/build/**/*.css',
    dest   : 'css/build/'
  }
};