'use strict';

var template = require( 'templates/intro' );

var Intro = Backbone.View.extend(
	{
		template : template( user_feedback.templates.intro ),
		className: 'user-feedback-bubble-sub-view',

		render: function () {
			this.$el.html( this.template );
			this.delegateEvents();

			return this;
		},

		events: {
			'click .user-feedback-button-next': 'setCookie',
		},

		setCookie: function () {
			this.model.set( 'doNotShowInfoAgain', this.$el.find( '#user-feedback-do-not-show-again' ).is( ':checked' ) );
		}
	}
);

module.exports = Intro;
