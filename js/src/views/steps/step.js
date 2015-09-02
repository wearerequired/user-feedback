'use strict';

var WizardStep = Backbone.View.extend({
	render: function () {
		this.$el.html(this.template);
		this.delegateEvents();

		return this;
	},

	nextStep: function () {
	}
});

module.exports = WizardStep;
