'use strict';

var template = require( 'templates/intro' );

var Intro = Backbone.View.extend(
	{
		template: template( user_feedback.templates.intro ),
		isActive: false,
		bubbleOffset: {},

		render: function () {
			this.$el.html( this.template );
			this.delegateEvents();

			return this;
		},

		events: {
			'click .user-feedback-button-close': 'close',
			'click .user-feedback-button-done': 'submit',
		},

		close: function ( e ) {
			e.preventDefault();
			this.trigger( 'close' );
		},

		submit: function ( e ) {
			e.preventDefault();

			this.model.set( 'doNotShowInfoAgain', this.$el.find( 'user-feedback-do-not-show-again' ).is( ':checked' ) );

			this.trigger( 'submit' );
		}
	}
);

module.exports = Intro;
