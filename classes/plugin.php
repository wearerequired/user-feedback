<?php
/**
 * Main plugin file.
 *
 * @package User_Feedback
 */

defined( 'WPINC' ) or die;

/**
 * Main class responsible for the whole plugin.
 */
class User_Feedback_Plugin extends WP_Stack_Plugin2 {

	/**
	 * Instance of this class.
	 *
	 * @var self
	 */
	protected static $instance;

	/**
	 * Plugin version.
	 */
	const VERSION = '1.1.0';

	/**
	 * Constructs the object, hooks in to `plugins_loaded`.
	 */
	protected function __construct() {
		$this->hook( 'plugins_loaded', 'add_hooks' );
	}

	/**
	 * Adds hooks.
	 */
	public function add_hooks() {
		$this->hook( 'init' );

		// Support third-party plugins.
		$this->hook( 'user_feedback_init' );

		// Settings screen.
		$this->hook( 'admin_init', 'add_settings' );

		// Load the scripts & styles.
		$this->hook( 'wp_enqueue_scripts', 'enqueue_scripts' );
		$this->hook( 'wp_footer', 'print_templates' );

		$this->hook( 'admin_enqueue_scripts', 'enqueue_scripts' );
		$this->hook( 'admin_footer', 'print_templates' );

		// Ajax callbacks.
		$this->hook( 'wp_ajax_user_feedback_submit', 'ajax_submit' );
		$this->hook( 'wp_ajax_nopriv_user_feedback_submit', 'ajax_submit' );

		$this->hook( 'wp_ajax_user_feedback_avatar', 'ajax_avatar' );
		$this->hook( 'wp_ajax_nopriv_user_feedback_avatar', 'ajax_avatar' );

		// Send feedback emails.
		$this->hook( 'user_feedback_received', 'process_feedback' );
	}

	/**
	 * Initializes the plugin, registers textdomain, etc.
	 */
	public function init() {
		$this->load_textdomain( 'user-feedback', '/languages' );
	}

	/**
	 * Ajax callback for avatar request
	 */
	public function ajax_avatar() {
		$email = isset( $_GET['email'] ) ? $_GET['email'] : '';
		die( get_avatar( sanitize_email( $email ), 40 ) );
	}

	/**
	 * Ajax callback for user feedback.
	 */
	public function ajax_submit() {
		if ( ! isset( $_POST['data'] ) ) {
			die( 0 );
		}

		$img = ( isset ( $_POST['data']['img'] ) ) ? $this->save_temp_image( (string) $_POST['data']['img'] ) : false;
		if ( $img ) {
			unset( $_POST['data']['img'] );
		}

		/**
		 * This action is run whenever there's new user feedback.
		 *
		 * The variable contains all the data received via the ajax request.
		 *
		 * @param array       $feedback          {
		 *
		 * @type array        $browser           Contains useful browser information like user agent, platform, and online status.
		 * @type string       $url               The URL from where the user submitted the feedback.
		 * @type string       $theme             The active theme.
		 * @type string       $site_language     Current language setting of WordPress (or any multilingual plugin).
		 * @type string       $browser_languages Current language setting of the visitor.
		 * @type string       $third_party       Any data added by third party plugins.
		 * @type string       $message           Additional notes from the user.
		 * @type string       $img               Base64 encoded screenshot of the page.
		 * @type string       $user              Name and email address of the user (if provided).
		 * }
		 *
		 * @param string|bool $img               Temporary file name of the screenshot or false if saving wasn't possible.
		 */
		do_action( 'user_feedback_received', $_POST['data'], $img );

		die( 1 );
	}

	/**
	 * Save the submitted image as a temporary file.
	 *
	 * @param string $img Base64 encoded image.
	 *
	 * @return bool|string File name on success, false on failure.
	 */
	public function save_temp_image( $img ) {
		// Strip the "data:image/png;base64," part and decode the image.
		$img = explode( ',', $img );
		$img = isset( $img[1] ) ? base64_decode( $img[1] ) : base64_decode( $img[0] );

		if ( ! $img ) {
			return false;
		}

		// Upload to tmp folder.
		$filename = 'user-feedback-' . date( 'Y-m-d-H-i' );
		$tempfile = wp_tempnam( $filename );

		if ( ! $tempfile ) {
			return false;
		}

		// WordPress adds a .tmp file extension, but we want .png.
		if ( rename( $tempfile, $filename . '.png' ) ) {
			$tempfile = $filename . '.png';
		}

		if ( ! WP_Filesystem( request_filesystem_credentials( '' ) ) ) {
			return false;
		}

		/**
		 * WordPress Filesystem API.
		 *
		 * @var WP_Filesystem_Base $wp_filesystem
		 */
		global $wp_filesystem;
		$success = $wp_filesystem->put_contents(
			$tempfile,
			$img
		);

		if ( ! $success ) {
			return false;
		}

		return $tempfile;
	}

	/**
	 * This function runs whenever new feedback is submitted.
	 *
	 * What it does:
	 * - uploading the image in the WordPress uploads folder
	 * - store the feedback as a custom post
	 * - send an email to the admin
	 *
	 * @param array       $feedback Feedback data.
	 * @param string|bool $img      Temporary file name of the screenshot or false if saving wasn't possible.
	 */
	public function process_feedback( $feedback, $img ) {

		$attachments = array();
		if ( $img ) {
			$attachments[] = $img;
		}

		$user_name  = sanitize_text_field( $feedback['user']['name'] );
		$user_email = sanitize_email( $feedback['user']['email'] );

		if ( empty( $user_name ) ) {
			$user_name = __( 'Anonymous', 'user-feedback' );
		}

		if ( empty( $user_email ) ) {
			$user_email = __( '(not provided)', 'user-feedback' );
		}

		$user_message = sanitize_text_field( $feedback['message'] );
		$visited_url  = esc_url( $feedback['url'] );

		$cookies_enabled = (bool) $feedback['browser']['cookieEnabled'] ? __( 'Yes', 'user-feedback' ) : __( 'No', 'user-feedback' );

		$message = __( 'Howdy,', 'user-feedback' ) . "\r\n\r\n";
		$message .= __( 'You just received a new user feedback regarding your website!', 'user-feedback' ) . "\r\n\r\n";
		$message .= sprintf( __( 'Name: %s', 'user-feedback' ), $user_name ) . "\r\n";
		$message .= sprintf( __( 'Email: %s', 'user-feedback' ), $user_email ) . "\r\n";
		$message .= sanitize_text_field( sprintf( __( 'Browser: %s (%s)', 'user-feedback' ), $feedback['browser']['name'], $feedback['browser']['userAgent'] ) ) . "\r\n";
		$message .= sprintf( __( 'Cookies enabled: %s', 'user-feedback' ), $cookies_enabled ) . "\r\n";
		$message .= sprintf( __( 'Visited URL: %s', 'user-feedback' ), $visited_url ) . "\r\n";
		$message .= sprintf( __( 'Site Language: %s', 'user-feedback' ), sanitize_text_field( $feedback['language'] ) ) . "\r\n";
		$message .= sprintf( __( 'User Languages: %s', 'user-feedback' ), sanitize_text_field( implode( ', ', $feedback['browser']['languages'] ) ) ) . "\r\n";
		$message .= __( 'Additional Notes:', 'user-feedback' ) . "\r\n";
		$message .= $user_message . "\r\n\r\n";
		$message .= __( 'A screenshot of the visited page is attached.', 'user-feedback' ) . "\r\n";

		// Send email to the blog admin.
		$recipient     = apply_filters( 'user_feedback_email_address', get_option( 'admin_email' ) );
		$subject       = apply_filters( 'user_feedback_email_subject',
			sprintf( __( '[%s] New User Feedback', 'user-feedback' ), get_bloginfo( 'name' ) )
		);
		$email_message = apply_filters( 'user_feedback_email_message', $message, $feedback );

		$success = wp_mail( $recipient, $subject, $email_message, '', $img );

		do_action_ref_array( 'user_feedback_email_sent', array(
			'to'         => $recipient,
			'subject'    => $subject,
			'message'    => $email_message,
			'attachment' => $img,
			'feedback'   => $feedback,
			'success'    => $success,
		) );

		if ( ! is_email( $user_email ) ) {
			return;
		}

		$message = __( 'Howdy,', 'user-feedback' ) . "\r\n\r\n";
		$message .= __( 'We just received the following feedback from you and will get in touch shortly. Thank you.', 'user-feedback' ) . "\r\n\r\n";
		$message .= sprintf( __( 'Name: %s', 'user-feedback' ), $user_name ) . "\r\n";
		$message .= sprintf( __( 'Email: %s', 'user-feedback' ), $user_email ) . "\r\n";
		$message .= sprintf( __( 'Browser: %s', 'user-feedback' ), sanitize_text_field( $feedback['browser']['name'] ) ) . "\r\n";
		$message .= sprintf( __( 'Visited URL: %s', 'user-feedback' ), $visited_url ) . "\r\n";
		$message .= __( 'Additional Notes:', 'user-feedback' ) . "\r\n";
		$message .= $user_message . "\r\n\r\n";
		$message .= __( 'A screenshot of the visited page is attached.', 'user-feedback' ) . "\r\n";

		// Send email to the submitting user.
		$recipient     = apply_filters( 'user_feedback_email_copy_address', $user_email );
		$subject       = apply_filters( 'user_feedback_email_copy_subject',
			sprintf( __( '[%s] Your Feedback', 'user-feedback' ), get_bloginfo( 'name' ) )
		);
		$email_message = apply_filters( 'user_feedback_email_copy_message', $message, $feedback );

		$success = wp_mail( $recipient, $subject, $email_message, '', $img );

		do_action_ref_array( 'user_feedback_email_copy_sent', array(
			'to'         => $recipient,
			'subject'    => $subject,
			'message'    => $email_message,
			'attachment' => $img,
			'feedback'   => $feedback,
			'success'    => $success,
		) );
	}

	/**
	 * Register JavaScript files
	 */
	public function enqueue_scripts() {
		$options = $this->get_display_options();

		$load_user_feedback = ! is_customize_preview();

		if ( ! $options['anonymous'] && ! is_user_logged_in() ) {
			$load_user_feedback = false;
		}

		if ( ! $options['backend'] && is_admin() ) {
			$load_user_feedback = false;
		}

		/**
		 * Allow others to enable/disable the plugin's functionality at will.
		 *
		 * For example, you could also load the plugin for non-logged in users or on your plugin's admin screen.
		 *
		 * @param bool $load_user_feedback Whether the user feedback script should be loaded or not.
		 *                                 Defaults to true for logged in users on the front-end.
		 */
		$load_user_feedback = (bool) apply_filters( 'load_user_feedback', $load_user_feedback );

		if ( ! $load_user_feedback ) {
			remove_action( 'wp_footer', array( __CLASS__, 'print_templates' ) );

			return;
		}

		// Use minified libraries if SCRIPT_DEBUG is turned off.
		$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

		wp_enqueue_style(
			'user-feedback',
			$this->get_url() . 'css/user-feedback' . $suffix . '.css',
			array(),
			'1.0.0'
		);

		wp_enqueue_script(
			'user-feedback',
			$this->get_url() . 'js/user-feedback' . $suffix . ' .js',
			array( 'underscore', 'backbone' ),
			'1.0.0',
			true
		);

		wp_localize_script( 'user-feedback', 'user_feedback', apply_filters( 'user_feedback_script_data', array(
			'third_party' => array(),
			'ajax_url'    => admin_url( 'admin-ajax.php' ),
			'theme'       => $this->get_theme_data(),
			'user'        => $this->get_user_data(),
			'language'    => $this->get_site_language(),
			'templates'   => $this->get_template_vars(),
		) ) );
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
			$userdata               = new stdClass();
			$userdata->display_name = __( 'Anonymous', 'user-feedback' );
			$userdata->user_email   = '';
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
			'button'                => array(
				'label' => __( 'Feedback', 'user-feedback' ),
			),
			'bottombar'             => array(
				'step'   => array(
					'one'   => _x( 'Feedback', 'step 1', 'user-feedback' ),
					'two'   => _x( 'Highlight area', 'step 3', 'user-feedback' ),
					'three' => _x( 'Leave a message', 'step 2', 'user-feedback' ),
				),
				'button' => array(
					'help'     => _x( '?', 'help button label', 'user-feedback' ),
					'helpAria' => _x( 'Submit Feedback', 'help button title text and aria label', 'user-feedback' ),
				),
			),
			'wizardStep1'           => array(
				'title'       => _x( 'Feedback', 'modal title', 'user-feedback' ),
				'salutation'  => __( 'Howdy stranger,', 'user-feedback' ),
				'intro'       => __( 'Please let us know who you are. This way we will get back to you as soon as the issue is resolved:', 'user-feedback' ),
				'placeholder' => array(
					'name'  => _x( 'Your name', 'input field placeholder', 'user-feedback' ),
					'email' => _x( 'Email address', 'input field placeholder', 'user-feedback' ),
				),
				'button'      => array(
					'primary'   => __( 'Next', 'user-feedback' ),
					'secondary' => __( 'Stay anonymous', 'user-feedback' ),
					'close'     => _x( '&times;', 'close button', 'user-feedback' ),
					'closeAria' => _x( 'Close', 'close button title text and aria label', 'user-feedback' ),
				),
			),
			'wizardStep2'           => array(
				'title'      => _x( 'Feedback', 'modal title', 'user-feedback' ),
				'salutation' => __( 'Hello ', 'user-feedback' ),
				'intro'      => __( 'Please help us understand your feedback better!', 'user-feedback' ),
				'intro2'     => __( 'You can not only leave us a message but also highlight areas relevant to your feedback.', 'user-feedback' ),
				'inputLabel' => __( 'Don\'t show me this again', 'user-feedback' ),
				'button'     => array(
					'primary'   => __( 'Next', 'user-feedback' ),
					'close'     => _x( '&times;', 'close button', 'user-feedback' ),
					'closeAria' => _x( 'Close', 'close button title text and aria label', 'user-feedback' ),
				),
			),
			'wizardStep3'           => array(
				'title'  => _x( 'Highlight area', 'modal title', 'user-feedback' ),
				'intro'  => __( 'Highlight the areas relevant to your feedback.', 'user-feedback' ),
				'button' => array(
					'primary'   => __( 'Take screenshot', 'user-feedback' ),
					'close'     => _x( '&times', 'close button', 'user-feedback' ),
					'closeAria' => _x( 'Close', 'close button title text and aria label', 'user-feedback' ),
				),
			),
			'wizardStep3Annotation' => array(
				'close'     => _x( '&times', 'close button', 'user-feedback' ),
				'closeAria' => _x( 'Close', 'close button title text and aria label', 'user-feedback' ),
			),
			'wizardStep4'           => array(
				'title'         => _x( 'Feedback', 'modal title', 'user-feedback' ),
				'screenshotAlt' => _x( 'Annotated Screenshot', 'alt text', 'user-feedback' ),
				'user'          => array(
					'by' => _x( 'From ', 'by user xy', 'user-feedback' ),
				),
				'placeholder'   => array(
					'message' => _x( 'Tell us what we should improve or fix &hellip;', 'textarea placeholder', 'user-feedback' ),
				),
				'details'       => array(
					'theme'    => __( 'Theme: ', 'user-feedback' ),
					'template' => __( 'Page: ', 'user-feedback' ),
					'browser'  => __( 'Browser: ', 'user-feedback' ),
					'language' => __( 'Language: ', 'user-feedback' ),
				),
				'button'        => array(
					'primary'   => __( 'Send', 'user-feedback' ),
					'secondary' => __( 'Back', 'user-feedback' ),
					'close'     => _x( '&times', 'close button', 'user-feedback' ),
					'closeAria' => _x( 'Close', 'close button title text and aria label', 'user-feedback' ),
				),
			),
			'wizardStep5'           => array(
				'title'  => _x( 'Feedback', 'modal title', 'user-feedback' ),
				'intro'  => __( 'Thank you for taking your time to give us feedback. We will consider it and get back to you as quickly as possible.', 'user-feedback' ),
				'intro2' => sprintf( __( '&ndash; %s', 'user-feedback' ), get_bloginfo( 'name' ) ),
				'button' => array(
					'primary'   => __( 'Done', 'user-feedback' ),
					'secondary' => __( 'Leave another message', 'user-feedback' ),
				),
			),
		);
	}

	/**
	 * Prints the HTML templates used by the feedback JavaScript.
	 */
	public function print_templates() {
		// Our main container.
		echo '<div id="user-feedback-container"></div>';
	}

	/**
	 * This functions is hooked to the `user_feedback_init` action.
	 *
	 * Developers can use this action to enable User Feedback in their plugins.
	 * They can pass additional data that should be processed and even an email address.
	 *
	 * @param array $args      {
	 *                         Hook arguments.
	 *
	 * @type string $name      Name of the plugin.
	 * @type array  $data      Additional debug data that is sent along with the plugin.
	 * @type string $recipient Email address of the recipient.
	 * }
	 */
	public function user_feedback_init( $args ) {
		$defaults = array(
			'name'      => '',
			'data'      => array(),
			'recipient' => get_option( 'admin_email' ),
		);

		$args = wp_parse_args( $args, $defaults );

		$args['name'] = sanitize_text_field( $args['name'] );
		$args['slug'] = sanitize_title( $args['name'] );

		// Load user feedback on the current screen.
		add_filter( 'load_user_feedback', '__return_true' );

		// Change email address.
		add_filter( 'user_feedback_email_address', function () use ( $args ) {
			return $args['recipient'];
		} );

		// Add plugin's data array to our JS data.
		// todo: Use something like `json_decode(json_encode($obj), true)` to make sure it's an array.
		add_filter( 'user_feedback_script_data', function ( $data ) use ( $args ) {
			$data['third_party'][ $args['slug'] ] = $args['data'];

			return $data;
		} );

		add_filter(
			'user_feedback_email_message',
			function ( $message, $feedback ) use ( $args ) {
				$data = ( isset( $feedback['third_party'][ $args['slug'] ] ) ) ? $feedback['third_party'][ $args['slug'] ] : '';

				if ( ! empty( $data ) ) {
					$message .= sprintf( __( "%s:\r\n\r\n %s\r\n\r\n", 'user-feedback' ), $args['name'], wp_json_encode( $data ) );
				}

				return $message;
			}
		);

		$this->enqueue_scripts();
	}

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
