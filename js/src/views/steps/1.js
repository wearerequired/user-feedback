'use strict';

var WizardStep = require('steps/step');
var template = require('templates/step-1');

var WizardStep1 = WizardStep.extend({
  className: 'user-feedback-wizard-step-1',
  template : template(user_feedback.templates.wizardStep1),

  nextStep: function () {
    this.model.set('userName', jQuery(document.getElementById('user-feedback-user-name')).val());
    this.model.set('userEmail', jQuery(document.getElementById('user-feedback-user-email')).val());
  }

});

module.exports = WizardStep1;