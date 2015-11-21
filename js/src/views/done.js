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
	}
);

module.exports = Done;
