'use strict';

var template = require( 'templates/intro' );

/**
 * Intro view.
 *
 * @type wp.Backbone.View
 */
var Intro = wp.Backbone.View.extend(
	{
		template:  template( user_feedback.templates.intro ),
		className: 'user-feedback-bubble-sub-view',

		/**
		 * Render the view.
		 *
		 * @returns {Intro}
		 */
		render: function () {
			this.$el.html( this.template );
			this.delegateEvents();

			return this;
		},

		events: {
			'click .user-feedback-button-next': 'next'
		},

		/**
		 * Save the checkbox's value.
		 */
		next: function () {
			this.model.set( 'doNotShowInfoAgain', this.$el.find( '#user-feedback-do-not-show-again' ).is( ':checked' ) );

			jQuery( document ).trigger( 'user_feedback:next', { step: this.step } );
		}
	}
);

module.exports = Intro;
