'use strict';

var WizardStep = require('steps/step');
var template = require('templates/step-2');

var WizardStep2 = WizardStep.extend({
	className: 'user-feedback-wizard-step-2',
	template: template(user_feedback.templates.wizardStep2),

	render: function () {
		this.$el.html(this.template);
		this.delegateEvents();

		var name = ( this.model.get('userName') !== '' ) ? this.model.get('userName') : user_feedback.user.name;
		this.$el.find('p:first-of-type').append(name);

		return this;
	},

	nextStep: function () {
		this.model.set('doNotShowInfoAgain', jQuery(document.getElementById('user-feedback-do-not-show-again')).is(":checked"));
	}
});

module.exports = WizardStep2;
