var collapse = require( 'bundle-collapser/plugin' );
var remapify = require( 'remapify' );

module.exports = {
	dist: {
		files:   {
			'js/user-feedback.js': [ 'js/src/user-feedback.js' ]
		},
		options: {
			browserifyOptions: { 'extensions': [ '.html' ] },
			transform:         [ [ 'node-underscorify', { global: true } ] ],
			plugin:            [
				collapse,
				[ remapify, [
					{
						cwd:    'js/src/models',
						src:    '**/*.js',
						expose: 'models'
					},
					{
						cwd:    'js/src/views',
						src:    '**/*.js',
						expose: 'views'
					},
					{
						cwd:    'js/src/templates',
						src:    '**/*.html',
						expose: 'templates'
					}
				]
				]
			]
		}
	}
};
