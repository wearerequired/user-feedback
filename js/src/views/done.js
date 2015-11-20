'use strict';

var template = require( 'templates/done' );

var Done = Backbone.View.extend(
	{
		template: template( user_feedback.templates.done ),

		render: function () {
			this.$el.html( this.template );
			this.delegateEvents();

			return this;
		},

		events: {
			'click .user-feedback-button-close': 'close',
			'click .user-feedback-button-next' : 'close',
		},

		close: function ( e ) {
			e.preventDefault();
			this.model.set( 'inProgress', false );
		},
	}
);

module.exports = Done;
