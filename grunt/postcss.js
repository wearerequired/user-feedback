module.exports = {
	options: {
		// or
		map: {
			inline:     false, // save all source maps as separate files...
			annotation: 'css/' // ...to the specified directory
		},

		processors: [
			require( 'autoprefixer' )( {
				browsers: [
					'last 2 versions',
					'> 5%',
					'ie 9'
				]
			} ), // add vendor prefixes
			require( 'cssnano' )( {
				'zindex': false
			} ) // minify the result
		]
	},
	dist:    {
		src:  'css/user-feedback.css',
		dest: 'css/user-feedback.min.css'
	}
};
