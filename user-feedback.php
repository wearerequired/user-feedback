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
		// Register post type
		add_action( 'init', array( __CLASS__, 'register_post_type' ) );

		// Load the stylesheet
		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'enqueue_scripts' ) );

		// Ajax callbacks
		add_action( 'wp_ajax_user_feedback', array( __CLASS__, 'ajax_callback' ) );
		add_action( 'wp_ajax_nopriv_user_feedback', array( __CLASS__, 'ajax_callback' ) );

		// Send feedback emails
		add_action( 'user_feedback_received', array( __CLASS__, 'process_feedback' ) );

		// modify admin list columns
		add_filter( "manage_edit-user_feedback_columns", array( __CLASS__, 'admin_edit_columns' ) );

		// fill custom columns
		add_action( "manage_user_feedback_posts_custom_column", array( __CLASS__, 'admin_manage_columns' ), 10, 2 );
	}

	/**
	 * Register the user feedback post type.
	 */
	public static function register_post_type() {
		$labels = array(
			'name'               => _x( 'User Feedback', 'post type general name', 'user-feedback' ),
			'singular_name'      => _x( 'Feedback', 'post type singular name', 'user-feedback' ),
			'menu_name'          => _x( 'User Feedback', 'admin menu', 'user-feedback' ),
			'name_admin_bar'     => _x( 'User Feedback', 'add new on admin bar', 'user-feedback' ),
			'add_new'            => _x( 'Add New', 'feedback', 'user-feedback' ),
			'add_new_item'       => __( 'Add New Feedback', 'user-feedback' ),
			'new_item'           => __( 'New Feedback', 'user-feedback' ),
			'edit_item'          => __( 'Edit Feedback', 'user-feedback' ),
			'view_item'          => __( 'View Feedback', 'user-feedback' ),
			'all_items'          => __( 'All Feedbacks', 'user-feedback' ),
			'search_items'       => __( 'Search Feedbacks', 'user-feedback' ),
			'parent_item_colon'  => __( 'Parent Feedbacks:', 'user-feedback' ),
			'not_found'          => __( 'No feedbacks found.', 'user-feedback' ),
			'not_found_in_trash' => __( 'No feedbacks found in Trash.', 'user-feedback' )
		);

		$args = array(
			'labels'              => $labels,
			'public'              => false,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_admin_bar'   => false,
			'exclude_from_search' => true,
			'has_archive'         => false,
			'rewrite'             => false,
			'can_export'          => false,
			'query_var'           => true,
			'supports'            => array( 'author', 'thumbnail' )
		);

		register_post_type( 'user_feedback', $args );
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
	 * @param string $img     Base64 encoded image.
	 * @param int    $post_id The post ID this image is associated with.
	 *
	 * @return array|false
	 */
	public static function save_image( $img, $post_id ) {
		// Strip the "data:image/png;base64," part and decode the image
		$img = base64_decode( explode( ',', $img )[1] );

		if ( ! $img ) {
			return false;
		}

		// Upload to tmp folder
		$filename = 'user-feedback-' . date( 'Y-m-d-H-i' ) . '.png';
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
		$file = media_handle_sideload(
			$file_array,
			$post_id,
			sprintf(
				__( 'User Feedback from %s', 'user-feedback' ),
				date( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ) )
			)
		);

		// Unlink file in case of an error
		if ( is_wp_error( $file ) ) {
			unlink( $file_array['tmp_name'] );
		}

		return $file;
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
	 * @type string $note     Additional notes from the user.
	 * }
	 */
	public static function process_feedback( $feedback ) {
		// Insert post
		$post_id = wp_insert_post( array(
			'post_type'    => 'user_feedback',
			'post_content' => sanitize_text_field( $feedback['note'] ),
			'post_status'  => 'publish',
		) );

		// Upload the image
		$attachments = array();
		$img         = self::save_image( $feedback['img'], $post_id );

		if ( ! is_wp_error( $img ) ) {
			$attachments[] = get_attached_file( $img );
		} else {
			$img = array(
				'url' => __( '(upload did not work)', 'user-feedback' )
			);
		}

		if ( $post_id && ! empty( $attachments ) ) {
			// Set the attached screenshot as post thumbnail
			set_post_thumbnail( $post_id, $img );
		}

		// Send the email
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
			plugin_dir_url( __FILE__ ) . '/css/build/user-feedback' . $suffix . '.css',
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

		$templates['highlighter'] = sprintf( '
			<div id="feedback-highlighter">
				<div class="feedback-logo">%1$s</div>
				<p>%2$s</p>
				<button class="feedback-sethighlight feedback-active">
				<div class="ico"></div><span>%3$s</span>
				</button>
				<label>%4$s</label>
				<button class="feedback-setblackout"><div class="ico"></div><span>%5$s</span></button>
				<label class="lower">%6$s</label>
				<div class="feedback-buttons"><button id="feedback-highlighter-next" class="feedback-next-btn feedback-btn-gray">%7$s</button>
				<button id="feedback-highlighter-back" class="feedback-back-btn feedback-btn-gray">%8$s</button></div>
				<div class="feedback-wizard-close"></div>
			</div>',
			__( 'Feedback', 'user-feedback' ),
			__( "Click and drag on the page to help us better understand your feedback. You can move this dialog if it's in the way.", 'user-feedback' ),
			__( 'Highlight', 'user-feedback' ),
			__( 'Highlight areas relevant to your feedback.', 'user-feedback' ),
			__( 'Black out', 'user-feedback' ),
			__( 'Black out any personal information.', 'user-feedback' ),
			__( 'Next', 'user-feedback' ),
			__( 'Back', 'user-feedback' )
		);

		$templates['overview'] = sprintf( '
			<div id="feedback-overview">
				<div class="feedback-logo">%1$s</div>
				<div id="feedback-overview-description">
					<div id="feedback-overview-description-text">
						<h3>Description</h3><h3 class="feedback-additional">%2$s</h3>
						<div id="feedback-additional-none"><span>%3$s</span></div>
						<div id="feedback-browser-info"><span>%4$s</span></div>
						<div id="feedback-page-info"><span>%5$s</span></div>
						<div id="feedback-page-structure"><span>%6$s</span></div>
					</div>
				</div>
				<div id="feedback-overview-screenshot"><h3>%7$s</h3></div>
				<div class="feedback-buttons">
					<button id="feedback-submit" class="feedback-submit-btn feedback-btn-blue">%8$s</button>
					<button id="feedback-overview-back" class="feedback-back-btn feedback-btn-gray">%9$s</button>
				</div>
				<div id="feedback-overview-error">%10$s</div>
				<div class="feedback-wizard-close"></div>
			</div>',
			__( 'Feedback', 'user-feedback' ),
			__( 'Additional info', 'user-feedback' ),
			__( 'None', 'user-feedback' ),
			__( 'Browser Info', 'user-feedback' ),
			__( 'Page Info', 'user-feedback' ),
			__( 'Page Structure', 'user-feedback' ),
			__( 'Screenshot', 'user-feedback' ),
			__( 'Submit', 'user-feedback' ),
			__( 'Back', 'user-feedback' ),
			__( 'Please enter a description.', 'user-feedback' )
		);

		$templates['submit_success'] = sprintf( '
			<div id="feedback-submit-success">
				<div class="feedback-logo">%1$s</div>
				<p>%2$s</p>
				<p>%3$s</p>
				<button class="feedback-close-btn feedback-btn-blue">%4$s</button>
				<div class="feedback-wizard-close"></div>
			</div>',
			__( 'Feedback', 'user-feedback' ),
			__( 'Thank you for your feedback. We value every piece of feedback we receive.', 'user-feedback' ),
			__( 'We cannot respond individually to every one, but we will use your comments as we strive to improve your experience.', 'user-feedback' ),
			__( 'OK', 'user-feedback' )
		);

		$templates['submit_error'] = sprintf( '
			<div id="feedback-submit-error">
				<div class="feedback-logo">%1$s</div>
				<p>%2$s</p>
				<button class="feedback-close-btn feedback-btn-blue">%3$s</button>
				<div class="feedback-wizard-close"></div>
			</div>',
			__( 'Feedback', 'user-feedback' ),
			__( 'Sadly an error occurred while sending your feedback. Please try again.', 'user-feedback' ),
			__( 'OK', 'user-feedback' )
		);

		return apply_filters( 'user_feedback_templates', $templates );
	}

	/**
	 * Adds list table columns for our post type.
	 *
	 * @param  array $columns Array of default columns
	 *
	 * @return array
	 */
	public static function admin_edit_columns( $columns ) {
		// Add the first custom column
		$columns['user_feedback_note'] = __( 'Feedback', 'user-feedback' );

		// We don't have titles
		unset( $columns['title'] );

		// Move the date to the middle
		$tmp = $columns['date'];
		unset( $columns['date'] );
		$columns['date'] = $tmp;

		// Screenshot comes last
		$columns['user_feedback_image'] = __( 'Screenshot', 'user-feedback' );

		return $columns;
	}

	/**
	 * Adds the content for our custom list table columns.
	 *
	 * @param  string $column  Name of the column defined in $this->admin_edit_columns().
	 * @param  int    $post_id WP_Post ID.
	 *
	 * @return string
	 */
	public static function admin_manage_columns( $column, $post_id ) {
		// Display the user feedback
		if ( 'user_feedback_note' === $column ) {
			$post = get_post( $post_id );
			echo esc_html( $post->post_content );
		}

		// Display the screenshot
		if ( 'user_feedback_image' === $column ) {
			$thumbnail = get_post_thumbnail_id( $post_id );
			echo wp_get_attachment_image( $thumbnail, 'thumbnail' );
		}
	}

}

add_action( 'plugins_loaded', array( 'User_Feedback', 'init' ) );