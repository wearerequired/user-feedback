'use strict';

var Button = require( 'views/button' );

var AppView = wp.Backbone.View.extend({
	el: '#user-feedback-container',

	initialize: function () {
		this.views.set( '#user-feedback-button-view', new Button() );
	}
});

module.exports = AppView;
