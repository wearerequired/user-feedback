'use strict';

var WizardStep = require('steps/step');
var CanvasView = require('views/canvas');
var userFeedbackModel = require('models/model');
var template = require('templates/step-4');

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
    // Hide UI before taking the screenshot
    jQuery('#user-feedback-bottombar').hide();
    jQuery('.user-feedback-modal').hide();

    var recorder = RecordRTC(this.canvasView.canvas, {
      type: 'canvas'
    });
    recorder.startRecording();

    var that = this;

    setTimeout(function() {
      recorder.stopRecording(function(url) {
        console.log(url);
        window.open(url);

        // Show UI again
        jQuery('#user-feedback-bottombar').show();
        jQuery('.user-feedback-modal').show();

        // Show UI again
        jQuery('#user-feedback-bottombar').show();
        jQuery('.user-feedback-modal').show();
        that.trigger('nextStep');
      });
    }, 10000);

  }
});

module.exports = WizardStep4;