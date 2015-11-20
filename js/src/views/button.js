'use strict';

var template = require( 'templates/button' );

var Button = Backbone.View.extend(
	{
		className: 'user-feedback-button-view',
		template: template( user_feedback.templates.button ),
		isActive: false,
		bubbleOffset: {},

		render: function () {
			this.$el.html( this.template );
			this.delegateEvents();

			return this;
		},

		events: {
			'click .user-feedback-button': 'initFeedback'
		},

		initFeedback: function () {
			this.isActive = true;
			this.model.set( 'inProgress', true );
		}
	}
);

module.exports = Button;
