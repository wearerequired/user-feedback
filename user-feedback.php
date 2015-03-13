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
		// Register post type
		add_action( 'init', array( __CLASS__, 'register_post_type' ) );

		// Load the scripts & styles
		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'enqueue_scripts' ) );

		add_action( 'wp_footer', array( __CLASS__, 'print_templates' ) );

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
	 * @return int|WP_Error
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
	 * @type string $message  Additional notes from the user.
	 * }
	 */
	public static function process_feedback( $feedback ) {

		// Insert post
		$post_id = wp_insert_post( array(
			'post_type'    => 'user_feedback',
			'post_content' => sanitize_text_field( $feedback['message'] ),
			'post_status'  => 'publish',
		) );

		// Store the feedback data as post meta
		$postmeta = array(
			'user_feedback_url'      => esc_url_raw( $feedback['url'] ),
			'user_feedback_browser'  => sanitize_text_field( $feedback['browser']['name'] ),
			'user_feedback_platform' => sanitize_text_field( $feedback['browser']['platform'] ),
			'user_feedback_language' => sanitize_text_field( $feedback['language'] ),
			//'user_feedback_user_name' => sanitize_text_field( $feedback['user_name'] ),
			//'user_feedback_user_email' => sanitize_email( $feedback['user_email'] ),
			'user_feedback_data'     => array(
				'browser' => array_map( 'sanitize_text_field', $feedback['browser'] ),
				'theme'   => array_map( 'sanitize_text_field', $feedback['theme'] ),
			)
		);

		foreach ( $postmeta as $key => $value ) {
			add_post_meta( $post_id, $key, $value, true );
		}

		// Upload the image
		$attachments = array();
		$img         = self::save_image( $feedback['img'], $post_id );

		if ( ! is_wp_error( $img ) ) {
			$attachments[] = get_attached_file( $img );

			// Set the attached screenshot as post thumbnail
			set_post_thumbnail( $post_id, $img );
		} else {
			$img = array(
				'url' => __( '(upload did not work)', 'user-feedback' )
			);
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
			'canvas_options' => array(
				'strokeStyle'   => 'black',
				'shadowColor'   => 'black',
				'shadowOffsetX' => 1,
				'shadowOffsetY' => 1,
				'shadowBlur'    => 10,
				'lineJoin'      => 'bevel',
				'lineWidth'     => 3,
			),
			'templates'      => array(
				'button'      => array(
					'label' => __( 'Feedback', 'user-feedback' ),
				),
				'bottombar'   => array(
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
				'wizardStep1' => array(
					'title'       => _x( 'Feedback', 'modal title', 'user-feedback' ),
					'salutation'  => __( 'Hello stranger', 'user-feedback' ),
					'intro'       => __( 'Tell us your name and email to fully support you here:', 'user-feedback' ),
					'placeholder' => array(
						'name'  => _x( 'Your Name', 'input field placeholder', 'user-feedback' ),
						'email' => _x( 'Your Email', 'input field placeholder', 'user-feedback' ),
					),
					'button'      => array(
						'primary'   => __( 'Next', 'user-feedback' ),
						'secondary' => __( 'No thanks', 'user-feedback' ),
						'close'     => _x( 'X', 'close button', 'user-feedback' ),
						'closeAria' => _x( 'Close', 'close button title text and aria label', 'user-feedback' )
					),
				),
				'wizardStep2' => array(
					'title'      => _x( 'Feedback', 'modal title', 'user-feedback' ),
					'salutation' => __( 'Hello stranger', 'user-feedback' ),
					'intro'      => __( 'Please help us understand your feedback better!', 'user-feedback' ),
					'intro2'     => __( 'You can not only leave us a message but also highlight areas relevant to your feedback.', 'user-feedback' ),
					'inputLabel' => __( "Don't show me this again", 'user-feedback' ),
					'button'     => array(
						'primary'   => __( 'Next', 'user-feedback' ),
						'close'     => _x( 'X', 'close button', 'user-feedback' ),
						'closeAria' => _x( 'Close', 'close button title text and aria label', 'user-feedback' )
					),
				),
				'wizardStep3' => array(
					'title'       => _x( 'Leave a message', 'modal title', 'user-feedback' ),
					'placeholder' => array(
						'message' => _x( 'Your message here…', 'textarea placeholder', 'user-feedback' ),
					),
					'button'      => array(
						'primary'   => __( 'Next', 'user-feedback' ),
						'close'     => _x( 'X', 'close button', 'user-feedback' ),
						'closeAria' => _x( 'Close', 'close button title text and aria label', 'user-feedback' )
					),
				),
				'wizardStep4' => array(
					'title'  => _x( 'Highlight area', 'modal title', 'user-feedback' ),
					'intro'  => __( 'You can now highlight the areas relevant to your feedback.', 'user-feedback' ),
					'button' => array(
						'primary'   => __( 'Take screenshot', 'user-feedback' ),
						'close'     => _x( 'X', 'close button', 'user-feedback' ),
						'closeAria' => _x( 'Close', 'close button title text and aria label', 'user-feedback' )
					),
				),
				'wizardStep5' => array(
					'title'         => _x( 'Feedback', 'modal title', 'user-feedback' ),
					'screenshotAlt' => _x( 'Annotated Screenshot', 'alt text', 'user-feedback' ),
					'user'          => array(
						'by'          => _x( 'by ', 'by user xy', 'user-feebdack' ),
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
				'wizardStep6' => array(
					'title'  => _x( 'Feedback', 'modal title', 'user-feedback' ),
					'intro'  => __( 'Thanks for your kind feedback. We will examine it and get back to you in 24h.', 'user-feedback' ),
					'intro2' => __( 'The required+ support team', 'user-feedback' ),
					'button' => array(
						'primary'   => __( 'Done', 'user-feedback' ),
						'secondary' => __( 'Leave another message', 'user-feedback' ),
					),
				)
			),
		) ) );

	}

	public static function get_template( $id, $content ) {
		return "<script type='text/template' id='user-feedback-template-$id'>$content</script>";
	}

	/**
	 * Prints the HTML templates used by the feedback JavaScript.
	 */
	public static function print_templates() {
		// Our main container
		echo '<div id="user-feedback-container"></div>';

		// The modal structure, with an container element that will contain all tabs
		echo self::get_template(
			'modal',
			'<div class="user-feedback-modal__container"></div>'
		);

		// The Feedback button
		echo self::get_template(
			'button',
			'<button
				id="user-feedback-init-button"
				class="user-feedback-button user-feedback-button-gray">
				<%= label %>
			</button>'
		);

		// The bottom bar
		// todo: Clicking on a step should go to that step in the wizard
		echo self::get_template(
			'bottombar',
			'<div id="user-feedback-bottombar">
				<ul id="user-feedback-bar-steps">
					<li class="user-feedback-bar-step"><%= step.one %></li>
					<li class="user-feedback-bar-step hidden"><%= step.two %></li>
					<li class="user-feedback-bar-step hidden"><%= step.three %></li>
				</ul>
				<button class="user-feedback-button user-feedback-button-help" title="<%= button.helpAria %>" aria-label="<%= button.helpAria %>"><%= button.help %></button>
			</div>'
		);

		// Wizard Step 1
		echo self::get_template(
			'wizard-step-1',
			'<div class="user-feedback-modal user-feedback-modal-pointer" role="dialog">
				<div class="user-feedback-modal__topbar">
					<h3 class="user-feedback-modal-title"><%= title %></h3>
					<button class="user-feedback-button-close" title="<%= button.closeAria %>" aria-label="<%= button.closeAria %>"><%= button.close %></button>
				</div>
				<p><%= salutation %></p>
				<p><%= intro %></p>
				<p>
				<input type="text" class="user-feedback-input" id="user-feedback-user-name" placeholder="<%= placeholder.name %>">
				<input type="email" class="user-feedback-input" id="user-feedback-user-email" placeholder="<%= placeholder.email %>">
				</p>
				<div class="user-feedback-modal__bottombar">
			      <button class="user-feedback-button user-feedback-button-next"><%= button.primary %></button>
			      <button class="user-feedback-button user-feedback-button-previous"><%= button.secondary %></button>
			    </div>
			</div>'
		);

		// Wizard Step 2
		echo self::get_template(
			'wizard-step-2',
			'<div class="user-feedback-modal user-feedback-modal-pointer" role="dialog">
				<div class="user-feedback-modal__topbar">
					<h3 class="user-feedback-modal-title"><%= title %></h3>
					<button class="user-feedback-button-close" title="<%= button.closeAria %>" aria-label="<%= button.closeAria %>"><%= button.close %></button>
				</div>
				<p><%= salutation %></p>
				<p><%= intro %></p>
				<p><%= intro2 %></p>
				<p>
					<input type="checkbox" value="1" id="user-feedback-do-not-show-again" />
					<label for="user-feedback-do-not-show-again"><%= inputLabel %></label>
				</p>
				<div class="user-feedback-modal__bottombar">
			      <button class="user-feedback-button user-feedback-button-next"><%= button.primary %></button>
			    </div>
			</div>'
		);

		// Wizard Step 3
		echo self::get_template(
			'wizard-step-3',
			'<div class="user-feedback-modal user-feedback-modal-pointer" role="dialog">
				<div class="user-feedback-modal__topbar">
					<h3 class="user-feedback-modal-title"><%= title %></h3>
					<button class="user-feedback-button-close" title="<%= button.closeAria %>" aria-label="<%= button.closeAria %>"><%= button.close %></button>
				</div>
				<p>
					<textarea id="user-feedback-message" class="user-feedback-textarea" placeholder="<%= placeholder.message %>"></textarea>
				</p>
				<div class="user-feedback-modal__bottombar">
			      <button class="user-feedback-button user-feedback-button-next"><%= button.primary %></button>
			    </div>
			</div>'
		);

		// Wizard Step 4
		echo self::get_template(
			'wizard-step-4',
			'<div class="user-feedback-modal user-feedback-modal-pointer" role="dialog">
				<div class="user-feedback-modal__topbar">
					<h3 class="user-feedback-modal-title"><%= title %></h3>
					<button class="user-feedback-button-close" title="<%= button.closeAria %>" aria-label="<%= button.closeAria %>"><%= button.close %></button>
				</div>
				<p><%= intro %></p>
				<div class="user-feedback-modal__bottombar">
			      <button class="user-feedback-button user-feedback-button-screen-capture"><%= button.primary %></button>
			    </div>
			</div>'
		);

		// Wizard Step 4 (Canvas Part)
		echo self::get_template(
			'wizard-step-4-canvas',
			'<canvas id="user-feedback-canvas"></canvas><div id="user-feedback-helpers"></div>'
		);

		// Wizard Step 5
		echo self::get_template(
			'wizard-step-5',
			'<div class="user-feedback-modal user-feedback-modal-center" role="dialog">
				<div class="user-feedback-modal__topbar">
					<h3 class="user-feedback-modal-title"><%= title %></h3>
				</div>
				<div id="user-feedback-overview-description">
					<div id="user-feedback-overview-user">
						<img src="" width="40" height="40" alt="<%= user.gravatarAlt %>" />
						<div><%= user.by %></div>
					</div>
					<textarea id="user-feedback-overview-note" class="user-feedback-textarea"></textarea>
					<ul class="user-feedback-additional-notes">
						<li id="user-feedback-additional-theme"><%= details.theme %></li>
						<li id="user-feedback-additional-browser"><%= details.browser %></li>
						<li id="user-feedback-additional-template"><%= details.template %></li>
						<li id="user-feedback-additional-language"><%= details.language %></li>
					</ul>
				</div>
				<div id="user-feedback-overview-screenshot">
					<img id="user-feedback-overview-screenshot-img" src="" alt="<%= screenshotAlt %>" />
				</div>
				<div class="user-feedback-modal__bottombar">
			      <button class="user-feedback-button user-feedback-button-next"><%= button.primary %></button>
			      <button class="user-feedback-button user-feedback-button-previous"><%= button.secondary %></button>
			    </div>
			</div>'
		);

		// Wizard Step 6
		echo self::get_template(
			'wizard-step-6',
			'<div class="user-feedback-modal user-feedback-modal-center" role="dialog">
				<div class="user-feedback-modal__topbar">
					<h3 class="user-feedback-modal-title"><%= title %></h3>
				</div>
				<p><%= intro %></p>
				<p><%= intro2 %></p>
				<div class="user-feedback-modal__bottombar">
			      <button class="user-feedback-button user-feedback-button-next"><%= button.primary %></button>
			      <button class="user-feedback-button user-feedback-button-previous"><%= button.secondary %></button>
			    </div>
			</div>'
		);
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