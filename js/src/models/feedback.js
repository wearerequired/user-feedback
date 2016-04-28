'use strict';

/**
 * Feedback model.
 *
 * @type Backbone.Model
 */
var Feedback = Backbone.Model.extend(
	{
		/**
		 * Returns the model's defaults.
		 *
		 * @returns object
		 */
		defaults: function () {
			return {
				browser:            {
					cookieEnabled: navigator.cookieEnabled,
					platform:      navigator.platform,
					userAgent:     navigator.userAgent,
					languages:     window.navigator.languages || [ window.navigator.language || window.navigator.userLanguage ],
				},
				doNotShowInfoAgain: document.cookie.indexOf( 'user_feedback_do_not_show_again' ) >= 0,
				language:           user_feedback.language,
				message:            '',
				screenshot:         '',
				theme:              user_feedback.theme,
				thirdParty:         user_feedback.third_party,
				url:                document.URL,
				user:               user_feedback.user
			};
		},

		url: user_feedback.ajax_url + '?action=user_feedback_submit',

		/**
		 * Model constructor.
		 */
		initialize: function () {
			this.on( 'change:doNotShowInfoAgain', this.setCookie );
		},

		/**
		 * Set a cookie for 30 days if the "Do not show me this again"
		 * option was checked.
		 *
		 * @param model This model.
		 * @param value The 'doNotShowInfoAgain' value.
		 */
		setCookie: function ( model, value ) {
			var date = new Date();

			if ( true === value ) {
				date.setDate( date.getDate() + 30 );
				document.cookie = 'user_feedback_do_not_show_again=1; path=/;expires=' + date.toUTCString();
			}
		}
	}
);

module.exports = Feedback;
