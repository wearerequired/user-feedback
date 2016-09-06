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
	 * Returns the options for this plugin.
	 *
	 * @return array
	 */
	public function get_options() {
		$defaults = array(
			'anonymous' => false,
			'backend'   => false,
			'email'     => '',
		);

		$options = get_option( 'user_feedback_display', $defaults );

		return wp_parse_args( $options, $defaults );
	}

	/**
	 * Returns the value for a single plugin option.
	 *
	 * @since 2.0.0
	 *
	 * @param string $name    Option name.
	 * @param mixed  $default Optional. Default value if the option is empty. Default false.
	 *
	 * @return mixed Option value on success, null if the option does not exist.
	 */
	public function get_option( $name, $default = false ) {
		$options = $this->get_options();

		if ( ! isset( $options[ $name ] ) ) {
			return null;
		}

		if ( '' === $options[ $name ] && false !== $default ) {
			return $default;
		}

		return $options[ $name ];
	}

	/**
	 * Create settings sections and fields.
	 */
	public function add_settings() {
		add_settings_section(
			'user_feedback',
			__( 'User Feedback', 'user-feedback' ),
			'__return_empty_string',
			'general'
		);

		add_settings_field(
			'user_feedback_display',
			__( 'Display Options', 'user-feedback' ),
			array( $this, 'settings_field_display' ),
			'general',
			'user_feedback'
		);

		add_settings_field(
			'user_feedback_email_address',
			sprintf(
				'<label for="user_feedback_email_address">%s</label>',
				__( 'Email Address', 'user-feedback' )
			),
			array( $this, 'settings_field_email' ),
			'general',
			'user_feedback'
		);

		register_setting( 'general', 'user_feedback_display', array( $this, 'sanitize_options' ) );
	}

	/**
	 * Prints the display options form elements.
	 */
	public function settings_field_display() {
		$options = $this->get_options();
		?>
		<p>
			<input <?php checked( $options['anonymous'] ); ?> type="checkbox" value="false" name="user_feedback_display[anonymous]" id="user_feedback_display_anonymous"/>
			<label for="user_feedback_display_anonymous">
				<?php esc_html_e( 'Load for non-logged in users', 'user-feedback' ); ?>
			</label>
		</p>
		<p>
			<input <?php checked( $options['backend'] ); ?> type="checkbox" value="false" name="user_feedback_display[backend]" id="user_feedback_display_backend"/>
			<label for="user_feedback_display_backend">
				<?php esc_html_e( 'Load in the WordPress admin', 'user-feedback' ); ?>
			</label>
		</p>
		<?php
	}

	/**
	 * Prints the email address form elements.
	 */
	public function settings_field_email() {
		$email = $this->get_option( 'email' );
		?>
		<input type="text" value="<?php echo esc_attr( $email ); ?>" name="user_feedback_display[email]" id="user_feedback_email_address" class="regular-text"/>
		<p class="description"><?php _e( 'Email address to send feedback to. If left empty, the admin email address will be used.', 'user-feedback' ); ?></p>
		<?php
	}

	/**
	 * Sanitize the display option.
	 *
	 * @param array $options The POST data.
	 *
	 * @return array The sanitized display option.
	 */
	public function sanitize_options( $options ) {
		$defaults = array(
			'anonymous' => false,
			'backend'   => false,
			'email'     => '',
		);

		if ( ! isset( $options ) ) {
			return array();
		}

		foreach ( $defaults as $key => &$option ) {
			if ( ! isset( $options[ $key ] ) ) {
				continue;
			}

			$option = $options[ $key ];

			switch ( $key ) {
				case 'anonymous':
				case 'backend':
					$option = (bool) $option;
					break;
				case 'email':
					$option = sanitize_email( $option );
					break;
				default:
					$option = sanitize_text_field( $option );
			}
		}

		return $defaults;
	}

	/**
	 * Add settings action link to the plugins page.
	 *
	 * @param array $links Plugin action links.
	 *
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
