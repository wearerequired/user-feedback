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
		return array(
			/**
			 * Filters additional support data.
			 *
			 * This can be used by plugin to send more information.
			 *
			 * @param array $data Support data.
			 */
			'third_party' => apply_filters( 'user_feedback_support_data', array() ),
			'ajax_url'    => esc_url( add_query_arg( 'action', 'user_feedback_submit', admin_url( 'admin-ajax.php' ) ) ),
			'theme'       => $this->get_theme_data(),
			'user'        => $this->get_user_data(),
			'language'    => $this->get_site_language(),
			'templates'   => $this->get_template_vars(),
		);
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

		return array(
			'name'             => $theme->get( 'Name' ),
			'stylesheet'       => $theme->get_stylesheet(),
			'current_template' => $current_template,
		);
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
			$userdata = (object) array(
				'display_name' => __( 'Anonymous', 'user-feedback' ),
				'user_email'   => '',
			);
		}

		return array(
			'logged_in' => is_user_logged_in(),
			'name'      => $userdata->display_name,
			'email'     => $userdata->user_email,
		);
	}

	/**
	 * Get the template variables for use with `wp_localize_script`.
	 *
	 * @return array Template variables.
	 */
	protected function get_template_vars() {
		return array(
			'button' => array(
				'label' => __( 'Feedback', 'user-feedback' ),
			),
			'bubble' => array(
				'label' => _x( 'Toggle modal', 'screen reader text', 'user-feedback' ),
			),
			'intro'  => array(
				'title'      => _x( 'Feedback', 'modal title', 'user-feedback' ),
				'subtitle'   => __( 'Howdy,', 'user-feedback' ),
				'message'    => __( 'Please let us know what is going on!', 'user-feedback' ),
				'message2'   => __( 'Click on the relevant area and write a message to help us understand your feedback better.', 'user-feedback' ),
				'inputLabel' => __( 'Do not show me this again', 'user-feedback' ),
				'button'     => array(
					'primary'   => __( 'OK, I understand', 'user-feedback' ),
					'close'     => _x( '&times;', 'close button', 'user-feedback' ),
					'closeAria' => _x( 'Close', 'close button title text and aria label', 'user-feedback' ),
				),
			),
			'form'   => array(
				'title'       => _x( 'Feedback', 'modal title', 'user-feedback' ),
				'placeholder' => array(
					'name'    => _x( 'Name (optional)', 'input field placeholder', 'user-feedback' ),
					'email'   => _x( 'Email (optional)', 'input field placeholder', 'user-feedback' ),
					'message' => _x( 'Tell us what we should improve or fix&hellip;', 'textarea placeholder', 'user-feedback' ),
				),
				'button'      => array(
					'primary'   => __( 'Send feedback', 'user-feedback' ),
					'close'     => _x( '&times;', 'close button', 'user-feedback' ),
					'closeAria' => _x( 'Close', 'close button title text and aria label', 'user-feedback' ),
				),
			),
			'done'   => array(
				'title'        => _x( 'Feedback', 'modal title', 'user-feedback' ),
				'subtitle'     => __( 'Successfully sent!', 'user-feedback' ),
				'message'      => __( 'Thanks for taking your time to send us your feedback. We will get back to you as quickly as possible.', 'user-feedback' ),
				'errortitle'   => __( 'Oops, there was an error!', 'user-feedback' ),
				'errormessage' => __( 'Your feedback could not be sent. Please try again!', 'user-feedback' ),
				'button'       => array(
					'primary' => __( 'Done', 'user-feedback' ),
				),
			),
		);
	}
}
