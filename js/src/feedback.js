/* global jQuery, user_feedback, Backbone, _ */

/**
 * Feedback.js Script.
 *
 * @package   User_Feedback
 * @author    Pascal Birchler <pascal@required.ch>
 * @license   GPL-2.0+
 * @link      https://github.com/wearerequired/user-feedback/
 * @copyright 2015 required gmbh
 */

var UserFeedback = (function (Backbone, $) {

  // Create the model class via Backbone (which sets up things like prototype objects correctly).
  var UserFeedbackModel = Backbone.Model.extend({});
  var userFeedbackModel = new UserFeedbackModel;

  // This is our container
  var userFeedBackContainer = $(document.getElementById('user-feedback-container'));

  // Create the view for our feedback button
  var UserFeedbackButton = Backbone.View.extend({
    tagName  : 'div',
    className: 'user-feedback-button-view',
    template : _.template(
        document.getElementById('user-feedback-template-button').innerHTML,
        user_feedback.templates.button
    ),

    initialize: function () {
    },

    render: function () {
      this.$el.html(this.template);
      this.delegateEvents();

      return this;
    },

    events: {
      'click #user-feedback-init-button': 'toggleInitButton',
    },

    toggleInitButton: function () {
      this.model.set('toggleInitButton', true)
      return this;
    }
  });

  // Create the view for our bottom bar
  var UserFeedbackBar = Backbone.View.extend({
    tagName  : 'div',
    className: 'user-feedback-bottombar-view',
    template : _.template(
        document.getElementById('user-feedback-template-bottombar').innerHTML,
        user_feedback.templates.bottombar
    ),

    initialize: function () {
      this.model.set('showWizard', true);
    },

    render: function () {
      this.$el.html(this.template);
      return this;
    },

    events: {
      'click .user-feedback-button-help': 'showWizard'
    },

    showWizard: function () {
      this.model.set('showWizard', ( this.model.get('initWizard') ) ? false : true);
    }
  });

  // Create the views for our wizard
  var WizardStep1 = Backbone.View.extend({
    tagName  : 'div',
    className: 'user-feedback-wizard-step-1',
    template : _.template(
        document.getElementById('user-feedback-template-wizard-step-1').innerHTML,
        user_feedback.templates.wizardStep1
    ),

    render: function () {
      this.$el.html(this.template);
      this.delegateEvents();

      return this;
    },

    events: {
      'click .user-feedback-button-previous': 'previousStep',
      'click .user-feedback-button-next'    : 'nextStep',
      'click .user-feedback-button-close'   : 'closeWizard'
    },

    previousStep: function (e) {
      e.preventDefault();
      this.model.set('previousStep', this.model.get('previousStep') + 1);
    },

    nextStep: function (e) {
      e.preventDefault();
      this.model.set('nextStep', this.model.get('nextStep') + 1);
    },

    closeWizard: function (e) {
      e.preventDefault();
      this.model.set('closeWizard', true);
    }
  });

  var WizardStep2 = WizardStep1.extend({
    className: 'user-feedback-wizard-step-2',
    template : _.template(
        document.getElementById('user-feedback-template-wizard-step-2').innerHTML,
        user_feedback.templates.wizardStep2
    ),

    nextStep: function (e) {
      e.preventDefault();
      this.model.set('doNotShowInfoAgain', $(document.getElementById('user-feedback-do-not-show-again')).val());
      this.model.set('nextStep', this.model.get('nextStep') + 1);
    },

  });

  var WizardStep3 = WizardStep1.extend({
    tagName  : 'div',
    className: 'user-feedback-wizard-step-3',
    template : _.template(
        document.getElementById('user-feedback-template-wizard-step-3').innerHTML,
        user_feedback.templates.wizardStep3
    )
  });

  var WizardStep4 = WizardStep1.extend({
    tagName  : 'div',
    className: 'user-feedback-wizard-step-4',
    template : _.template(
        document.getElementById('user-feedback-template-wizard-step-4').innerHTML,
        user_feedback.templates.wizardStep4
    )
  });

  var WizardStep5 = WizardStep1.extend({
    tagName  : 'div',
    className: 'user-feedback-wizard-step-5',
    template : _.template(
        document.getElementById('user-feedback-template-wizard-step-5').innerHTML,
        user_feedback.templates.wizardStep5
    )
  });

  var WizardStep6 = WizardStep1.extend({
    tagName  : 'div',
    className: 'user-feedback-wizard-step-6',
    template : _.template(
        document.getElementById('user-feedback-template-wizard-step-6').innerHTML,
        user_feedback.templates.wizardStep6
    )
  });

  var UserFeedbackWizard = Backbone.View.extend({
    tagName  : 'div',
    className: 'user-feedback-wizard-view',
    template : _.template(document.getElementById('user-feedback-template-modal').innerHTML),

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

    events: {},

    initialize: function () {
      _.bindAll(this, 'render');
      this.currentStep = 0;

      this.model.set('previousStep', 0);
      this.model.set('nextStep', 0);

      this.model.on('change:previousStep', this.prevStep /* function to call */, this);
      this.model.on('change:nextStep', this.nextStep /* function to call */, this);
      this.model.on('change:closeWizard', this.restart, this);
    },

    render: function () {
      /*_.each(this.steps, _.bind(function (step) {
       this.$el.append(step.view.render().el);
       }, this));*/

      this.renderCurrentStep();

      return this;
    },

    restart: function () {
      this.currentStep = 0;
    },

    renderCurrentStep: function () {
      var currentStep = this.steps[this.currentStep];
      this.currentView = currentStep.view;

      this.$el.html(this.currentView.render().el);
    },

    nextStep: function () {
      if (!this.isLastStep()) {
        this.currentStep += 1;
        this.renderCurrentStep();
      }
    },

    prevStep: function () {
      if (!this.isFirstStep()) {
        this.currentStep -= 1;
        this.renderCurrentStep();
      }
    },

    isFirstStep: function () {
      return (this.currentStep == 0);
    },

    isLastStep: function () {
      return (this.currentStep == this.steps.length - 1);
    }

  });

  var AppView = Backbone.View.extend({
    el: '#user-feedback-container',

    initialize: function () {
      this.supportedBrowser = !!window.HTMLCanvasElement
      this.initButton = new UserFeedbackButton({model: userFeedbackModel});
      this.bottomBar = new UserFeedbackBar({model: userFeedbackModel});
      this.wizard = new UserFeedbackWizard({model: userFeedbackModel});

      this.model.on('change:toggleInitButton', this.render /* function to call */, this);
      this.model.on('change:closeWizard', this.restart /* function to call */, this);
    },

    render: function () {
      this.$el.empty();

      if (!this.model.get('toggleInitButton')) {
        this.$el.append(this.initButton.render().el);
      } else {
        this.$el.append(this.bottomBar.render().el).append(this.wizard.render().el);
      }
    },

    restart: function () {
      this.model.unset('toggleInitButton'); // this triggers a re-rendering
    }
  });

  var appView = new AppView({model: userFeedbackModel});

  return {
    app : appView,
    init: function () {
      appView.render();
    }
  };

})(Backbone, jQuery);

jQuery(function ($, undefined) {
  UserFeedback.init();
});