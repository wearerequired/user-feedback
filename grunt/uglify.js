module.exports = {
	all: {
		files  : {
			'js/user-feedback.min.js': ['js/user-feedback.js']
		},
		options: {
			banner   : '/*! <%= package.title %> - v<%= package.version %>\n' +
			' * <%= package.homepage %>\n' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
			' * Licensed GPLv2+' +
			' */\n',
			sourceMap: true,
			mangle   : {
				except: ['jQuery']
			}
		}
	}
}
