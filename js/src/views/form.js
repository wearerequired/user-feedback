'use strict';

var template = require( 'templates/form' );

var Form = Backbone.View.extend(
	{
		template: template( user_feedback.templates.form ),
		isActive: false,
		bubbleOffset: {},

		render: function () {
			this.$el.html( this.template );
			this.delegateEvents();

			return this;
		},

		events: {
			'click .user-feedback-button-close': 'close',
			'click .user-feedback-button-done': 'submit',
		},

		close: function ( e ) {
			e.preventDefault();
			this.trigger( 'close' );
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
			var name = this.$el.find( '#user-feedback-user-name' ).val(),
			    email = this.$el.find( '#user-feedback-user-email' ).val();

			this.model.set( 'userName', name !== '' ? name : user_feedback.user.name );
			this.model.set( 'userEmail', email !== '' ? email : user_feedback.user.email );
			this.model.set( 'userMessage', this.$el.find( '#user-feedback-overview-note' ).val() );

			this.$el.find( '#user-feedback-overview-user div' ).append( name );
			this.$el.find( '#user-feedback-overview-note' ).val( this.model.get( 'userMessage' ) );

			this.$el.find( '#user-feedback-additional-theme' ).append( user_feedback.theme.name );
			this.$el.find( '#user-feedback-additional-browser' ).append( navigator.saysWho );
			this.$el.find( '#user-feedback-additional-template' ).append( user_feedback.theme.current_template );
			this.$el.find( '#user-feedback-additional-language' ).append( user_feedback.language );

			var screenshot = ( this.model.get( 'userScreenshot' ) ) ? this.model.get( 'userScreenshot' ) : '';
			this.$el.find( '#user-feedback-overview-screenshot-img' ).attr( 'src', screenshot );
		},

		screenCapture: function ( e ) {
			var that = this;

			// Hide UI before taking the screenshot.
			jQuery( '.user-feedback-modal' ).hide();

			html2canvas( document.body ).then( function ( canvas ) {
				that.canvasView.redraw();
				var _canvas = jQuery( '<canvas id="user-feedback-canvas-tmp" width="' + jQuery( document ).width() + '" height="' + jQuery( window ).height() + '"/>' ).hide().appendTo( 'body' );
				var _ctx    = _canvas.get( 0 ).getContext( '2d' );
				_ctx.drawImage( canvas, 0, jQuery( document ).scrollTop(), jQuery( document ).width(), jQuery( window ).height(), 0, 0, jQuery( document ).width(), jQuery( window ).height() );

				that.model.set( 'userScreenshot', _canvas.get( 0 ).toDataURL() );
				jQuery( '#user-feedback-canvas-tmp' ).remove();

				// Show UI again
				jQuery( '.user-feedback-modal' ).show();

				this.trigger( 'submit' );
			}, function ( error ) {
				// Handle error
			} );
		}
	}
);

module.exports = Form;
