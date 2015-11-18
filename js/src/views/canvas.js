'use strict';

var template = require('templates/annotation');

var CanvasView = Backbone.View.extend({
	className: 'user-feedback-wizard-step-3-canvas',
	template: _.template('<canvas id="user-feedback-canvas"></canvas><div id="user-feedback-annotations"></div>'),

	initialize: function () {
		this.highlighted = [];
		this.annotationCount = 0;
	},

	events: {
		'mouseup #user-feedback-canvas': 'mouseUp',
		'mousedown #user-feedback-canvas': 'mouseDown',
		'mousemove': 'mouseMove',
		'click .user-feedback-annotation-close': 'removeAnnotation',
		'mouseleave #user-feedback-canvas': 'redraw'
	},

	render: function () {
		this.$el.html(this.template());
		this.delegateEvents();

		this.canvas = this.$el.find('#user-feedback-canvas')[0];
		this.rect = {};

		// @see http://stackoverflow.com/questions/18462303/incorrect-mouse-coordinates-when-drawing-on-canvas
		this.canvas.width = jQuery(document).width();
		this.canvas.height = jQuery(document).height();
		jQuery(this.canvas).width(jQuery(document).width()).height(jQuery(document).height());
		this.ctx = this.canvas.getContext('2d');
		this.redraw();

		return this;
	},

	mouseUp: function () {
		this.drag = false;

		var dtop = this.rect.startY,
			dleft = this.rect.startX,
			dwidth = this.rect.w,
			dheight = this.rect.h;

		if (dwidth === 0 || dheight === 0) {
			return;
		}

		if (dwidth < 0) {
			dleft += dwidth;
			dwidth *= -1;
		}
		if (dheight < 0) {
			dtop += dheight;
			dheight *= -1;
		}

		if (dtop + dheight > jQuery(document).height()) {
			dheight = jQuery(document).height() - dtop;
		}
		if (dleft + dwidth > jQuery(document).width()) {
			dwidth = jQuery(document).width() - dleft;
		}

		jQuery('#user-feedback-annotations').append(template({
			id: this.annotationCount,
			top: dtop,
			left: dleft,
			width: dwidth,
			height: dheight,
			close: user_feedback.templates.wizardStep3Annotation.close,
			closeAria: user_feedback.templates.wizardStep3Annotation.closeAria
		}));
		this.annotationCount++;

		this.redraw();
		this.rect.w = 0;
	},

	mouseDown: function (e) {
		this.rect.startX = e.pageX - jQuery(e.target).offset().left;
		this.rect.startY = e.pageY - jQuery(e.target).offset().top;
		this.rect.w = 0;
		this.rect.h = 0;
		this.drag = true;
	},

	mouseMove: function (e) {
		this.redraw();
		var tmpHighlighted = [];

		var $toHighlight = tmpHighlighted[tmpHighlighted.length - 1];

		if ($toHighlight && !this.drag) {
			var _x = $toHighlight.offset().left - 2,
				_y = $toHighlight.offset().top - 2,
				_w = $toHighlight.width() + parseInt($toHighlight.css('padding-left'), 10) + parseInt($toHighlight.css('padding-right'), 10) + 6,
				_h = $toHighlight.height() + parseInt($toHighlight.css('padding-top'), 10) + parseInt($toHighlight.css('padding-bottom'), 10) + 6;

			this.drawlines(_x, _y, _w, _h, true);
			this.clearRect(_x, _y, _w, _h);

			_.each(jQuery('.user-feedback-annotation'), function (el) {
				this.clearRect(parseInt(jQuery(el).css('left'), 10), parseInt(jQuery(el).css('top'), 10), jQuery(el).width(), jQuery(el).height());
			}, this);
		}

		if (this.drag && e.type === 'mousemove') {
			this.rect.w = (e.pageX - jQuery('#user-feedback-canvas').offset().left) - this.rect.startX;
			this.rect.h = (e.pageY - jQuery('#user-feedback-canvas').offset().top) - this.rect.startY;

			this.clearRect(0, 0, jQuery('#user-feedback-canvas').width(), jQuery('#user-feedback-canvas').height());
			this.ctx.fillStyle = 'rgba(102,102,102,0.5)';
			this.ctx.fillRect(0, 0, jQuery('#user-feedback-canvas').width(), jQuery('#user-feedback-canvas').height());

			_.each(jQuery('.user-feedback-annotation'), function (el) {
				el = jQuery(el);
				this.drawlines(parseInt(el.css('left'), 10), parseInt(el.css('top'), 10), el.width(), el.height(), true);
			}, this);

			this.drawlines(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
			this.clearRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);

			_.each(jQuery('.user-feedback-annotation'), function (el) {
				el = jQuery(el);
				this.clearRect(parseInt(el.css('left'), 10), parseInt(el.css('top'), 10), el.width(), el.height());
			}, this);
		}
	},

	removeAnnotation: function (e) {
		jQuery(e.currentTarget).parent().remove();
		this.redraw();
	},

	drawlines: function (x, y, w, h, border) {
		// set our styles for the rectangle
		this.ctx.strokeStyle = "black";
		this.ctx.shadowColor = "black";
		this.ctx.shadowOffsetX = 1;
		this.ctx.shadowOffsetY = 1;
		this.ctx.shadowBlur = 10;
		this.ctx.lineJoin = "bevel";
		this.ctx.lineWidth = 3;

		if (!!border) {
			this.ctx.shadowColor = "transparent";
			this.ctx.strokeStyle = "transparent";
		}

		this.ctx.strokeRect(x, y, w, h);

		// reset styles again
		this.ctx.shadowOffsetX = 0;
		this.ctx.shadowOffsetY = 0;
		this.ctx.shadowBlur = 0;
		this.ctx.lineWidth = 1;
	},

	clearRect: function (x, y, w, h) {
		this.ctx.shadowColor = "transparent";
		this.ctx.strokeStyle = "transparent";
		this.ctx.clearRect(x, y, w, h);
	},

	redraw: function () {
		this.clearRect(0, 0, jQuery(this.canvas).width(), jQuery(this.canvas).height());
		this.ctx.fillStyle = 'rgba(102,102,102,0.5)';
		this.ctx.fillRect(0, 0, jQuery(this.canvas).width(), jQuery(this.canvas).height());

		_.each(jQuery('.user-feedback-annotation'), function (el) {
			this.drawlines(parseInt(jQuery(el).css('left'), 10), parseInt(jQuery(el).css('top'), 10), jQuery(el).width(), jQuery(el).height(), true);
			this.clearRect(parseInt(jQuery(el).css('left'), 10), parseInt(jQuery(el).css('top'), 10), jQuery(el).width(), jQuery(el).height());
		}, this);
	}
});

module.exports = CanvasView;
