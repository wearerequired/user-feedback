'use strict';

var WizardStep = require('steps/step');
var template = require('templates/step-4');

var WizardStep4 = WizardStep.extend({
	className: 'user-feedback-wizard-step-4',
	template: template(user_feedback.templates.wizardStep4),

	render: function () {
		this.$el.html(this.template);
		this.delegateEvents();

		this.fillInTheData();

		return this;
	},

	fillInTheData: function () {
		var email = ( this.model.get('userEmail') !== '' ) ? this.model.get('userEmail') : user_feedback.user.email;
		var name = ( this.model.get('userName') !== '' ) ? this.model.get('userName') : user_feedback.user.name;

		var $userContainer = this.$el.find('#user-feedback-overview-user');

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
		this.model.set('userMessage', this.$el.find('#user-feedback-overview-note').val());
		this.trigger('sendData');
	}
});

module.exports = WizardStep4;
