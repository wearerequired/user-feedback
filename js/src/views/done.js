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
		}
	}
);

module.exports = Done;
