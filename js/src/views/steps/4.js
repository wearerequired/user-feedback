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
    var that = this;

    // Hide UI before taking the screenshot
    jQuery('#user-feedback-bottombar').hide();
    jQuery('.user-feedback-modal').hide();

    jQuery(document).mousemove(function (e) {
      that.model.set('mouseX', e.pageX);
      that.model.set('mouseY', e.pageY);
    });

    this.count = 0;
    this.images = [];
    this.captureFrame();
  },

  captureFrame: function () {
    var that = this;

    html2canvas(document.body).then(function (canvas) {
      console.log("Screenshot " + that.count);

      var context = canvas.getContext('2d');
      var radius = 20;

      console.log("Draw Circle for Mouse");

      context.beginPath();
      context.arc(that.model.get('mouseX'), that.model.get('mouseY'), radius, 0, 2 * Math.PI, false);
      context.fillStyle = '#00B9E6';
      context.fill();

      that.images.push(canvas.toDataURL());
      that.count++;

      if (that.count == 60) {
        console.log("Finished");
        // Show UI again
        jQuery('#user-feedback-bottombar').show();
        jQuery('.user-feedback-modal').show();

        that.model.set('userScreenshot', that.images);

        // Show UI again
        jQuery('#user-feedback-bottombar').show();
        jQuery('.user-feedback-modal').show();
        that.trigger('nextStep');

        return;
      }

      console.log("Draw Circle for Mouse");
      that.captureFrame();
    });
  }
});

module.exports = WizardStep4;