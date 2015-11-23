'use strict';

var Button = require( 'views/button' ),
    Bubble = require( 'views/bubble' );

/**
 * Main View.
 *
 * @type wp.Backbone.View
 */
var App = wp.Backbone.View.extend(
	{
		el: '#user-feedback-container',

		/**
		 * View constructor.
		 */
		initialize: function () {
			this.listenTo( this.model, 'change:inProgress', this.render );
		},

		/**
		 * Render the apps' subviews.
		 *
		 * @returns {App}
		 */
		render: function () {
			if ( !this.model.get( 'inProgress' ) ) {
				// Button view.
				this.views.set( '.user-feedback-sub-view', new Button( { model: this.model } ) );
			} else {
				// Clear everything from the model.
				this.model.clear().set( this.model.defaults() );

				// Bubble view that contains the individual steps.
				this.views.set( '.user-feedback-sub-view', new Bubble( { model: this.model } ) );
			}

			this.delegateEvents();

			return this;
		}
	}
);

module.exports = App;
