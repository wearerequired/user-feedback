module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd   : 'css/src',
      src   : ['*.scss'],
      dest  : 'css/build',
      ext   : '.css'
    }]
  }
};