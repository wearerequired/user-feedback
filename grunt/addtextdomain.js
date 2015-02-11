module.exports = {
  dist: {
    options: {
      textdomain   : 'user-feedback',
      updateDomains: []
    },
    target : {
      files: {
        src: ['*.php', '**/*.php', '!node_modules/**', '!tests/**']
      }
    }
  }
};