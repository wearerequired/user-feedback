'use strict';

var template = require( 'templates/button' );

/**
 * Feedback button view.
 *
 * @type wp.Backbone.View
 */
var Button = wp.Backbone.View.extend(
	{
		className:    'user-feedback-button-view',
		template:     template( user_feedback.templates.button ),
		isActive:     false,
		bubbleOffset: {},

		/**
		 * Render the feedback button.
		 *
		 * @returns {Button}
		 */
		render: function () {
			this.$el.html( this.template );
			this.delegateEvents();

			return this;
		},

		events: {
			'click .user-feedback-button': 'initFeedback'
		},

		/**
		 * Run the wizard.
		 */
		initFeedback: function () {
			this.isActive = true;
			this.model.set( 'inProgress', true );
		}
	}
);

module.exports = Button;
