'use strict';

var template = require( 'templates/done' );

/**
 * Final view showing the success/error message.
 *
 * @type wp.Backbone.View
 */
var Done = wp.Backbone.View.extend(
	{
		template: template( user_feedback.templates.done ),

		/**
		 * Render the view.
		 *
		 * @returns {Done}
		 */
		render: function () {
			this.$el.html( this.template );
			this.delegateEvents();

			return this;
		},
	}
);

module.exports = Done;
