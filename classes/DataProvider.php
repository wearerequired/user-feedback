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
			'ajax_url'    => admin_url( 'admin-ajax.php' ),
			'theme'       => $this->get_theme_data(),
			'user'        => $this->get_user_data(),
			'language'    => $this->get_site_language(),
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
}
