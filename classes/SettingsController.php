<?php
/**
 * Holds the admin settings controller.
 *
 * @package Required\User_Feedback
 */

namespace Required\User_Feedback;

/**
 * Admin settings controller.
 */
class SettingsController {
	/**
	 * Returns the display options for this plugin.
	 *
	 * @return array
	 */
	public function get_display_options() {
		$defaults = array(
			'anonymous' => false,
			'backend'   => false,
		);
		$options  = get_option( 'user_feedback_display', $defaults );

		return wp_parse_args( $options, $defaults );
	}

	/**
	 * Create settings sections and fields.
	 */
	public function add_settings() {
		add_settings_section(
			'user_feedback',
			__( 'User Feedback', 'user-feedback' ),
			function () {
				esc_html_e( 'Configure where the User Feedback tool should be loaded.', 'user-feedback' );
			},
			'general'
		);

		add_settings_field(
			'user_feedback_display',
			__( 'Display Options', 'user-feedback' ),
			array( $this, 'settings_field_display' ),
			'general',
			'user_feedback'
		);

		register_setting( 'general', 'user_feedback_display', array( $this, 'sanitize_display_option' ) );
	}

	/**
	 * Settings field callback that prints the actual input fields.
	 */
	public function settings_field_display() {
		$options = $this->get_display_options();
		?>
		<p>
			<input <?php checked( $options['anonymous'] ); ?> type="checkbox" value="false"
			                                                  name="user_feedback_display[anonymous]"
			                                                  id="user_feedback_display_anonymous"/>
			<label for="user_feedback_display_anonymous">
				<?php esc_html_e( 'Load for non-logged in users', 'user-feedback' ); ?>
			</label>
		</p>
		<p>
			<input <?php checked( $options['backend'] ); ?> type="checkbox" value="false"
			                                                name="user_feedback_display[backend]"
			                                                id="user_feedback_display_backend"/>
			<label for="user_feedback_display_backend">
				<?php esc_html_e( 'Load in the WordPress admin', 'user-feedback' ); ?>
			</label>
		</p>
		<?php
	}

	/**
	 * Sanitize the display option.
	 *
	 * @param array $options The POST data.
	 *
	 * @return array The sanitized display option.
	 */
	public function sanitize_display_option( $options ) {
		$defaults = array(
			'anonymous' => false,
			'backend'   => false,
		);

		if ( ! isset( $options ) ) {
			return array();
		}

		foreach ( $options as $key => $option ) {
			$defaults[ $key ] = (bool) $option;
		}

		return $defaults;
	}

	/**
	 * Add settings action link to the plugins page.
	 *
	 * @param array $links Plugin action links.
	 * @return array The modified plugin action links
	 */
	public function plugin_action_links( array $links ) {
		return array_merge(
			array(
				'settings' => sprintf(
					'<a href="%s">%s</a>',
					esc_url( admin_url( 'options-general.php' ) ),
					__( 'Settings', 'user-feedback' )
				),
			),
			$links
		);
	}
}
