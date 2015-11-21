'use strict';

var template       = require( 'templates/form' );
window.html2canvas = require( 'html2canvas' ); // Apparently needs to be globally accessible.
window.navigator.saysWho = require( 'utils/browsername' );

var Form = Backbone.View.extend(
	{
		template    : template( user_feedback.templates.form ),
		isActive: false,
		bubbleOffset: {},

		render: function () {
			this.$el.html( this.template );
			this.delegateEvents();

			return this;
		},

		events: {
			'click .user-feedback-button-close': 'close',
			'click .user-feedback-button-next' : 'submit'
		},

		close: function ( e ) {
			e.preventDefault();
			this.model.set( 'inProgress', false );
		},

		next: function ( e ) {
			e.preventDefault();
			this.trigger( 'next' );
		},

		submit: function ( e ) {
			e.preventDefault();

			this.fillInTheData();

			// Only run if Canvas is supported
			if ( !!window.HTMLCanvasElement ) {
				this.screenCapture();
			} else {
				this.trigger( 'submit' );
			}

		},

		fillInTheData: function () {
			var name  = this.$el.find( '#user-feedback-user-name' ).val(),
			    email = this.$el.find( '#user-feedback-user-email' ).val();

			this.model.set( 'formData', {
				user       : {
					name : name !== '' ? name : user_feedback.user.name,
					email: email !== '' ? name : user_feedback.user.email
				},
				message: this.$el.find( '#user-feedback-overview-note' ).val(),
				theme  : user_feedback.theme,
				browser: {
					name         : navigator.saysWho,
					cookieEnabled: navigator.cookieEnabled,
					platform     : navigator.platform,
					userAgent    : navigator.userAgent,
					languages    : window.navigator.languages || [ window.navigator.language || window.navigator.userLanguage ],
				},
				url    : document.URL,
				language: user_feedback.language,
				third_party: user_feedback.third_party
			} );

			var screenshot = ( this.model.get( 'userScreenshot' ) ) ? this.model.get( 'userScreenshot' ) : '';
			this.$el.find( '#user-feedback-overview-screenshot-img' ).attr( 'src', screenshot );
		},

		screenCapture: function () {
			// Hide UI before taking the screenshot.
			jQuery( '.user-feedback-modal' ).hide();

			html2canvas( document.body ).then( function ( canvas ) {
				var _canvas = jQuery( '<canvas id="user-feedback-canvas-tmp" width="' + jQuery( document ).width() + '" height="' + jQuery( window ).height() + '"/>' ).hide().appendTo( 'body' ),
				    _ctx    = _canvas.get( 0 ).getContext( '2d' );

				_ctx.drawImage( canvas, 0, jQuery( document ).scrollTop(), jQuery( document ).width(), jQuery( window ).height(), 0, 0, jQuery( document ).width(), jQuery( window ).height() );

				this.model.set( 'formData', _.extend( this.model.get( 'formData' ), { screenshot: _canvas.get( 0 ).toDataURL() } ) );

				if ( console.image ) {
					console.image( _canvas.get( 0 ).toDataURL() );
				}

				jQuery( '#user-feedback-canvas-tmp' ).remove();

				// Show UI again.
				jQuery( '.user-feedback-modal' ).show();

				this.trigger( 'submit' );
			}, function ( error ) {
				// Handle error.
			} );
		}
	}
);

module.exports = Form;
