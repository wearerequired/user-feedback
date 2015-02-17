module.exports = {
  dist: {
    options: {
      keepSpecialComments: 0,
      report             : 'gzip'
    },
    expand : true,
    cwd    : 'css/build',
    src    : ['*.css', '!*.min.css'],
    dest   : 'css/build',
    ext    : '.min.css'
  }
};