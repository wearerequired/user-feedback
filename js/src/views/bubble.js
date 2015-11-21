'use strict';

var template = require( 'templates/bubble' ),
    Intro    = require( 'views/intro' ),
    Done     = require( 'views/done' ),
    Form     = require( 'views/form' );

var Bubble = Backbone.View.extend(
	{
		className: 'user-feedback-bubble-view',
		template : template( user_feedback.templates.bubble ),
		step     : 0,
		offset   : {},

		render: function () {
			this.$el.html( this.template );

			if ( 0 === this.step && !!this.model.get( 'doNotShowInfoAgain' ) ) {
				this.step++;
			}

			if ( 0 === this.step ) {
				this.views.set( '.user-feedback-sub-view', new Intro( { model: this.model } ) );
			} else if ( 1 === this.step ) {
				this.views.set( '.user-feedback-sub-view', new Form( { model: this.model } ) );
			} else if ( 2 === this.step ) {
				this.views.set( '.user-feedback-sub-view', new Done( { model: this.model } ) );
			}

			if ( this.offset.top && this.offset.left ) {
				this.moveBubbleToPosition( this.offset.top, this.offset.left );
			}

			this.delegateEvents();

			return this;
		},

		events: {
			'click .user-feedback-bubble'      : 'toggleModal',
			'click .user-feedback-overlay'     : 'moveBubble',
			'click .user-feedback-button-close': 'close',
			'click .user-feedback-button-next' : 'next',
			'keydown'                          : 'keydownHandler'
		},

		keydownHandler: function ( e ) {
			if ( e.keyCode === 27 || e.which === 27 ) {
				this.model.set( 'inProgress', false );
			}
		},

		close: function () {
			this.model.set( 'inProgress', false );
		},

		next: function () {
			this.step++;
			this.render();
		},

		toggleModal: function () {
			this.$el.find( '.user-feedback-sub-view' ).toggleClass( 'hidden' );
		},

		moveBubble: function ( e ) {
			this.moveBubbleToPosition( e.pageY, e.pageX );
		},

		moveBubbleToPosition: function ( top, left ) {
			var $container = this.$el.find( '.user-feedback-bubble-container' ),
			    $overlay   = this.$el.find( '.user-feedback-overlay' ),
			    $bubble    = this.$el.find( '.user-feedback-bubble' ),
			    $modal     = this.$el.find( '.user-feedback-modal' );

			$container.removeClass( 'user-feedback-bubble-container-initial' );

			this.offset = {
				top : top,
				left: left
			};

			if ( left > ( $overlay.width() / 2 ) ) {
				// More on the right hand side. The modal should be on the left.
				left -= $modal.width();
				$bubble.removeClass( 'left' ).addClass( 'right' );
				$modal.removeClass( 'left' ).addClass( 'right' );
			} else {
				// More on the left hand side. The modal should be on the right.
				left -= 25;
				$bubble.removeClass( 'right' ).addClass( 'left' );
				$modal.removeClass( 'right' ).addClass( 'left' );
			}
			if ( top > ( $overlay.height() / 2 ) ) {
				// More in the bottom of the screen.
				top -= $modal.height();
				$bubble.removeClass( 'top' ).addClass( 'bottom' );
				$modal.removeClass( 'top' ).addClass( 'bottom' );
			} else {
				// More in the top of the screen.
				top -= 25;
				$bubble.removeClass( 'bottom' ).addClass( 'top' );
				$modal.removeClass( 'bottom' ).addClass( 'top' );
			}

			this.$el.find( '.user-feedback-bubble-container' ).css(
				{
					top   : top,
					left  : left,
					right : 'auto',
					bottom: 'auto'
				}
			);
		}
	}
);

module.exports = Bubble;
