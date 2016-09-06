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
	const VERSION = '2.0.0';

	/**
	 * Ajax handler.
	 *
	 * @var \Required\User_Feedback\AjaxHandler
	 */
	protected $ajax_handler;

	/**
	 * Settings controller.
	 *
	 * @var \Required\User_Feedback\SettingsController
	 */
	protected $settings_controller;

	/**
	 * Data provider.
	 *
	 * @var \Required\User_Feedback\DataProvider
	 */
	protected $data_provider;

	/**
	 * Controller constructor.
	 *
	 * Initializes the ajax handler and settings controller.
	 */
	public function __construct() {
		$this->ajax_handler        = new AjaxHandler();
		$this->settings_controller = new SettingsController();
		$this->data_provider       = new DataProvider();
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
		add_action( 'admin_init', array( $this->settings_controller, 'add_settings' ) );

		// Load the scripts & styles.
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'wp_footer', array( $this, 'print_templates' ) );
		add_action( 'admin_footer', array( $this, 'print_templates' ) );

		// Ajax callbacks.
		add_action( 'wp_ajax_user_feedback_submit', array( $this->ajax_handler, 'handle_submission' ) );
		add_action( 'wp_ajax_nopriv_user_feedback_submit', array( $this->ajax_handler, 'handle_submission' ) );

		// Send feedback emails.
		add_action( 'user_feedback_received', array( $this, 'process_feedback' ) );

		add_action( 'user_feedback_received', array( $this, 'filter_wp_mail_from' ) );
	}

	/**
	 * Sends emails upon feedback submission.
	 *
	 * @since 2.0.0
	 *
	 * @param array $data Feedback data.
	 */
	public function process_feedback( $data ) {
		$this->send_email_to_admin( $data );

		if ( is_email( $data['user']['email'] ) ) {
			$this->send_email_to_user( $data );
		}
	}

	/**
	 * Sends an email to the admin upon feedback submission.
	 *
	 * @since 2.0.0
	 *
	 * @param arry $data Feedback data.
	 */
	protected function send_email_to_admin( $data ) {
		$attachments = array();

		if ( $data['screenshot'] ) {
			$attachments[] = $data['screenshot'];
		}

		/**
		 * Filters the recipient of the admin email.
		 *
		 * @param string $email The recipient's email address. Defaults to the blog admin.
		 */
		$recipient = apply_filters( 'user_feedback_email_address', $this->settings_controller->get_option( 'email', get_option( 'admin_email' ) ) );

		/**
		 * Filters the subject of the admin email.
		 *
		 * @param string $subject The admin email subject.
		 */
		$subject = apply_filters( 'user_feedback_email_subject',
			sprintf( __( '[%s] New User Feedback', 'user-feedback' ), get_bloginfo( 'name' ) )
		);

		/**
		 * Filters the admin email before it is sent.
		 *
		 * @param string $message The email content.
		 * @param array  $data    User feedback data.
		 */
		$email_message = apply_filters( 'user_feedback_email_message', $this->prepare_admin_email( $data ), $data );

		$user_name  = function ( $value ) use ( $data ) {
			if ( empty( $data['user']['email'] ) ) {
				return $value;
			}

			return empty( $data['user']['name'] ) ? __( 'Anonymous', 'user-feedback' ) : $data['user']['name'];
		};
		$user_email = function ( $value ) use ( $data ) {
			return empty( $data['user']['email'] ) ? $value : $data['user']['email'];
		};

		add_filter( 'wp_mail_from_name', $user_name );
		add_filter( 'wp_mail_from', $user_email );

		$success = wp_mail( $recipient, $subject, $email_message, '', $attachments );

		remove_filter( 'wp_mail_from_name', $user_name );
		remove_filter( 'wp_mail_from', $user_email );

		do_action_ref_array( 'user_feedback_email_sent', array(
			'to'          => $recipient,
			'subject'     => $subject,
			'message'     => $email_message,
			'attachments' => $attachments,
			'feedback'    => $data,
			'success'     => $success,
		) );
	}

	/**
	 * Sends an copy of the email to the user upon feedback submission.
	 *
	 * @since 2.0.0
	 *
	 * @param arry $data Feedback data.
	 */
	protected function send_email_to_user( $data ) {
		$attachments = array();

		if ( $data['screenshot'] ) {
			$attachments[] = $data['screenshot'];
		}

		/**
		 * Filters the recipient of the user email.
		 *
		 * @param string $email The submitting user's email address.
		 */
		$recipient = apply_filters( 'user_feedback_email_copy_address', $data['user']['email'] );

		/**
		 * Filters the subject of the user email.
		 *
		 * @param string $subject The user email subject.
		 */
		$subject = apply_filters( 'user_feedback_email_copy_subject',
			sprintf( __( '[%s] Your Feedback', 'user-feedback' ), get_bloginfo( 'name' ) )
		);

		/**
		 * Filters the user email before it is sent.
		 *
		 * @param string $message The email content.
		 * @param array  $data    User feedback data.
		 */
		$email_message = apply_filters( 'user_feedback_email_copy_message', $this->prepare_user_email( $data ), $data );

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
	 * Prepares the email that is being sent to the blog admin.
	 *
	 * @param array $data User Feedback data.
	 * @return string The admin email message.
	 */
	protected function prepare_admin_email( $data ) {
		$user_name  = $data['user']['name'];
		$user_email = $data['user']['email'];

		if ( empty( $user_name ) ) {
			$user_name = __( 'Anonymous', 'user-feedback' );
		}

		if ( empty( $user_email ) ) {
			$user_email = __( '(not provided)', 'user-feedback' );
		}

		$user_message = $data['message'];
		$visited_url  = $data['url'];

		$cookies_enabled = (bool) $data['browser']['cookieEnabled'] ? __( 'Yes', 'user-feedback' ) : __( 'No', 'user-feedback' );

		$message = __( 'Howdy,', 'user-feedback' ) . "\r\n\r\n";
		$message .= __( 'You just received a new user feedback regarding your website!', 'user-feedback' ) . "\r\n\r\n";
		$message .= sprintf( __( 'Name: %s', 'user-feedback' ), $user_name ) . "\r\n";
		$message .= sprintf( __( 'Email: %s', 'user-feedback' ), $user_email ) . "\r\n";
		$message .= sanitize_text_field( sprintf( __( 'Browser: %s', 'user-feedback' ), $data['browser']['userAgent'] ) ) . "\r\n";
		$message .= sprintf( __( 'Cookies enabled: %s', 'user-feedback' ), $cookies_enabled ) . "\r\n";
		$message .= sprintf( __( 'Visited URL: %s', 'user-feedback' ), $visited_url ) . "\r\n";
		$message .= sprintf( __( 'Site Language: %s', 'user-feedback' ), $data['language'] ) . "\r\n";
		$message .= sprintf( __( 'User Languages: %s', 'user-feedback' ), implode( ', ', $data['browser']['languages'] ) ) . "\r\n";
		$message .= __( 'Additional Notes:', 'user-feedback' ) . "\r\n";
		$message .= $user_message . "\r\n\r\n";

		if ( $data['screenshot'] ) {
			$message .= __( 'A screenshot of the visited page is attached.', 'user-feedback' ) . "\r\n";
		}

		return $message;
	}

	/**
	 * Prepares the copy of the email that is being sent to the submitting user.
	 *
	 * @param array $data User Feedback data.
	 * @return string The user email message.
	 */
	protected function prepare_user_email( $data ) {
		$user_name  = $data['user']['name'];
		$user_email = $data['user']['email'];

		if ( empty( $user_name ) ) {
			$user_name = __( 'Anonymous', 'user-feedback' );
		}

		if ( empty( $user_email ) ) {
			$user_email = __( '(not provided)', 'user-feedback' );
		}

		$user_message = $data['message'];
		$visited_url  = $data['url'];

		$message = __( 'Howdy,', 'user-feedback' ) . "\r\n\r\n";
		$message .= __( 'We just received the following feedback from you and will get in touch shortly. Thank you.', 'user-feedback' ) . "\r\n\r\n";
		$message .= sprintf( __( 'Name: %s', 'user-feedback' ), $user_name ) . "\r\n";
		$message .= sprintf( __( 'Email: %s', 'user-feedback' ), $user_email ) . "\r\n";
		$message .= sprintf( __( 'Browser: %s', 'user-feedback' ), $data['browser']['userAgent'] ) . "\r\n";
		$message .= sprintf( __( 'Visited URL: %s', 'user-feedback' ), $visited_url ) . "\r\n";
		$message .= __( 'Additional Notes:', 'user-feedback' ) . "\r\n";
		$message .= $user_message . "\r\n\r\n";

		if ( $data['screenshot'] ) {
			$message .= __( 'A screenshot of the visited page is attached.', 'user-feedback' ) . "\r\n";
		}

		return $message;
	}

	/**
	 * Register JavaScript files
	 */
	public function enqueue_scripts() {
		$options = $this->settings_controller->get_options();

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
			self::VERSION
		);

		wp_enqueue_script(
			'user-feedback',
			$this->get_url() . 'js/user-feedback' . $suffix . '.js',
			array( 'underscore', 'wp-backbone' ),
			self::VERSION,
			true
		);

		/**
		 * Filters the script data passed to the user feedback tool.
		 *
		 * @param array $data User Feedback script data.
		 */
		$l10n = apply_filters( 'user_feedback_script_data', $this->data_provider->get_data() );

		wp_localize_script(
			'user-feedback',
			'user_feedback',
			$l10n
		);
	}

	/**
	 * Prints the HTML templates used by the feedback JavaScript.
	 */
	public function print_templates() {
		?>
		<div id="user-feedback-container">
			<div class="user-feedback-sub-view"></div>
		</div>
		<?php
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
					$message .= sprintf( __( "%1\$s:\r\n\r\n %2\$s\r\n\r\n", 'user-feedback' ), $args['name'], wp_json_encode( $data ) );
				}

				return $message;
			}
		);

		$this->enqueue_scripts();
	}
}
