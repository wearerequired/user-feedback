<?php
/**
 * User Feedback Plugin
 *
 * @package   User_Feedback
 * @author    Pascal Birchler <pascal@required.ch>
 * @license   GPL-2.0+
 * @link      https://github.com/wearerequired/user-feedback/
 * @copyright 2015 required gmbh
 *
 * @wordpress-plugin
 * Plugin Name: User Feedback
 * Plugin URI:  https://github.com/wearerequired/user-feedback
 * Description: Allows users to submit feedback and bug reports anywhere on the site using an interactive feedback button.
 * Version:     1.0.0
 * Author:      required+
 * Author URI:  http://required.ch
 * Text Domain: user-feedback
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path: /languages
 */

// Don't call this file directly
defined( 'ABSPATH' ) or die;

/**
 * Class User_Feedback
 */
final class User_Feedback {

	/**
	 * Add all hooks on init
	 */
	public static function init() {
		// Load the scripts & styles
		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'enqueue_scripts' ) );

		add_action( 'wp_footer', array( __CLASS__, 'print_templates' ) );

		// Ajax callbacks
		add_action( 'wp_ajax_user_feedback', array( __CLASS__, 'ajax_callback' ) );
		add_action( 'wp_ajax_nopriv_user_feedback', array( __CLASS__, 'ajax_callback' ) );

		// Send feedback emails
		add_action( 'user_feedback_received', array( __CLASS__, 'process_feedback' ) );
	}

	/**
	 * Ajax callback for user feedback.
	 */
	public static function ajax_callback() {
		if ( ! isset( $_POST['data'] ) ) {
			echo 0;
			wp_die();
		}

		/**
		 * This action is run whenever there's new user feedback.
		 *
		 * The variable contains all the data received via the ajax request.
		 *
		 * @param array $feedback {
		 *
		 * @type array  $browser  Contains useful browser information like user agent, platform, and online status.
		 * @type string $url      The URL from where the user submitted the feedback.
		 * @type string $html     Contains the complete HTML output of $url.
		 * @type string $img      Base64 encoded screenshot of the page.
		 * @type string $note     Additional notes from the user.
		 * }
		 *
		 */
		do_action( 'user_feedback_received', $_POST['data'] );

		echo 1;
		wp_die(); // this is required to terminate immediately and return a proper response
	}

	/**
	 * Save the submitted image as media item.
	 *
	 * @param string $img Base64 encoded image.
	 *
	 * @return int|WP_Error
	 */
	public static function save_image( $img ) {
		// Strip the "data:image/png;base64," part and decode the image
		$img = base64_decode( explode( ',', $img )[1] );

		if ( ! $img ) {
			return false;
		}

		// Upload to tmp folder
		$filename = 'user-feedback-' . date( 'Y-m-d-H-i' ) . '.png';
		// todo: Use WP_Filesystem class
		$file = file_put_contents( '/tmp/' . $filename, $img );

		if ( ! $file ) {
			return false;
		}

		return '/tmp/' . $filename;
	}

	/**
	 * This function runs whenever new feedback is submitted.
	 *
	 * What it does:
	 * - uploading the image in the WordPress uploads folder
	 * - store the feedback as a custom post
	 * - send an email to the admin
	 *
	 * @param array $feedback {
	 *
	 * @type array  $browser  Contains useful browser information like user agent, platform, and online status.
	 * @type string $url      The URL from where the user submitted the feedback.
	 * @type string $html     Contains the complete HTML output of $url.
	 * @type string $img      Base64 encoded screenshot of the page.
	 * @type string $message  Additional notes from the user.
	 * }
	 */
	public static function process_feedback( $feedback ) {

		$attachments = array();
		$img         = self::save_image( $feedback['img'] );
		if ( $img ) {
			$attachments[] = $img;
		}

		// Send the email
		$message = sprintf( "
			%s\n\n
			%s\n\n
			%s\n
			%s %s\n
			%s %s\n\n
			%s\n%s\n\n
			%s",
			__( 'Hey there,', 'user-feedback' ),
			__( 'Someone just left some feedback regarding your site!', 'user-feedback' ),
			__( 'Details:', 'user-feedback' ),
			__( 'User Agent:', 'user-feedback' ),
			$feedback['browser']['userAgent'],
			__( 'Visited URL:', 'user-feedback' ),
			$feedback['url'],
			__( 'Additional Notes:', 'user-feedback' ),
			$feedback['message'],
			__( 'A screenshot of the page visited by the user is attached.', 'user-feedback' )
		);

		wp_mail(
			apply_filters( 'user_feedback_email_address', get_option( 'admin_email' ) ),
			apply_filters( 'user_feedback_email_subject',
				sprintf( '%s: %s',
					get_bloginfo( 'name' ),
					__( 'New User Feedback Received', 'user-feedback' )
				)
			),
			apply_filters( 'user_feedback_email_message', $message ),
			'',
			$img
		);
	}

	/**
	 * Register JavaScript files
	 */
	public static function enqueue_scripts() {
		// Use minified libraries if SCRIPT_DEBUG is turned off
		$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

		/**
		 * Allow others to enable/disable the plugin's functionality at will.
		 *
		 * For example, you could also load the plugin for non-logged-in users.
		 *
		 * @param bool $load_user_feedback Whether the user feedback script
		 *                                 should be loaded or not. Defaults to true.
		 */
		$load_user_feedback = apply_filters( 'user_feedback_load', true );

		/** @var bool $load_user_feedback */
		if ( ! $load_user_feedback ) {
			remove_action( 'wp_footer', array( __CLASS__, 'print_templates' ) );

			return;
		}

		wp_enqueue_style(
			'user-feedback',
			plugin_dir_url( __FILE__ ) . 'css/build/user-feedback' . $suffix . '.css',
			array(),
			'1.0.0'
		);

		wp_enqueue_script(
			'user-feedback',
			plugin_dir_url( __FILE__ ) . 'js/build/user-feedback' . $suffix . ' .js',
			array( 'underscore', 'backbone' ),
			'1.0.0',
			true
		);

		/**
		 * Get current user data.
		 *
		 * If the user isn't logged in, a fake object is created
		 */
		$userdata = get_userdata( get_current_user_id() );

		if ( ! $userdata ) {
			$userdata               = new stdClass();
			$userdata->display_name = __( 'Anonymous', 'user-feedback' );
			$userdata->user_email   = '';
		}

		/**
		 * Get theme data.
		 *
		 * Store the theme's name and the currently used template, e.g. index.php
		 *
		 * @todo: Maybe use {@link get_included_files()} if necessary
		 */
		$theme = wp_get_theme();
		global $template;
		$current_template = str_replace( $theme->theme_root . '/' . $theme->stylesheet . '/', '', $template );

		/**
		 * Get the current language.
		 *
		 * Uses the WordPress locale setting, but also checks for WPML and Polylang.
		 */
		$language = get_bloginfo( 'language' );

		if ( defined( 'ICL_LANGUAGE_CODE' ) ) {
			$language = ICL_LANGUAGE_CODE;
		}

		if ( function_exists( 'pll_current_language' ) ) {
			$language = pll_current_language( 'slug' );
		}

		wp_localize_script( 'user-feedback', 'user_feedback', apply_filters( 'user_feedback_script_data', array(
			'ajax_url'       => admin_url( 'admin-ajax.php' ),
			'theme'          => array(
				'name'             => $theme->Name,
				'stylesheet'       => $theme->stylesheet,
				'current_template' => $current_template
			),
			'user'           => array(
				'logged_in' => is_user_logged_in(),
				'name'      => $userdata->display_name,
				'email'     => $userdata->user_email,
			),
			'language'       => $language,
			'templates'      => array(
				'button'                => array(
					'label' => __( 'Feedback', 'user-feedback' ),
				),
				'bottombar'             => array(
					'step'   => array(
						'one'   => _x( 'Feedback', 'step 1', 'user-feedback' ),
						'two'   => _x( 'Leave a message', 'step 2', 'user-feedback' ),
						'three' => _x( 'Highlight area', 'step 3', 'user-feedback' ),
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
						'closeAria' => _x( 'Close', 'close button title text and aria label', 'user-feedback' )
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
						'closeAria' => _x( 'Close', 'close button title text and aria label', 'user-feedback' )
					),
				),
				'wizardStep3'           => array(
					'title'       => _x( 'Leave a message', 'modal title', 'user-feedback' ),
					'placeholder' => array(
						'message' => _x( 'Tell us what we should improve or fix &hellip;', 'textarea placeholder', 'user-feedback' ),
					),
					'button'      => array(
						'primary'   => __( 'Next', 'user-feedback' ),
						'close'     => _x( '&times;', 'close button', 'user-feedback' ),
						'closeAria' => _x( 'Close', 'close button title text and aria label', 'user-feedback' )
					),
				),
				'wizardStep4'           => array(
					'title'  => _x( 'Highlight area', 'modal title', 'user-feedback' ),
					'intro'  => __( 'Highlight the areas relevant to your feedback.', 'user-feedback' ),
					'button' => array(
						'primary'   => __( 'Take screenshot', 'user-feedback' ),
						'close'     => _x( '&times', 'close button', 'user-feedback' ),
						'closeAria' => _x( 'Close', 'close button title text and aria label', 'user-feedback' )
					),
				),
				'wizardStep4Annotation' => array(
					'close'     => _x( '&times', 'close button', 'user-feedback' ),
					'closeAria' => _x( 'Close', 'close button title text and aria label', 'user-feedback' )
				),
				'wizardStep5'           => array(
					'title'         => _x( 'Feedback', 'modal title', 'user-feedback' ),
					'screenshotAlt' => _x( 'Annotated Screenshot', 'alt text', 'user-feedback' ),
					'user'          => array(
						'by'          => _x( 'From ', 'by user xy', 'user-feebdack' ),
						'gravatarAlt' => _x( 'Gravatar', 'alt text', 'user-feedback' )
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
					),
				),
				'wizardStep6'           => array(
					'title'  => _x( 'Feedback', 'modal title', 'user-feedback' ),
					'intro'  => __( 'Thank you for taking your time to give us feedback. We will examine it and get back to as quickly as possible.', 'user-feedback' ),
					'intro2' => __( '&ndash; Your required+ support team', 'user-feedback' ),
					'button' => array(
						'primary'   => __( 'Done', 'user-feedback' ),
						'secondary' => __( 'Leave another message', 'user-feedback' ),
					),
				)
			),
		) ) );
	}

	/**
	 * Prints the HTML templates used by the feedback JavaScript.
	 */
	public static function print_templates() {
		// Our main container
		echo '<div id="user-feedback-container"></div>';
	}

}

add_action( 'plugins_loaded', array( 'User_Feedback', 'init' ) );