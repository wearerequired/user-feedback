'use strict';

var template       = require( 'templates/form' );
window.html2canvas = require( 'html2canvas' ); // Apparently needs to be globally accessible.

/**
 * Form view.
 *
 * @type wp.Backbone.View
 */
var Form = wp.Backbone.View.extend(
	{
		template:     template( user_feedback.templates.form ),
		isActive:     false,
		bubbleOffset: {},

		/**
		 * Render the view.
		 *
		 * @returns {Form}
		 */
		render: function () {
			this.$el.html( this.template );
			this.delegateEvents();

			return this;
		},

		events: {
			'click .user-feedback-button-submit': 'submit'
		},

		/**
		 * Save the form fields on submission.
		 */
		submit: function () {
			var name    = this.$el.find( '#user-feedback-user-name' ).val(),
			    email   = this.$el.find( '#user-feedback-user-email' ).val(),
			    message = this.$el.find( '#user-feedback-overview-note' ).val(),
			    user    = this.model.get( 'user' );

			if ( !! name ) {
				user.name = name;
			}

			if ( !! email ) {
				user.email = email;
			}

			if ( !!message ) {
				this.model.set( 'message', message );
			}

			this.model.set( 'user', user );

			// Only run if Canvas is supported
			if ( !!window.HTMLCanvasElement && !! this.model.get( 'doScreenCapture' ) ) {
				this.screenCapture();
			} else {
				this.sendData();
			}
		},

		/**
		 * Capture the entire screen in a canvas.
		 */
		screenCapture: function () {
			// Hide UI before taking the screenshot.
			jQuery( '.user-feedback-modal' ).hide();

			html2canvas( document.documentElement, {
				type: 'view',
			} ).then( _.bind( function ( canvas ) {
				try {
					this.model.set( 'screenshot', canvas.toDataURL() );
				} catch ( e ) {
					this.setError();
					this.model.trigger( 'error' );
					return;
				}

				jQuery( document ).trigger( 'user_feedback:screen_capture' );

				this.sendData();
			}, this ), _.bind( function () {
				this.sendData();
			}, this ) );
		},

		/**
		 * Let the model send the data.
		 */
		sendData: function () {
			this.model.save(
				{},
				{
					success: _.bind( function( model, response ) {
						if ( !response.data ) {
							this.setError();
							return;
						}

						// Personalize the message text.
						user_feedback.templates.done.subtitle = response.data.title;
						user_feedback.templates.done.message  = response.data.message;

						jQuery( document ).trigger( 'user_feedback:submit:success' );
					}, this ),
					error:   _.bind( function() {
						this.setError();
					}, this )
				}
			);
		},

		setError: function () {
			user_feedback.templates.done.subtitle = user_feedback.templates.done.errortitle;
			user_feedback.templates.done.message  = user_feedback.templates.done.errormessage;

			jQuery( document ).trigger( 'user_feedback:submit:error' );
		}
	}
);

module.exports = Form;
