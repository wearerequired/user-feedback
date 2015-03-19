'use strict';

var WizardStep = require('steps/step');
var template = require('templates/step-6');

var WizardStep6 = WizardStep.extend({
  className: 'user-feedback-wizard-step-6',
  template : template(user_feedback.templates.wizardStep6)
});

module.exports = WizardStep6;