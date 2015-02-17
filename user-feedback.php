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

		wp_enqueue_style(
			'user-feedback',
			plugin_dir_url( __FILE__ ) . 'css/build/user-feedback' . $suffix . '.css',
			array(),
			'1.0.0'
		);

		wp_enqueue_script(
			'user-feedback',
			plugin_dir_url( __FILE__ ) . 'js/build/user-feedback' . $suffix . ' .js',
			array(),
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
		 * @todo: Maybe use {@link get_included_files()}
		 */
		$theme = wp_get_theme();
		global $template;
		$current_template = str_replace( $theme->theme_root . '/' . $theme->stylesheet . '/', '', $template );

		/**
		 * Get the current language.
		 *
		 * Uses the WordPress locale setting and the according name if possible.
		 * Also checks for WPML and Polylang.
		 */
		$language = get_bloginfo( 'language' );

		if ( function_exists( 'locale_get_display_language' ) ) {
			$language = locale_get_display_language( $language );
		}

		if ( defined( 'ICL_LANGUAGE_NAME' ) ) {
			$language = ICL_LANGUAGE_NAME;
		}

		if ( function_exists( 'pll_current_language' ) ) {
			$language = pll_current_language( 'name' );
		}

		wp_localize_script( 'user-feedback', 'user_feedback', apply_filters( 'user_feedback_script_data', array(
			'ajax_url'    => admin_url( 'admin-ajax.php' ),
			'button_text' => __( 'Feedback', 'user-feedback' ),
			'tpl'         => self::get_feedback_templates(),
			'theme'       => array(
				'name'             => $theme->Name,
				'stylesheet'       => $theme->stylesheet,
				'current_template' => $current_template
			),
			'language'    => $language,
		) ) );
	}

	/**
	 * Returns the HTML templates used by the feedback JavaScript.
	 *
	 * Everything is already translation-ready.
	 *
	 * @return array
	 */
	public static function get_feedback_templates() {
		$templates = array();

		/** @var WP_User $userdata */
		$user = get_userdata( get_current_user_id() );

		$name  = __( 'Guest', 'user-feedback' );
		$intro = __( 'Hello there,', 'user-feedback' );
		$email = '';

		if ( $user ) {
			$name  = isset( $user->display_name ) ? $user->display_name : $user->user_login;
			$intro = sprintf( __( 'Hello %s,', 'user-feedback' ), $name );
			$email = $user->user_email;
		}

		// Template for the optional intro modal
		$templates['description'] = sprintf( '
			<div id="user-feedback-welcome" class="user-feedback-modal" role="dialog" aria-labelledby="user-feedback-welcome-title" aria-describedby="user-feedback-welcome-description">
				<div id="user-feedback-welcome-title" class="user-feedback-logo">%1$s</div>
				<p>%2$s</p>
				<p id="user-feedback-welcome-description">%3$s</p>
				<textarea id="user-feedback-note-tmp" class="user-feedback-textarea"></textarea>
				<p>%4$s</p>
				<p>
					<input type="checkbox" value="1" id="user_feedback_dont_show_again" />
					<label for="user_feedback_dont_show_again">%5$s</label>
				</p>
				<button id="user-feedback-welcome-next" class="user-feedback-button user-feedback-button-primary user-feedback-button-next">%6$s</button>
				<div id="user-feedback-welcome-error" class="hidden">%7$s</div>
				<button class="user-feedback-wizard-close" aria-label="%8$s">%9$s</button>
			</div>',
			__( 'Feedback', 'user-feedback' ),
			$intro,
			__( "Let us know what's going on. We welcome problem reports, feature ideas and general comments. Start by writing a brief description:", 'user-feedback' ),
			__( "Next we'll let you identify areas of the page related to your description to help us better understand your feedback.", 'user-feedback' ),
			__( "Don't show me this again", 'user-feedback' ),
			__( 'Next', 'user-feedback' ),
			__( 'Please enter a description.', 'user-feedback' ),
			__( 'Close', 'user-feedback' ),
			_x( 'X', 'close button', 'user-feedback' )
		);

		// Template for the highlight/black out modal
		$templates['highlighter'] = sprintf( '
			<div id="user-feedback-highlighter" class="user-feedback-bottombar hidden" role="dialog">
				<button class="user-feedback-sethighlight user-feedback-active" title="%2$s">%1$s</button>
				<button class="user-feedback-setblackout" title="%4$s">%3$s</button>
				<div class="user-feedback-buttons">
					<button id="user-feedback-highlighter-next" class="user-feedback-button user-feedback-button-gray">%5$s</button>
					<button id="user-feedback-highlighter-back" class="user-feedback-button user-feedback-button-gray">%6$s</button>
				</div>
				<button class="user-feedback-wizard-close" aria-label="%7$s">%8$s</button>
			</div>',
			__( 'Highlight', 'user-feedback' ),
			__( 'Highlight areas relevant to your feedback.', 'user-feedback' ),
			__( 'Black out', 'user-feedback' ),
			__( 'Black out any personal information.', 'user-feedback' ),
			_x( 'Summary', 'next button', 'user-feedback' ),
			_x( '?', 'back button', 'user-feedback' ),
			__( 'Close', 'user-feedback' ),
			_x( 'X', 'close button', 'user-feedback' )
		);

		// Template for the overview at the end
		$templates['overview'] = sprintf( '
			<div id="user-feedback-overview" class="user-feedback-modal hidden" role="dialog" aria-labelledby="user-feedback-overview-title" aria-describedby="user-feedback-overview-description">
				<div id="user-feedback-overview-title" class="user-feedback-logo">%s</div>
				<div id="user-feedback-overview-description">
					<div id="user-feedback-overview-user">
						<img src="%s" width="40" height="40" alt="" />
						<span>%s</span>
					</div>
					<textarea id="user-feedback-overview-note" class="user-feedback-textarea"></textarea>
					<ul class="user-feedback-additional-notes">
						<li id="user-feedback-additional-theme">%s</li>
						<li id="user-feedback-additional-browser">%s</li>
						<li id="user-feedback-additional-template">%s</li>
						<li id="user-feedback-additional-language">%s</li>
					</ul>
				</div>
				<div id="user-feedback-overview-screenshot">
					<img id="user-feedback-overview-screenshot-img" src="" alt="%s" />
					<ul class="user-feedback-additional-notes">
						<li id="user-feedback-screenshot-size">%s</li>
						<li id="user-feedback-screenshot-highlighted"  data-single="%s" data-multiple="%s">%s</li>
					</ul>
				</div>
				<div class="user-feedback-buttons">
					<button id="user-feedback-submit" class="user-feedback-button user-feedback-button-submit user-feedback-button-primary">%s</button>
					<button id="user-feedback-overview-back" class="user-feedback-button user-feedback-button-secondary">%s</button>
				</div>
				<div id="user-feedback-overview-error" class="hidden">%s</div>
				<button class="user-feedback-wizard-close" aria-label="%11$s">%s</button>
			</div>',
			__( 'Feedback', 'user-feedback' ),
			self::get_avatar_url( $email, 90 ),
			sprintf( __( 'by %s', 'user-feedback' ), $name ),
			__( 'Theme:', 'user-feedback' ),
			__( 'Browser:', 'user-feedback' ),
			__( 'Template:', 'user-feedback' ),
			__( 'Language', 'user-feedback' ),
			_x( 'Screenshot', 'alt text', 'user-feedback' ),
			__( 'Screen size:', 'user-feedback' ),
			_x( 'area', 'single highlighted area', 'user-feedback' ),
			_x( 'areas', 'multiple highlighted areas', 'user-feedback' ),
			__( 'Highlighted:', 'user-feedback' ),
			__( 'Submit', 'user-feedback' ),
			__( 'Back', 'user-feedback' ),
			__( 'Please enter a description.', 'user-feedback' ),
			__( 'Close', 'user-feedback' ),
			_x( 'X', 'close button', 'user-feedback' )
		);

		// Template for the success message at the end
		$templates['submit_success'] = sprintf( '
			<div id="user-feedback-submit-success" class="user-feedback-modal hidden" role="dialog" aria-labelledby="user-feedback-success-title" aria-describedby="user-feedback-success-description">
				<div id="user-feedback-success-title" class="user-feedback-logo">%s</div>
				<p>%s</p>
				<p id="user-feedback-success-description">%s</p>
				<p>%s</p>
				<button class="user-feedback-button user-feedback-button-close user-feedback-button-blue">%s</button>
				<button class="user-feedback-wizard-close" aria-label="%s">%s</button>
			</div>',
			__( 'Feedback', 'user-feedback' ),
			$intro,
			__( 'Thank you for your feedback. We value every piece of feedback we receive.', 'user-feedback' ),
			__( 'We cannot respond individually to every one, but we will use your comments as we strive to improve your experience.', 'user-feedback' ),
			__( 'OK', 'user-feedback' ),
			__( 'Close', 'user-feedback' ),
			_x( 'X', 'close button', 'user-feedback' )
		);

		// Template for the error message if the submission didn't work
		$templates['submit_error'] = sprintf( '
			<div id="user-feedback-error" class="user-feedback-modal hidden" role="dialog" aria-labelledby="user-feedback-error-title" aria-describedby="user-feedback-error-description">
				<div id="user-feedback-error-title" class="user-feedback-logo">%1$s</div>
				<p id="user-feedback-error-description">%2$s</p>
				<button class="user-feedback-button user-feedback-button-close user-feedback-button-gray">%3$s</button>
				<button class="user-feedback-wizard-close" aria-label="%4$s">%5$s</button>
			</div>',
			__( 'Feedback', 'user-feedback' ),
			__( 'Sadly an error occurred while sending your feedback. Please try again.', 'user-feedback' ),
			__( 'OK', 'user-feedback' ),
			__( 'Close', 'user-feedback' ),
			_x( 'X', 'close button', 'user-feedback' )
		);

		return apply_filters( 'user_feedback_templates', $templates );
	}

	/**
	 * Get the avatar URL based on the email address.
	 *
	 * @param string $email A user's email address.
	 *
	 * @param int    $size  Size of the avatar image. Defaults to 96px.
	 *
	 * @return string
	 */
	public static function get_avatar_url( $email, $size = 96 ) {
		$avatar = 'https://secure.gravatar.com/avatar/' . md5( $email );

		// Add size and default parameters
		$avatar = add_query_arg( array( 's' => absint( $size ), 'd' => 'mm' ), $avatar );

		return esc_url( $avatar );
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