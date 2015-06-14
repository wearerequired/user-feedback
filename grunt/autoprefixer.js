module.exports = {
	dist: {
		options: {
			browsers: [
				'last 2 versions',
				'> 5%',
				'ie 9'
			]
		},
		expand : true,
		flatten: true,
		src    : 'css/user-feedback.css',
		dest   : 'css/'
	}
}
