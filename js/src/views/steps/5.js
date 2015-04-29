'use strict';

var WizardStep = require('steps/step');
var template = require('templates/step-5');

var WizardStep5 = WizardStep.extend({
  className: 'user-feedback-wizard-step-5',
  template : template(user_feedback.templates.wizardStep5)
});

module.exports = WizardStep5;