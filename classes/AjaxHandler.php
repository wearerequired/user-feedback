<?php
/**
 * Holds the ajax handler.
 *
 * @package Required\User_Feedback
 */

namespace Required\User_Feedback;

/**
 * Ajax requests handler.
 */
class AjaxHandler {
	/**
	 * Ajax callback for user feedback.
	 */
	public function handle_submission() {
		$data = json_decode( file_get_contents( 'php://input' ), true );

		if ( ! $data ) {
			wp_send_json_error( array(
				'title'   => __( 'Oops, there was an error!', 'user-feedback' ),
				'message' => __( 'Your feedback could not be sent. Please try again!', 'user-feedback' ),
			) );
		}

		array_walk_recursive( $data, 'sanitize_text_field' );

		$data['screenshot'] = ( isset( $data['screenshot'] ) ) ? $this->save_temp_image( (string) $data['screenshot'] ) : false;

		/**
		 * Runs whenever there's new user feedback.
		 *
		 * The variable contains all the data received via the ajax request.
		 *
		 * @param array $feedback          {
		 *
		 * @type array  $browser           Contains useful browser information like user agent, platform, and online status.
		 * @type string $url               The URL from where the user submitted the feedback.
		 * @type string $theme             The active theme.
		 * @type string $site_language     Current language setting of WordPress (or any multilingual plugin).
		 * @type string $browser_languages Current language setting of the visitor.
		 * @type string $third_party       Any data added by third party plugins.
		 * @type string $message           Additional notes from the user.
		 * @type string $img               Temporary file name of the screenshot or false if saving wasn't possible.
		 * @type string $user              Name and email address of the user (if provided).
		 * }
		 */
		do_action( 'user_feedback_received', $data );

		wp_send_json_success( array(
			'title'   => __( 'Successfully sent!', 'user-feedback' ),
			/* translators: %s: user's name */
			'message' => sprintf(
				__( 'Hi %s, thanks for taking your time to send us your feedback. We will get back to you as quickly as possible.', 'user-feedback' ),
				esc_html( $data['user']['name'] )
			),
		) );
	}

	/**
	 * Save the submitted image as a temporary file.
	 *
	 * @todo Revisit file handling.
	 *
	 * @param string $img Base64 encoded image.
	 *
	 * @return false|string File name on success, false on failure.
	 */
	protected function save_temp_image( $img ) {
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
		 * @var \WP_Filesystem_Base $wp_filesystem
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
}
