module.exports =  {
  options: {
    banner: '/*! <%= package.version %> */\n',
    separator: ';'
  },
  maps: {
    src: ['js/src/html2canvas.js', 'js/src/feedback.js', 'js/src/plugin.js'],
    dest: 'js/build/user-feedback.js'
  }
};