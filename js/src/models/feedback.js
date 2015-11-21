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
				user              : user_feedback.user,
				message           : '',
				theme             : user_feedback.theme,
				browser           : {
					cookieEnabled: navigator.cookieEnabled,
					platform     : navigator.platform,
					userAgent    : navigator.userAgent,
					languages    : window.navigator.languages || [ window.navigator.language || window.navigator.userLanguage ],
				},
				url               : document.URL,
				language          : user_feedback.language,
				thirdParty        : user_feedback.third_party,
				screenshot        : '',
				doNotShowInfoAgain: document.cookie.indexOf( 'user_feedback_do_not_show_again' ) >= 0
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
		},

		/**
		 * Return a shallow copy of the model's attributes for JSON stringification.
		 *
		 * Removes the `doNotShowInfoAgain` attribute as it is not needed.
		 *
		 * @returns {*}
		 */
		toJSON: function () {
			var attributes = this.attributes;
			delete attributes.doNotShowInfoAgain;

			return attributes;
		}
	}
);

module.exports = Feedback;
