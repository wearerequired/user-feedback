/**
 * User Feedback
 *
 * Copyright (c) 2015 required+
 * Licensed under the GPLv2+ license.
 */

// Load required modules.
var App           = require( 'views/app' ),
    FeedbackModel = require( 'models/feedback' );

(function ( $ ) {
	$( function () {
		'use strict';

		// Run Boy Run.
		var app = new App( { model: new FeedbackModel() } );
		app.render();
	} );
})( jQuery, Backbone );
