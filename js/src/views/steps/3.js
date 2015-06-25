'use strict';

var WizardStep = require('steps/step');
var CanvasView = require('views/canvas');
var userFeedbackModel = require('models/model');
var template = require('templates/step-3');
window.html2canvas = require('html2canvas'); // Apparently needs to be globally accessible

var WizardStep3 = WizardStep.extend({
  className: 'user-feedback-wizard-step-3',
  template : template(user_feedback.templates.wizardStep3),

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
    jQuery('#user-feedback-bottombar').hide();
    jQuery('.user-feedback-modal').hide();

    html2canvas(document.body).then(function(canvas) {
      that.canvasView.redraw();
      var _canvas = jQuery('<canvas id="user-feedback-canvas-tmp" width="' + jQuery(document).width() + '" height="' + jQuery(window).height() + '"/>').hide().appendTo('body');
      var _ctx = _canvas.get(0).getContext('2d');
      _ctx.drawImage(canvas, 0, jQuery(document).scrollTop(), jQuery(document).width(), jQuery(window).height(), 0, 0, jQuery(document).width(), jQuery(window).height());

      that.model.set('userScreenshot', _canvas.get(0).toDataURL());
      jQuery('#user-feedback-canvas-tmp').remove();

      // Show UI again
      jQuery('#user-feedback-bottombar').show();
      jQuery('.user-feedback-modal').show();

      that.trigger('nextStep');
    }, function(error) {
      // Handle error
    });
  }
});

module.exports = WizardStep3;