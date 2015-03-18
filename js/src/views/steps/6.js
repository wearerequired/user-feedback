'use strict';

var WizardStep = require('./step.js');
var template = require("../../templates/step-6.html");

var WizardStep6 = WizardStep.extend({
  className: 'user-feedback-wizard-step-6',
  template : template(user_feedback.templates.wizardStep6)
});

module.exports = WizardStep6;