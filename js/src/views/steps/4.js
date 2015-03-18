'use strict';

var WizardStep = require('./step.js');
var CanvasView = require('../canvas.js');
var userFeedbackModel = require('../../models/model.js');
var template = require("../../templates/step-4.html");

var WizardStep4 = WizardStep.extend({
  className: 'user-feedback-wizard-step-4',
  template : template(user_feedback.templates.wizardStep4),

  events: {
    'click .user-feedback-button-screen-capture': 'screenCapture'
  },

  initialize: function () {
    this.canvasView = new CanvasView({model: userFeedbackModel});
  },

  render: function () {
    this.$el.html(this.template).append(this.canvasView.render().el);
    this.delegateEvents();

    return this;
  },

  screenCapture: function (e) {
    var that = this;

    // Hide UI before taking the screenshot
    $('#user-feedback-bottombar').hide();
    $('.user-feedback-modal').hide();

    html2canvas($('body'), {
      onrendered: function (canvas) {
        that.canvasView.redraw();
        var _canvas = $('<canvas id="user-feedback-canvas-tmp" width="' + $(document).width() + '" height="' + $(window).height() + '"/>').hide().appendTo('body');
        var _ctx = _canvas.get(0).getContext('2d');
        _ctx.drawImage(canvas, 0, $(document).scrollTop(), $(document).width(), $(window).height(), 0, 0, $(document).width(), $(window).height());

        that.model.set('userScreenshot', _canvas.get(0).toDataURL());
        $('#user-feedback-canvas-tmp').remove();

        // Show UI again
        $('#user-feedback-bottombar').show();
        $('.user-feedback-modal').show();

        that.trigger('nextStep');
      }
    });
  }
});

module.exports = WizardStep4;