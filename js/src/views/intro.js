'use strict';

var template = require( 'templates/intro' );

var Intro = Backbone.View.extend(
	{
		template: template( user_feedback.templates.intro ),

		render: function () {
			this.$el.html( this.template );
			this.delegateEvents();

			return this;
		},

		events: {
			'click .user-feedback-button-next': 'setCookie',
		},

		setCookie: function () {
			var cookie = this.$el.find( 'user-feedback-do-not-show-again' ).is( ':checked' ),
			    date   = new Date();

			if ( cookie ) {
				this.model.set( 'doNotShowInfoAgain', cookie );

				date.setDate( date.getDate() + 30 );
				document.cookie = 'user_feedback_do_not_show_again=1; path=/;expires=' + date.toUTCString();
			}
		}
	}
);

module.exports = Intro;
