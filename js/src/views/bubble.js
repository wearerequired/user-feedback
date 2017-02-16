'use strict';

var template = require( 'templates/bubble' ),
    Intro    = require( 'views/intro' ),
    Done     = require( 'views/done' ),
    Form     = require( 'views/form' );

/**
 * Bubble view.
 *
 * @type wp.Backbone.View
 */
var Bubble = wp.Backbone.View.extend(
	{
		className: 'user-feedback-bubble-view',
		template:  template( user_feedback.templates.bubble ),
		step:      0,
		offset:    {},

		/**
		 * View constructor.
		 */
		initialize: function() {
			this.listenTo( this.model, 'sync', this.next );
			this.listenTo( this.model, 'error', this.next );
		},

		/**
		 * Render the individual steps.
		 *
		 * @returns {Bubble}
		 */
		render: function() {
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

			this.$el.find( '.user-feedback-bubble' ).focus();

			if ( this.offset.top && this.offset.left ) {
				this.moveBubbleToPosition( this.offset.top, this.offset.left );
			}

			this.delegateEvents();

			return this;
		},

		ready: function() {
			if ( !this.offset.top && !this.offset.left ) {
				this.setInitialBubblePosition();
			}
		},

		events: {
			'click .user-feedback-bubble':       'toggleModal',
			'click .user-feedback-overlay':      'moveBubble',
			'click .user-feedback-button-close': 'close',
			'click .user-feedback-button-next':  'next',
			'keydown':                           'keydownHandler',
			'drag .user-feedback-bubble':        'moveBubble',
			'dragover .user-feedback-bubble':    'preventDrag',
			'drop .user-feedback-bubble':        'preventDrag',
			'dragstart .user-feedback-bubble':   'dragStart',
			'dragend .user-feedback-bubble':     'dragEnd',
			'touchmove .user-feedback-bubble':   'moveBubble',
			'touchend .user-feedback-bubble':    'dragEnd'
		},

		/**
		 * Handle esc key presses.
		 *
		 * @param {Event} e Event object.
		 */
		keydownHandler: function( e ) {
			if ( 27 === e.keyCode ) {
				this.close();
			} else if ( 9 === e.keyCode ) {
				this.constrainTabbing( e );
			}
		},

		/**
		 * Close the sub views and go back to start.
		 */
		close: function() {
			this.model.set( 'inProgress', false );

			jQuery( document ).trigger( 'user_feedback:close' );
		},

		/**
		 * Constrain tabbing within the feedback modal.
		 *
		 * @param {Event} e Event object.
		 */
		constrainTabbing: function( e ) {
			var bubble        = this.$el.find( '.user-feedback-bubble' ),
			    primaryButton = this.$el.find( '.user-feedback-button-primary' ),
			    closeButton   = this.$el.find( '.user-feedback-button-close' );

			if ( closeButton[ 0 ] === e.target ) {
				if ( e.shiftKey ) {
					primaryButton.focus();
				} else {
					bubble.focus();
				}
				e.preventDefault();
			} else if ( bubble[ 0 ] === e.target && e.shiftKey ) {
				closeButton.focus();
				e.preventDefault();
			} else if ( primaryButton[ 0 ] === e.target && !e.shiftKey ) {
				closeButton.focus();
				e.preventDefault();
			}
		},

		/**
		 * Go to the next step.
		 */
		next: function() {
			this.step++;
			this.render();

			jQuery( document ).trigger( 'user_feedback:next', { step: this.step } );
		},

		/**
		 * Show/hide the modal.
		 */
		toggleModal: function() {
			this.$el.find( '.user-feedback-sub-view' ).toggleClass( 'hidden' );

			jQuery( document ).trigger( 'user_feedback:bubble:toggle' );
		},

		/**
		 * Hides the modal on drag start.
		 */
		dragStart: function( e ) {
			this.$el.find( '.user-feedback-sub-view' ).addClass( 'hidden' );
			if ( e.originalEvent.dataTransfer ) {
				e.originalEvent.dataTransfer.effectAllowed = 'move';
			}
		},

		/**
		 * Shows the modal again on drag end.
		 */
		dragEnd: function() {
			this.$el.find( '.user-feedback-sub-view' ).removeClass( 'hidden' );
		},

		preventDrag: function( e ) {
			e.preventDefault();
		},

		/**
		 * Click handler to move the bubble.
		 *
		 * @param {Event} e Event data.
		 */
		moveBubble: function( e ) {
			e.preventDefault();

			if ( e.clientX > 0 && e.clientY > 0 ) {
				this.moveBubbleToPosition( e.clientY, e.clientX );
			} else if ( e.originalEvent.targetTouches ) {
				if ( !this.$el.find( '.user-feedback-sub-view' ).hasClass( 'hidden' ) ) {
					this.$el.find( '.user-feedback-sub-view' ).addClass( 'hidden' );
				}

				var $bubble = this.$el.find( '.user-feedback-bubble' ),
				    touch   = e.originalEvent.targetTouches[ 0 ];

				this.moveBubbleToPosition( touch.pageY - $bubble.height() / 2, touch.pageX - $bubble.width() / 2 );
			}
		},

		/**
		 * Initially sets the bubble to the center of the page.
		 */
		setInitialBubblePosition: function() {
			var $overlay = this.$el.find( '.user-feedback-overlay' );

			this.moveBubbleToPosition( $overlay.height() / 2, $overlay.width() / 2 );
		},

		/**
		 * Move the bubble to a specific position.
		 *
		 * @param {int} top Y offset.
		 * @param {int} left X offset.
		 */
		moveBubbleToPosition: function( top, left ) {
			var $container   = this.$el.find( '.user-feedback-bubble-container' ),
			    $overlay     = this.$el.find( '.user-feedback-overlay' ),
			    $bubble      = this.$el.find( '.user-feedback-bubble' ),
			    bubbleRadius = $bubble.height() / 2,
			    $modal       = this.$el.find( '.user-feedback-modal' ),
			    $modalArrow  = this.$el.find( '.user-feedback-modal__arrow' );

			$container.removeClass( 'user-feedback-bubble-container-initial' );

			$bubble.removeClass( 'left middle right top bottom' );
			$modal.removeClass( 'left middle right top bottom' );

			if ( left + $modal.width() > $overlay.width() && left - $modal.width() - $bubble.width() > 0 ) {
				// More on the right hand side. The modal should be on the left.
				left += bubbleRadius;
				$bubble.addClass( 'right' );
				$modal.addClass( 'right' );
			} else if ( left + $modal.width() + $bubble.width() < $overlay.width() && left - $modal.width() < 0 ) {
				// More on the left hand side. The modal should be on the right.
				left -= bubbleRadius;
				$bubble.addClass( 'left' );
				$modal.addClass( 'left' );
			} else {
				left += bubbleRadius;
				$bubble.addClass( 'middle' );
				$modal.addClass( 'middle' );
			}

			if ( top > ( $overlay.height() / 2 ) ) {
				// More in the bottom of the screen.
				top += bubbleRadius;
				$bubble.addClass( 'bottom' );
				$modal.addClass( 'bottom' );
			} else {
				// More in the top of the screen.
				top -= bubbleRadius;
				$bubble.addClass( 'top' );
				$modal.addClass( 'top' );
			}

			this.offset = {
				top:  top,
				left: left
			};

			this.$el.find( '.user-feedback-bubble-container' ).css( {
				top:    top,
				left:   left,
				right:  'auto',
				bottom: 'auto'
			} );

			$modal.removeAttr( 'style' );
			$modalArrow.removeAttr( 'style' );

			if ( $modal.hasClass( 'middle' ) ) {
				$modal.css( {
					left: -left / 2
				} );

				$modalArrow.css( {
					left: Math.max( 0, Math.min( left / 2 - ( $bubble.width() + $bubble.height() ) / 2, $modal.width() - 2 ) )
				} );
			}
		}
	}
);

module.exports = Bubble;
