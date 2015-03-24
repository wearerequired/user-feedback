'use strict';

var userFeedbackModel = require('models/model');

// Create the view for our feedback button
var UserFeedbackButton = require('views/button');

// Create the view for the bar at the bottom of the screen
var UserFeedbackBar = require('views/bottombar');

// Wizard view that holds the individual view for each step
var UserFeedbackWizard = require('views/wizard');

var AppView = Backbone.View.extend({
  el: '#user-feedback-container',

  initialize: function () {
    this.showInitButton = true;
    this.initButton = new UserFeedbackButton({model: userFeedbackModel});
    this.listenTo(this.initButton, 'toggleInitButton', this.toggleInitButton, this);

    this.showBottomBar = true;
    this.bottomBar = new UserFeedbackBar({model: userFeedbackModel});
    this.listenTo(this.bottomBar, 'toggleBottomBar', this.toggleBottomBar, this);
    this.listenTo(this.bottomBar, 'toggleWizard', this.toggleWizard, this);

    this.showWizard = true;
    this.wizard = new UserFeedbackWizard({model: userFeedbackModel});
    this.listenTo(this.wizard, 'toggleBottomBar', this.toggleBottomBar, this);
    this.listenTo(this.wizard, 'reInitialize', this.reInitialize, this);
    this.listenTo(this.wizard, 'sendData', this.send, this);
  },

  events: {
    'keydown': 'keydownHandler'
  },

  keydownHandler: function (e) {
    if (!e.keyCode || e.keyCode === 27) {
      this.reInitialize();
    }
  },

  toggleInitButton: function () {
    this.showInitButton = !this.showInitButton;
    this.render();
  },

  toggleBottomBar: function () {
    this.showBottomBar = !this.showBottomBar;
    this.render();
  },

  toggleWizard: function () {
    this.showWizard = !this.showWizard;
    this.render();
  },

  reInitialize: function () {
    this.showWizard = true;
    this.showBottomBar = true;
    this.showInitButton = true;
    this.render();
  },

  render: function () {
    this.$el.children().detach();

    this.$el.removeAttr('tabindex');

    // Render our button if it's not toggled or else the wizard
    if (this.showInitButton) {
      this.$el.append(this.initButton.render().el);
    } else {
      if (this.showBottomBar) {
        this.$el.append(this.bottomBar.render().el)
      }

      if (this.showWizard) {
        this.$el.append(this.wizard.render().el);
      }

      this.$el.attr('tabindex', 0);
      this.$el.focus();
    }

    return this;
  },

  // Here we send all the data to WordPress
  send: function () {
    if (this.model.get('doNotShowInfoAgain') === true) {
      // Set our "do not show again" cookie
      var date = new Date();
      date.setDate(date.getDate() + 30);
      document.cookie = 'user_feedback_do_not_show_again=1; path=/;expires=' + date.toUTCString();
    }

    // Set up initial post data to be sent
    var post = {};
    post.browser = {};
    post.browser.name = navigator.sayswho;
    post.browser.cookieEnabled = navigator.cookieEnabled;
    post.browser.platform = navigator.platform;
    post.browser.userAgent = navigator.userAgent;
    post.url = document.URL;
    post.theme = user_feedback.theme;
    post.language = user_feedback.language;
    post.message = this.model.get('userMessage');
    post.img = this.model.get('userScreenshot');
    post.user = {
      name : this.model.get('userName'),
      email: this.model.get('userEmail')
    };

    jQuery.post(
        user_feedback.ajax_url,
        {
          'action': 'user_feedback',
          'data'  : post
        }
    )
        .done(function () {
          // todo: success view
          // this.model.set(...);
        })
        .fail(function () {
          // todo: failure view
        });
  }
});

module.exports = AppView;