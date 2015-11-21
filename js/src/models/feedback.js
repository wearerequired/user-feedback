'use strict';

var Feedback = Backbone.Model.extend(
	{
		initialize: function () {
			this.set( 'doNotShowInfoAgain', document.cookie.indexOf( 'user_feedback_do_not_show_again' ) >= 0 );
		}
	}
);

module.exports = Feedback;
