<?php
/**
 * Holds the main plugin controller.
 *
 * @package Required\User_Feedback
 */

namespace Required\User_Feedback;

/**
 * Main class responsible for the whole plugin.
 */
class Controller {
	/**
	 * Plugin version.
	 */
	const VERSION = '1.1.0';

	/**
	 * Ajax handler.
	 *
	 * @var \Required\User_Feedback\AjaxHandler
	 */
	protected $ajaxHandler;

	/**
	 * @var \Required\User_Feedback\SettingsController
	 */
	protected $settingsController;

	/**
	 * @var \Required\User_Feedback\DataProvider
	 */
	protected $dataProvider;

	/**
	 * Controller constructor.
	 *
	 * Initializes the ajax handler and settings controller.
	 */
	public function __construct() {
		$this->ajaxHandler        = new AjaxHandler();
		$this->settingsController = new SettingsController();
		$this->dataProvider       = new DataProvider();
	}

	/**
	 * Returns the URL to the plugin directory
	 *
	 * @return string The URL to the plugin directory.
	 */
	protected function get_url() {
		return plugin_dir_url( __DIR__ );
	}

	/**
	 * Returns the path to the plugin directory.
	 *
	 * @return string The absolute path to the plugin directory.
	 */
	protected function get_path() {
		return plugin_dir_path( __DIR__ );
	}

	/**
	 * Initializes the plugin, registers textdomain, etc.
	 */
	public function load_textdomain() {
		load_plugin_textdomain( 'user-feedback', false, basename( $this->get_path() ) . '/languages' );
	}

	/**
	 * Adds hooks.
	 */
	public function add_hooks() {
		add_action( 'init', array( $this, 'load_textdomain' ) );

		// Support third-party plugins.
		add_action( 'user_feedback_init', array( $this, 'user_feedback_init' ) );

		// Settings screen.
		add_action( 'admin_init', array( $this->settingsController, 'add_settings' ) );

		// Load the scripts & styles.
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'wp_footer', array( $this, 'print_templates' ) );
		add_action( 'admin_footer', array( $this, 'print_templates' ) );

		// Ajax callbacks.
		add_action( 'wp_ajax_user_feedback_submit', array( $this->ajaxHandler, 'handle_submission' ) );
		add_action( 'wp_ajax_nopriv_user_feedback_submit', array( $this->ajaxHandler, 'handle_submission' ) );

		add_action( 'wp_ajax_user_feedback_avatar', array( $this->ajaxHandler, 'get_avatar' ) );
		add_action( 'wp_ajax_nopriv_user_feedback_avatar', array( $this->ajaxHandler, 'get_avatar' ) );

		// Send feedback emails.
		add_action( 'user_feedback_received', array( $this, 'process_feedback' ) );
	}

	/**
	 * This function runs whenever new feedback is submitted.
	 *
	 * What it does:
	 * - uploading the image in the WordPress uploads folder
	 * - store the feedback as a custom post
	 * - send an email to the admin
	 *
	 * @param array $data Feedback data.
	 */
	public function process_feedback( $data ) {
		$attachments = array();
		if ( $data['img'] ) {
			$attachments[] = $data['img'];
		}

		$user_name  = sanitize_text_field( $data['user']['name'] );
		$user_email = sanitize_email( $data['user']['email'] );

		if ( empty( $user_name ) ) {
			$user_name = __( 'Anonymous', 'user-feedback' );
		}

		if ( empty( $user_email ) ) {
			$user_email = __( '(not provided)', 'user-feedback' );
		}

		$user_message = sanitize_text_field( $data['message'] );
		$visited_url  = esc_url( $data['url'] );

		$cookies_enabled = (bool) $data['browser']['cookieEnabled'] ? __( 'Yes', 'user-feedback' ) : __( 'No', 'user-feedback' );

		$message = __( 'Howdy,', 'user-feedback' ) . "\r\n\r\n";
		$message .= __( 'You just received a new user feedback regarding your website!', 'user-feedback' ) . "\r\n\r\n";
		$message .= sprintf( __( 'Name: %s', 'user-feedback' ), $user_name ) . "\r\n";
		$message .= sprintf( __( 'Email: %s', 'user-feedback' ), $user_email ) . "\r\n";
		$message .= sanitize_text_field( sprintf( __( 'Browser: %s (%s)', 'user-feedback' ), $data['browser']['name'], $data['browser']['userAgent'] ) ) . "\r\n";
		$message .= sprintf( __( 'Cookies enabled: %s', 'user-feedback' ), $cookies_enabled ) . "\r\n";
		$message .= sprintf( __( 'Visited URL: %s', 'user-feedback' ), $visited_url ) . "\r\n";
		$message .= sprintf( __( 'Site Language: %s', 'user-feedback' ), sanitize_text_field( $data['language'] ) ) . "\r\n";
		$message .= sprintf( __( 'User Languages: %s', 'user-feedback' ), sanitize_text_field( implode( ', ', $data['browser']['languages'] ) ) ) . "\r\n";
		$message .= __( 'Additional Notes:', 'user-feedback' ) . "\r\n";
		$message .= $user_message . "\r\n\r\n";
		$message .= __( 'A screenshot of the visited page is attached.', 'user-feedback' ) . "\r\n";

		// Send email to the blog admin.
		$recipient     = apply_filters( 'user_feedback_email_address', get_option( 'admin_email' ) );
		$subject       = apply_filters( 'user_feedback_email_subject',
			sprintf( __( '[%s] New User Feedback', 'user-feedback' ), get_bloginfo( 'name' ) )
		);
		$email_message = apply_filters( 'user_feedback_email_message', $message, $data );

		$success = wp_mail( $recipient, $subject, $email_message, '', $attachments );

		do_action_ref_array( 'user_feedback_email_sent', array(
			'to'          => $recipient,
			'subject'     => $subject,
			'message'     => $email_message,
			'attachments' => $attachments,
			'feedback'    => $data,
			'success'     => $success,
		) );

		if ( ! is_email( $user_email ) ) {
			return;
		}

		$message = __( 'Howdy,', 'user-feedback' ) . "\r\n\r\n";
		$message .= __( 'We just received the following feedback from you and will get in touch shortly. Thank you.', 'user-feedback' ) . "\r\n\r\n";
		$message .= sprintf( __( 'Name: %s', 'user-feedback' ), $user_name ) . "\r\n";
		$message .= sprintf( __( 'Email: %s', 'user-feedback' ), $user_email ) . "\r\n";
		$message .= sprintf( __( 'Browser: %s', 'user-feedback' ), sanitize_text_field( $data['browser']['name'] ) ) . "\r\n";
		$message .= sprintf( __( 'Visited URL: %s', 'user-feedback' ), $visited_url ) . "\r\n";
		$message .= __( 'Additional Notes:', 'user-feedback' ) . "\r\n";
		$message .= $user_message . "\r\n\r\n";
		$message .= __( 'A screenshot of the visited page is attached.', 'user-feedback' ) . "\r\n";

		// Send email to the submitting user.
		$recipient     = apply_filters( 'user_feedback_email_copy_address', $user_email );
		$subject       = apply_filters( 'user_feedback_email_copy_subject',
			sprintf( __( '[%s] Your Feedback', 'user-feedback' ), get_bloginfo( 'name' ) )
		);
		$email_message = apply_filters( 'user_feedback_email_copy_message', $message, $data );

		$success = wp_mail( $recipient, $subject, $email_message, '', $attachments );

		do_action_ref_array( 'user_feedback_email_copy_sent', array(
			'to'          => $recipient,
			'subject'     => $subject,
			'message'     => $email_message,
			'attachments' => $attachments,
			'feedback'    => $data,
			'success'     => $success,
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
			remove_action( 'wp_footer', array( $this, 'print_templates' ) );

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
			$this->get_url() . 'js/user-feedback' . $suffix . '.js',
			array( 'underscore', 'backbone' ),
			'1.0.0',
			true
		);

		wp_localize_script(
			'user-feedback',
			'user_feedback',
			array_merge(
				$this->dataProvider->get_data(),
				array(
					'ajax_url'  => admin_url( 'admin-ajax.php' ),
					'templates' => $this->get_template_vars(),
				)
			)
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
		add_filter( 'user_feedback_support_data', function ( $data ) use ( $args ) {
			$data[ $args['slug'] ] = (array) $args['data'];

			return $data;
		} );

		add_filter(
			'user_feedback_email_message',
			function ( $message, $data ) use ( $args ) {
				$data = ( isset( $data['third_party'][ $args['slug'] ] ) ) ? $data['third_party'][ $args['slug'] ] : '';

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
		return $this->settingsController->get_display_options();
	}
}
