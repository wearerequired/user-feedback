'use strict';

var WizardStep = require('./step.js');
var template = require("../../templates/step-3.html");

var WizardStep3 = WizardStep.extend({
  className: 'user-feedback-wizard-step-3',
  template : template(user_feedback.templates.wizardStep3),

  nextStep: function () {
    this.model.set('userMessage', $(document.getElementById('user-feedback-message')).val());
  }
});

module.exports = WizardStep3;