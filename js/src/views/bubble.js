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
				this.views.set( '.user-feedback-bubble-sub-view', new Intro( { model: this.model } ) );
			} else if ( 1 === this.step ) {
				this.views.set( '.user-feedback-bubble-sub-view', new Form( { model: this.model } ) );
			} else if ( 2 === this.step ) {
			}

			this.delegateEvents();

			return this;
		},

		events: {
			'click .user-feedback-bubble'      : 'toggleModal',
			'click .user-feedback-overlay': 'moveBubble',
			'click .user-feedback-button-close': 'close',
			'click .user-feedback-button-next' : 'next',
		},

		close: function ( e ) {
			e.preventDefault();
			this.model.set( 'inProgress', false );
		},

		next: function ( e ) {
			e.preventDefault();
			this.step++;
			this.render();
		},

		toggleModal: function () {
			this.$el.find( '.user-feedback-bubble-sub-view' ).toggleClass( 'hidden' );
		},

		moveBubble: function ( e ) {
			var $container = this.$el.find( '.user-feedback-bubble-container' ),
			    offsetLeft = e.pageX - $container.outerWidth() / 2,
			    offsetTop  = e.pageY - $container.outerHeight() / 2;

			//this.moveBubbleToPosition( offsetTop, offsetLeft );
			this.moveBubbleToPosition( e.pageY, e.pageX );
		},

		moveBubbleToPosition: function ( top, left ) {
			var $container = this.$el.find( '.user-feedback-bubble-container' ),
			    $overlay   = this.$el.find( '.user-feedback-overlay' ),
			    $bubble    = this.$el.find( '.user-feedback-bubble' ),
			    $modal     = this.$el.find( '.user-feedback-modal' ),
			    offsetTop  = $container.offset().top,
			    offsetLeft = $container.offset().left;

			this.offset = {
				top : top,
				left: left
			};

			$container.removeClass( 'user-feedback-bubble-container-initial' );

			console.log( 'top / left: ', top + ' / ' + left );
			console.log( 'window size: ', $overlay.width() + 'x' + $overlay.height() );
			console.log( 'container size: ', $container.width() + 'x' + $container.height() );
			console.log( 'offset: ', offsetTop + 'x' + offsetLeft );
			if ( left > ( $overlay.width() / 2 ) ) {
				console.log( 'more on the right side, modal should be left' );
				$bubble.removeClass( 'left' ).addClass( 'right' );
				$modal.removeClass( 'left' ).addClass( 'right' );
			} else {
				console.log( 'more on the left side, modal should be right' );
				$bubble.removeClass( 'right' ).addClass( 'left' );
				$modal.removeClass( 'right' ).addClass( 'left' );
			}
			if ( top > ( $overlay.height() / 2 ) ) {
				console.log( 'more in the bottom of the screen' );
				$bubble.removeClass( 'top' ).addClass( 'bottom' );
				$modal.removeClass( 'top' ).addClass( 'bottom' );
			} else {
				console.log( 'more in the top of the screen' );
				$bubble.removeClass( 'bottom' ).addClass( 'top' );
				$modal.removeClass( 'bottom' ).addClass( 'top' );
			}

			this.$el.find( '.user-feedback-bubble-container' ).css(
				{
					top   : top,
					left: left,
					right: 'auto',
					bottom: 'auto'
				}
			);
		}
	}
);

module.exports = Bubble;
