'use strict';

var template = require('templates/bottombar');

var UserFeedbackBar = Backbone.View.extend({
  tagName  : 'div',
  className: 'user-feedback-bottombar-view',
  template : template(user_feedback.templates.bottombar),

  initialize: function () {
    this.model.on("change:currentWizardStep", this.changeStep, this);
  },

  render: function () {
    this.$el.html(this.template);
    this.changeStep();
    return this;
  },

  events: {
    'click .user-feedback-button-help': 'toggleWizard'
  },

  toggleWizard: function () {
    this.trigger('toggleWizard');
  },

  changeStep: function () {
    _.each(this.$el.find('.user-feedback-bar-step'), function (el) {
      if ($(el).attr('data-step') <= this.model.get('currentWizardStep')) {
        $(el).removeClass('hidden');
      } else {
        $(el).addClass('hidden');
      }
    }, this);
  }
});

module.exports = UserFeedbackBar;