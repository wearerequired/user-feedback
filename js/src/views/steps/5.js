'use strict';

var WizardStep = require('./step.js');
var template = require("../../templates/step-5.html");

/**
 * Detect browser name + version. Example: Chrome 40, Internet Explorer 12.
 *
 * A utility function we need later on.
 *
 * @see http://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
 */
navigator.saysWho = (function () {
  var ua = navigator.userAgent, tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'Internet Explorer ' + (tem[1] || '');
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR\/(\d+)/)
    if (tem != null) return 'Opera ' + tem[1];
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
  return M.join(' ');
})();

var WizardStep5 = WizardStep.extend({
  className: 'user-feedback-wizard-step-5',
  template : template(user_feedback.templates.wizardStep5),

  render: function () {
    this.$el.html(this.template);
    this.delegateEvents();

    this.fillInTheData();

    return this;
  },

  fillInTheData: function () {
    var email = ( this.model.get('userEmail') != '' ) ? this.model.get('userEmail') : user_feedback.user.email;
    var name = ( this.model.get('userName') != '' ) ? this.model.get('userName') : user_feedback.user.name;
    this.$el.find('#user-feedback-overview-user img').attr('src', 'https://secure.gravatar.com/avatar/' + md5(email) + '?d=monsterid&s=90');
    this.$el.find('#user-feedback-overview-user div').append(name);
    this.$el.find('#user-feedback-overview-note').val(this.model.get('userMessage'));

    this.$el.find('#user-feedback-additional-theme').append(user_feedback.theme.name);
    this.$el.find('#user-feedback-additional-browser').append(navigator.saysWho);
    this.$el.find('#user-feedback-additional-template').append(user_feedback.theme.current_template);
    this.$el.find('#user-feedback-additional-language').append(user_feedback.language);

    var screenshot = ( this.model.get('userScreenshot') ) ? this.model.get('userScreenshot') : '';
    this.$el.find('#user-feedback-overview-screenshot-img').attr('src', screenshot);
  },

  nextStep: function () {
    this.trigger('sendData');
  }
});

module.exports = WizardStep5;