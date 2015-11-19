'use strict';

var buttonTemplate = require( 'templates/button' ),
    bubbleTemplate = require( 'templates/bubble' ),
    Form           = require( 'views/form' );

var Button = Backbone.View.extend(
	{
		template: buttonTemplate( user_feedback.templates.button ),
		isActive: false,
		bubbleOffset: {},

		render: function () {
			if ( this.isActive ) {
				this.template = bubbleTemplate( user_feedback.templates.bubble );
			} else {
				this.template = buttonTemplate( user_feedback.templates.button );
			}

			this.$el.html( this.template );
			this.delegateEvents();

			return this;
		},

		events: {
			'click #user-feedback-button.user-feedback-button': 'initFeedback',
			'click .user-feedback-bubble': 'toggleMessageBox',
			'click #user-feedback-overlay': 'moveBubble',
		},

		initFeedback: function () {
			this.isActive = true;
			this.trigger( 'init' );
			this.render();

			return this;
		},

		toggleMessageBox: function () {
			this.views.set( '#user-feedback-message-view', new Form() );
		},

		moveBubble: function ( e ) {
			var $target = jQuery( e.target ),
			    $bubble = this.$el.find( '.user-feedback-bubble' ),
			    offsetLeft = e.pageX - $bubble.outerWidth() / 2,
			    offsetTop = e.pageY - $bubble.outerHeight() / 2;

			this.bubbleOffset = {
				top: offsetTop,
				left: offsetLeft
			};

			this.$el.find( '.user-feedback-bubble' ).css(
				{
					top: offsetTop,
					left: offsetLeft,
					right: 'auto',
					bottom: 'auto'
				}
			);
		}
	}
);

module.exports = Button;
