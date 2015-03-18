'use strict';

var WizardStep = require('./step.js');
var template = require("../../templates/step-1.html");

var WizardStep1 = WizardStep.extend({
  className: 'user-feedback-wizard-step-1',
  template : template(user_feedback.templates.wizardStep1),

  nextStep: function () {
    this.model.set('userName', $(document.getElementById('user-feedback-user-name')).val());
    this.model.set('userEmail', $(document.getElementById('user-feedback-user-email')).val());
  }

});

module.exports = WizardStep1;