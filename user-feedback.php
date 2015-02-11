<?php
/**
 * User Feedback Plugin
 *
 * @package   WP_Team_List
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
		// Load the stylesheet
		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'enqueue_scripts' ) );

		// Ajax callbacks
		add_action( 'wp_ajax_user_feedback', array( __CLASS__, 'ajax_callback' ) );
		add_action( 'wp_ajax_nopriv_user_feedback', array( __CLASS__, 'ajax_callback' ) );

		// Send feedback emails
		add_action( 'user_feedback_received', array( __CLASS__, 'send_email' ) );
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
	 * @return array|false
	 */
	public static function save_image( $img ) {
		// Strip the "data:image/png;base64," part and decode the image
		$img = base64_decode( explode( ',', $img )[1] );

		if ( ! $img ) {
			return false;
		}

		// Uplaod to tmp folder
		$filename     = 'user-feedback-' . date( 'Y-m-d-H-i' ) . '.png';
		file_put_contents( '/tmp/' . md5( $filename ), $img );

		// Create file array for wp_handle_sideload
		$file_array = array(
			'error'    => '',
			'tmp_name' => '/tmp/' . md5( $filename ),
			'name'     => $filename,
			'type'     => 'image/png',
			'size'     => filesize( '/tmp/' . md5( $filename ) )
		);

		// Try upload
		$file = wp_handle_sideload( $file_array, array( 'test_form' => false ), date( 'Y/d' ) );

		// Unlink file in case of an error
		if ( isset( $file['error'] ) ) {
			unlink( $file_array['tmp_name'] );

			return false;
		}

		return $file;
	}

	/**
	 * Sends an email whenever new feedback is submitted.
	 *
	 * @param array $feedback The user submitted feedback.
	 */
	public static function send_email( $feedback ) {
		$attachments = array();

		$img = self::save_image( $feedback['img'] );
		var_dump($feedback['img']);
		var_dump($img);
		if ( $img ) {
			$attachments[] = $img['file'];
		} else {
			$img = array(
				'url' => __( '(upload did not work)', 'user-feedback' )
			);
		}

		$message = sprintf( "
			%s\n\n
			%s\n\n
			%s\n
			%s %s\n
			%s %s\n\n
			%s\n%s\n\n
			%s %s %s",
			__( 'Hey there,', 'user-feedback' ),
			__( 'Someone just left some feedback regarding your site!', 'user-feedback' ),
			__( 'Details:', 'user-feedback' ),
			__( 'User Agent:', 'user-feedback' ),
			$feedback['browser']['userAgent'],
			__( 'Visited URL:', 'user-feedback' ),
			$feedback['url'],
			__( 'Additional Notes:', 'user-feedback' ),
			$feedback['note'],
			__( 'A screenshot of the page visited by the user is attached.', 'user-feedback' ),
			__( 'You can also find the screenshot here:', 'user-feedback' ),
			$img['url']
		);

		$email = wp_mail(
			apply_filters( 'user_feedback_email_address', get_option( 'admin_email' ) ),
			apply_filters( 'user_feedback_email_subject',
				sprintf( '%s: %s',
					get_bloginfo( 'name' ),
					__( 'New User Feedback Received', 'user-feedback' )
				)
			),
			apply_filters( 'user_feedback_email_message', $message ),
			$attachments
		);
	}

	/**
	 * Register JavaScript files
	 */
	public static function enqueue_scripts() {
		// Use minified libraries if SCRIPT_DEBUG is turned off
		$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
		$suffix = '';

		/**
		 * Allow others to enable/disable the plugin's functionality at will.
		 *
		 * For example, you could also load the plugin for non-logged-in users.
		 *
		 * @param bool $load_user_feedback Whether the user feedback script
		 *                                 should be loaded or not. Defaults to true.
		 */
		$load_user_feedback = apply_filters( 'user_feedback_load', is_user_logged_in() );

		/** @var bool $load_user_feedback */
		if ( ! $load_user_feedback ) {
			return;
		}

		wp_enqueue_script(
			'user-feedback',
			plugin_dir_url( __FILE__ ) . '/js/build/user-feedback' . $suffix . ' .js',
			array(),
			'1.0.0',
			true
		);

		wp_localize_script( 'user-feedback', 'user_feedback', array(
			'ajax_url'    => admin_url( 'admin-ajax.php' ),
			'button_text' => __( 'Send Feedback', 'user-feedback' ),
			'tpl'         => self::get_feedback_templates(),
		) );

		wp_enqueue_style(
			'user-feedback',
			plugin_dir_url( __FILE__ ) . '/css/user-feedback.css',
			array(),
			'1.0.0'
		);
	}

	/**
	 * Returns the HTML templates used by the feedback JavaScript.
	 *
	 * Everything is already translation-ready.
	 *
	 * @todo Implement all templates.
	 *
	 * @return array The HTML templates.
	 */
	public static function get_feedback_templates() {
		$templates = array();

		$templates['description'] = sprintf( '
			<div id="feedback-welcome">
				<div class="feedback-logo">%1$s</div>
				<p>%2$s</p><p>%3$s</p><textarea id="feedback-note-tmp"></textarea>
				<p>%4$s</p>
				<button id="feedback-welcome-next" class="feedback-next-btn feedback-btn-gray">%5$s</button>
				<div id="feedback-welcome-error">%6$s</div><div class="feedback-wizard-close"></div>
			</div>',
			__( 'Feedback', 'user-feedback' ),
			__( 'Feedback lets you send us suggestions about our products. We welcome problem reports, feature ideas and general comments.', 'user-feedback' ),
			__( 'Start by writing a brief description:', 'user-feedback' ),
			__( "Next we'll let you identify areas of the page related to your description.", 'user-feedback' ),
			__( 'Next', 'user-feedback' ),
			__( 'Please enter a description.', 'user-feedback' )
		);

		return $templates;
	}

}

add_action( 'plugins_loaded', array( 'User_Feedback', 'init' ) );