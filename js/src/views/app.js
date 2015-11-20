'use strict';

var Button = require( 'views/button' ),
    Bubble = require( 'views/bubble' );

var App = wp.Backbone.View.extend(
	{
		el: '#user-feedback-container',
		inProgress: false,

		initialize: function () {
			this.views.set( '.user-feedback-sub-view', new Button( { model: this.model } ) );

			this.listenTo( this.model, 'change:inProgress', this.changeProgress );

			this.model.set( 'doNotShowInfoAgain', document.cookie.indexOf('user_feedback_do_not_show_again') >= 0 );
		},

		render: function () {
			if ( !this.inProgress ) {
				// Button view.
				this.views.set( '.user-feedback-sub-view', new Button( { model: this.model } ) );
			} else {
				// Bubble view that contains the individual steps.
				this.views.set( '.user-feedback-sub-view', new Bubble( { model: this.model } ) );
			}
		},

		changeProgress: function () {
			this.inProgress = !this.inProgress;
			this.render();
		}
	}
);

module.exports = App;
