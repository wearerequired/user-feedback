module.exports = {
	options: {
		opts: {
			autoRename: false,
			clean: true,
			saveUnmodified: true,
		}
	},
	dist: {
		files: {
			'css/user-feedback-rtl.css': 'css/user-feedback.css',
			'css/user-feedback-rtl.min.css': 'css/user-feedback.min.css',
		}
	}
};
