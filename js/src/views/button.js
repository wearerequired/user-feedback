'use strict';

var template = require("../templates/button.html");

var UserFeedbackButton = Backbone.View.extend({
  tagName  : 'div',
  className: 'user-feedback-button-view',
  template : template(user_feedback.templates.button),

  render: function () {
    this.$el.html(this.template);
    this.delegateEvents();

    return this;
  },

  events: {
    'click #user-feedback-init-button': 'toggleInitButton',
  },

  toggleInitButton: function () {
    this.trigger('toggleInitButton');
    return this;
  }
});

module.exports = UserFeedbackButton;