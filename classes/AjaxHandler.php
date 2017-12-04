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
			wp_send_json_error( [
				'title'   => __( 'Oops, there was an error!', 'user-feedback' ),
				'message' => __( 'Your feedback could not be sent. Please try again!', 'user-feedback' ),
			] );
		}

		$defaults = ( new DataProvider() )->get_data();

		$data = wp_parse_args( $data, [
			'browser'     => false,
			'language'    => $defaults['language'],
			'message'     => '',
			'screenshot'  => false,
			'url'         => __( 'Unknown', 'user-feedback' ),
			'theme'       => $defaults['theme'],
			'third_party' => $defaults['third_party'],
			'user'        => $defaults['user'],
		] );

		$data['screenshot'] = $this->save_temp_image( (string) $data['screenshot'] );
		$message            = implode( "\n", array_map( 'sanitize_text_field', explode( "\n", $data['message'] ) ) );

		array_walk_recursive( $data, 'sanitize_text_field' );

		$data['user']['email'] = sanitize_email( $data['user']['email'] );
		$data['url']           = esc_url( $data['url'] );

		// Preserve line breaks in the message.
		$data['message'] = $message;

		/**
		 * Runs whenever there's new user feedback.
		 *
		 * The variable contains all the sanitized data received via the ajax request.
		 *
		 * @param array $feedback {
		 *     An array of feedback data.
		 *
		 *     @type array        $browser     Contains useful browser information like user agent, platform, and language.
		 *     @type string       $language    Current language setting of WordPress (or any multilingual plugin).
		 *     @type string       $message     Additional notes from the user.
		 *     @type string|false $screenshot  File name of the screenshot or false if none was provided.
		 *     @type string       $url         The URL from where the user submitted the feedback.
		 *     @type string       $theme       The active theme.
		 *     @type string       $third_party Any data added by third party plugins.
		 *     @type string       $user        Name and email address of the user (if provided) and his login status.
		 * }
		 */
		do_action( 'user_feedback_received', $data );

		// Remove the temporary file of the screenshot.
		if ( ! empty( $data['screenshot'] ) && is_file( $data['screenshot'] ) ) {
			unlink( $data['screenshot'] );
		}

		wp_send_json_success( [
			'title'   => __( 'Successfully sent!', 'user-feedback' ),
			'message' => sprintf(
				/* translators: %s: user's name */
				__( 'Hi %s, thanks for taking your time to send us your feedback. We will get back to you as quickly as possible.', 'user-feedback' ),
				esc_html( $data['user']['name'] )
			),
		] );
	}

	/**
	 * Save the submitted image as a temporary file.
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

		$filehandle = fopen( $tempfile, 'w+' );

		if ( ! $filehandle ) {
			if ( is_file( $tempfile ) ) {
				unlink( $tempfile );
			}

			return false;
		}

		fwrite( $filehandle, $img );
		fclose( $filehandle );

		// WordPress adds a .tmp file extension, but we want .png.
		$tempfile_no_ext = preg_replace( '|\.[^.]*$|', '', $tempfile );
		$tempfile_png    = $tempfile_no_ext . '.png';
		$renamed         = rename( $tempfile, $tempfile_png );

		if ( ! $renamed ) {
			unlink( $tempfile );

			return false;
		}

		return $tempfile_png;
	}
}
