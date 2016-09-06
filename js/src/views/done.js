'use strict';

var template = require( 'templates/done' );

/**
 * Final view showing the success/error message.
 *
 * @type wp.Backbone.View
 */
var Done = wp.Backbone.View.extend(
	{
		/**
		 * Render the view.
		 *
		 * @returns {Done}
		 */
		render: function () {
			this.$el.html( template( user_feedback.templates.done ) );
			this.delegateEvents();

			return this;
		},

		events: {
			'click .user-feedback-button-next': 'close'
		},

		/**
		 * Close the sub views and go back to start.
		 */
		close: function () {
			this.model.set( 'inProgress', false );

			jQuery( document ).trigger( 'user_feedback:close' );
		}
	}
);

module.exports = Done;
