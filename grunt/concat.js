module.exports = {
  options: {
    banner   : '/*! <%= package.version %> */\n',
    separator: ';'
  },
  maps   : {
    src : ['js/src/md5.js', 'js/src/html2canvas.js', 'js/src/backbone.modal.js', 'js/src/feedback.js'],
    dest: 'js/build/user-feedback.js'
  }
};