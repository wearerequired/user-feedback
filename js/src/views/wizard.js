'use strict';

var WizardStep1 = require('steps/1');
var WizardStep2 = require('steps/2');
var WizardStep3 = require('steps/3');
var WizardStep4 = require('steps/4');
var WizardStep5 = require('steps/5');
var WizardStep6 = require('steps/6');
var userFeedbackModel = require('models/model');

var UserFeedbackWizard = Backbone.View.extend({
  className: 'user-feedback-wizard-view',
  template : _.template('<div class="user-feedback-modal__container"></div>'),

  steps: [
    {
      view: new WizardStep1({model: userFeedbackModel})
    },
    {
      view: new WizardStep2({model: userFeedbackModel})
    },
    {
      view: new WizardStep3({model: userFeedbackModel})
    },
    {
      view: new WizardStep4({model: userFeedbackModel})
    },
    {
      view: new WizardStep5({model: userFeedbackModel})
    },
    {
      view: new WizardStep6({model: userFeedbackModel})
    }
  ],

  initialize: function () {
    _.bindAll(this, 'render');
    this.initialStep = 0;

    _.each(this.steps, function (step) {
      this.listenTo(step.view, 'nextStep', this.goToNextStep);
      this.listenTo(step.view, 'sendData', function () {
        this.trigger('sendData');
      });
    }, this);

    // A logged in user doesn't need to provide his name
    if (user_feedback.user.logged_in) {
      this.initialStep++;
      this.model.set('userName', user_feedback.user.name);
      this.model.set('userEmail', user_feedback.user.email);
    }

    // If the cookie is set, let's go straight to the next step
    if (this.initialStep == 1 && document.cookie.indexOf('user_feedback_do_not_show_again') >= 0) {
      this.initialStep++;
    }

    this.model.set('currentWizardStep', this.initialStep);
  },

  render: function () {
    var currentStep = this.steps[this.model.get('currentWizardStep')];
    this.currentView = currentStep.view;

    this.$el.html(this.currentView.render().el).focus();

    return this;
  },

  events: {
    'click .user-feedback-button-previous': 'previousStep',
    'click .user-feedback-button-next'    : 'nextStep',
    'click .user-feedback-button-close'   : 'closeWizard',
    'click .user-feedback-button-done'    : 'closeWizard',
    'click .user-feedback-button-restart' : 'restartWizard'
  },

  previousStep: function (e) {
    e.preventDefault();
    this.goToPreviousStep();
  },

  nextStep: function (e) {
    e.preventDefault();
    this.goToNextStep();
  },

  closeWizard: function (e) {
    e.preventDefault();
    this.model.set('currentWizardStep', this.initialStep);
    this.trigger('reInitialize');
  },

  restartWizard: function (e) {
    e.preventDefault();
    this.model.set('currentWizardStep', 2);
    this.trigger('toggleBottomBar');
    this.trigger('changeStep', 2);
    this.render();
  },

  goToNextStep: function () {
    if (!this.isLastStep()) {
      var step = this.model.get('currentWizardStep') + 1;
      this.currentView.nextStep();

      // If the cookie is set, let's go straight to the next step
      if (step == 1 && document.cookie.indexOf('user_feedback_do_not_show_again') >= 0) {
        step++;
      }

      this.model.set('currentWizardStep', step);

      // todo: make more flexible
      if (this.model.get('currentWizardStep') == 4) {
        this.trigger('toggleBottomBar');
      }

      this.render();
    }
  },

  goToPreviousStep: function () {
    if (!this.isFirstStep()) {
      if (this.model.get('currentWizardStep') == 4) {
        this.trigger('toggleBottomBar');
      }

      this.model.set('currentWizardStep', this.model.get('currentWizardStep') - 1)
      this.render();
    }
  },

  isFirstStep: function () {
    return (this.model.get('currentWizardStep') == 0);
  },

  isLastStep: function () {
    return (this.model.get('currentWizardStep') == this.steps.length - 1);
  }

});

module.exports = UserFeedbackWizard;