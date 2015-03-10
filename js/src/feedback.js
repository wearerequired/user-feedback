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

      return this;
    },

    events: {
      'click #user-feedback-init-button': 'toggleInitButton',
    },

    toggleInitButton: function () {
      this.toggle();
      this.model.set('toggleInitButton', true)

      return this;
    },

    toggle: function () {
      this.$el.toggleClass('hidden');

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
      this.model.set('showWizard', ( this.model.get('initWizard' ) ) ? false : true );
    }
  });

  // Create the view for our wizard
  var UserFeedbackWizard = Backbone.Modal.extend({
    tagName  : 'div',
    className: 'user-feedback-wizard-view',
    template : _.template(document.getElementById('user-feedback-template-modal').innerHTML),

    viewContainer: '.user-feedback-modal__container',
    submitEl     : '.user-feedback-button-done',
    cancelEl     : '.user-feedback-button-cancel',

    views: {
      'click #step1': {
        // Somehow it doesn't work with only one call to _.template()
        view: _.template(_.template(
            document.getElementById('user-feedback-template-wizard-step-1').innerHTML,
            user_feedback.templates.wizardStep1
        ))
      },
      'click #step2': {
        view: _.template(_.template(
            document.getElementById('user-feedback-template-wizard-step-2').innerHTML,
            user_feedback.templates.wizardStep2
        ))
      }
    },

    events: {
      'click .user-feedback-button-previous': 'previousStep',
      'click .user-feedback-button-next'    : 'nextStep'
    },

    previousStep: function (e) {
      e.preventDefault();
      this.previous();
    },

    nextStep: function (e) {
      e.preventDefault();
      this.next();
    },

    toggle: function () {
      this.$el.toggleClass('hidden');

      return this;
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
    },

    render: function () {
      if ( ! this.model.get('toggleInitButton') ) {
        this.$el.html(this.initButton.render().el);
      } else {
        this.$el.empty().append(this.bottomBar.render().el).append(this.wizard.render().el);
      }
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