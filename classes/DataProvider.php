<?php
/**
 * Holds the data provider.
 *
 * @package Required\User_Feedback
 */

namespace Required\User_Feedback;

/**
 * Provider of all the data sent in the background.
 */
class DataProvider {
	/**
	 * Get the support data used by wp_localize_script().
	 *
	 * @return array Support data.
	 */
	public function get_data() {
		return [
			/**
			 * Filters additional support data.
			 *
			 * This can be used by plugin to send more information.
			 *
			 * @param array $data Support data.
			 */
			'third_party' => apply_filters( 'user_feedback_support_data', [] ),
			'ajax_url'    => esc_url( add_query_arg( 'action', 'user_feedback_submit', admin_url( 'admin-ajax.php' ) ) ),
			'theme'       => $this->get_theme_data(),
			'user'        => $this->get_user_data(),
			'language'    => $this->get_site_language(),
			'settings'    => $this->get_app_settings(),
			'templates'   => $this->get_template_vars(),
		];
	}

	/**
	 * Get the current language.
	 *
	 * Uses the WordPress locale setting, but also checks for WPML and Polylang.
	 *
	 * @return string
	 */
	protected function get_site_language() {
		$language = get_bloginfo( 'language' );

		if ( defined( 'ICL_LANGUAGE_CODE' ) ) {
			$language = ICL_LANGUAGE_CODE;
		}

		if ( function_exists( 'pll_current_language' ) ) {
			$language = pll_current_language( 'slug' );
		}

		/**
		 * Filters the displayed site language.
		 *
		 * @param string $language Site language.
		 */
		return apply_filters( 'user_feedback_site_language', $language );
	}

	/**
	 * Get theme data.
	 *
	 * Store the theme's name and the currently used template, e.g. index.php
	 *
	 * @return array Theme name stylesheet name and current template.
	 */
	protected function get_theme_data() {
		$theme = wp_get_theme();
		global $template;
		$current_template = basename( str_replace( $theme->get_theme_root() . '/' . $theme->get_stylesheet() . '/', '', $template ) );

		return [
			'name'             => $theme->get( 'Name' ),
			'stylesheet'       => $theme->get_stylesheet(),
			'current_template' => $current_template,
		];
	}

	/**
	 * Get current user data.
	 *
	 * If the user isn't logged in, a fake object is created.
	 *
	 * @return array User display name and email address.
	 */
	protected function get_user_data() {
		$userdata = get_userdata( get_current_user_id() );

		if ( ! $userdata ) {
			$userdata = (object) [
				'display_name' => __( 'Anonymous', 'user-feedback' ),
				'user_email'   => '',
			];
		}

		return [
			'logged_in' => is_user_logged_in(),
			'name'      => $userdata->display_name,
			'email'     => $userdata->user_email,
		];
	}

	/**
	 * Returns settings for the JS, such as if the screen should be captured or not.
	 *
	 * @return array Settings.
	 */
	protected function get_app_settings() {
		return [
			'screen_capture' => true,
			'is_rtl'         => is_rtl(),
		];
	}

	/**
	 * Get the template variables for use with `wp_localize_script`.
	 *
	 * @return array Template variables.
	 */
	protected function get_template_vars() {
		return [
			'button' => [
				'label'     => __( 'Feedback', 'user-feedback' ),
				'labelAria' => __( 'Leave feedback', 'user-feedback' ),
			],
			'bubble' => [
				/* translators: assistive text */
				'label' => __( 'Toggle modal', 'user-feedback' ),
			],
			'intro'  => [
				/* translators: modal title */
				'title'      => __( 'Feedback', 'user-feedback' ),
				'subtitle'   => __( 'Howdy,', 'user-feedback' ),
				'message'    => __( 'Please let us know what is going on!', 'user-feedback' ),
				'message2'   => __( 'Click on the relevant area and write a message to help us understand your feedback better.', 'user-feedback' ),
				'inputLabel' => __( 'Do not show me this again', 'user-feedback' ),
				'button'     => [
					'primary'   => __( 'OK, I understand', 'user-feedback' ),
					/* translators: close button */
					'close'     => __( '&times;', 'user-feedback' ),
					'closeAria' => __( 'Close feedback form', 'user-feedback' ),
				],
			],
			'form'   => [
				/* translators: modal title */
				'title'       => __( 'Feedback', 'user-feedback' ),
				'placeholder' => [
					/* translators: input field placeholder */
					'name'    => __( 'Name (optional)', 'user-feedback' ),
					/* translators: input field placeholder */
					'email'   => __( 'Email (optional)', 'user-feedback' ),
					/* translators: input field placeholder */
					'message' => __( 'Tell us what we should improve or fix&hellip;', 'user-feedback' ),
				],
				'button'      => [
					'primary'   => __( 'Send feedback', 'user-feedback' ),
					/* translators: close button */
					'close'     => __( '&times;', 'user-feedback' ),
					'closeAria' => __( 'Close feedback form', 'user-feedback' ),
				],
			],
			'done'   => [
				/* translators: modal title */
				'title'        => __( 'Feedback', 'user-feedback' ),
				'subtitle'     => __( 'Successfully sent!', 'user-feedback' ),
				'message'      => __( 'Thanks for taking your time to send us your feedback. We will get back to you as quickly as possible.', 'user-feedback' ),
				'errortitle'   => __( 'Oops, there was an error!', 'user-feedback' ),
				'errormessage' => __( 'Your feedback could not be sent. Please try again!', 'user-feedback' ),
				'button'       => [
					'primary' => __( 'Done', 'user-feedback' ),
				],
			],
		];
	}
}
