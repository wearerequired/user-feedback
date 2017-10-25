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
		clientX:   0,
		clientY:   0,
		isRtl:     user_feedback.isRtl,

		/**
		 * View constructor.
		 */
		initialize: function() {
			var self = this, $document = jQuery( document );

			this.listenTo( this.model, 'sync', this.next );
			this.listenTo( this.model, 'error', this.next );

			// Populate current mouse position on document to workaround
			// an issue in Firefox where the position is not exposed on
			// a child element.
			$document.on( 'dragover.user-feedback mousemove.user-feedback', function( e ) {
				self.clientX = e.clientX;
				self.clientY = e.clientY;
			} );
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
			'dragleave .user-feedback-bubble':   'preventDrag',
			'dragexit .user-feedback-bubble':    'preventDrag',
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
		 *
		 * @param {Event} e Event data.
		 */
		dragStart: function( e ) {
			var self = this;

			// Hide the original element after the browser has copied it.
			setTimeout( function() {
				self.$el.find( '.user-feedback-bubble' ).addClass( 'hidden' );
			}, 1 );

			this.$el.find( '.user-feedback-sub-view' ).addClass( 'hidden' );
			if ( e.originalEvent.dataTransfer ) {
				e.originalEvent.dataTransfer.effectAllowed = 'move';
				e.originalEvent.dataTransfer.setData( 'text', ' ' );
			}
		},

		/**
		 * Shows the modal again on drag end.
		 */
		dragEnd: function() {
			this.$el.find( '.user-feedback-bubble' ).removeClass( 'hidden' );
			this.$el.find( '.user-feedback-sub-view' ).removeClass( 'hidden' );
		},

		/**
		 * Prevents default action of the drag event.
		 *
		 * @param {Event} e Event data.
		 */
		preventDrag: function( e ) {
			if ( e.stopPropagation ) {
				e.stopPropagation(); // Stops some browsers from redirecting.
			}

			e.preventDefault();
		},

		/**
		 * Click handler to move the bubble.
		 *
		 * @param {Event} e Event data.
		 */
		moveBubble: function( e ) {
			e.preventDefault();

			if ( this.clientY > 0 && this.clientX > 0 ) {
				this.moveBubbleToPosition( this.clientY, this.clientX );
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
		moveBubbleToPosition: _.throttle( function( top, left ) {
			var $container = this.$el.find( '.user-feedback-bubble-container' ),
				$overlay = this.$el.find( '.user-feedback-overlay' ),
				$bubble = this.$el.find( '.user-feedback-bubble' ),
				$modal = this.$el.find( '.user-feedback-modal' ),
				$modalArrow = this.$el.find( '.user-feedback-modal__arrow' ),
				bubbleWidth = $bubble.width(),
				bubbleHeight = $bubble.height(),
				bubbleRadius = bubbleHeight / 2,
				modalInnerWidth = $modal.innerWidth(),
				modalWidth = $modal.width(),
				overlayHeight = $overlay.height(),
				overlayWidth = $overlay.width();

			$container.removeClass( 'user-feedback-bubble-container-initial' );

			$bubble.removeClass( 'left middle right top bottom' );
			$modal.removeClass( 'left middle right top bottom' );

			if ( left + modalInnerWidth >= overlayWidth && left - modalInnerWidth - bubbleWidth > 0 ) {
				// More on the right hand side. The modal should be on the left.
				left += bubbleRadius;
				$bubble.addClass( this.isRtl ? 'left' : 'right' );
				$modal.addClass( this.isRtl ? 'left' : 'right' );
			} else if ( left + modalInnerWidth + bubbleWidth <= overlayWidth && left - modalInnerWidth < 0 ) {
				// More on the left hand side. The modal should be on the right.
				left -= bubbleRadius;
				$bubble.addClass( this.isRtl ? 'right' : 'left' );
				$modal.addClass( this.isRtl ? 'right' : 'left' );
			} else {
				if ( this.isRtl ) {
					left -= bubbleRadius;
				} else {
					left += bubbleRadius;
				}

				$bubble.addClass( 'middle' );
				$modal.addClass( 'middle' );
			}

			if ( top > ( overlayHeight / 2 ) ) {
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

			// Limit position to max width and height of screen size.
			top = Math.max( 0, top );
			top = Math.min( overlayHeight, top );

			left = Math.max( 0, left );
			left = Math.min( overlayWidth, left );

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
				var modalLeft = left,
					modalArrowWidth = parseInt( $modalArrow.css( 'border-left-width' ), 10 );

				if ( modalLeft > overlayWidth / 2 ) {
					modalLeft = modalLeft - overlayWidth / 2;
				} else {
					modalLeft = modalLeft - bubbleWidth - bubbleWidth - bubbleRadius;
				}

				var direction = this.isRtl ? 'right' : 'left';

				var modalCSS = {};
				modalCSS[ direction ] = ( -modalLeft / 2 ) - bubbleWidth;

				$modal.css( modalCSS );

				var modalArrowCSS = {};
				modalArrowCSS[ direction ] = Math.max( 0, Math.min( modalLeft / 2 - ( bubbleWidth / 2 ) / 2 + modalArrowWidth / 2, modalWidth - 2 ) );

				$modalArrow.css( modalArrowCSS );
			}
		}, 100 ),
	}
);

module.exports = Bubble;
