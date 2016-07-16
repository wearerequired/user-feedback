<?php
/**
 * Separate init file that isn't compatible with PHP 5.3 or lower.
 *
 * @package Required\User_Feedback
 */

/**
 * Returns the User Feedback controller instance.
 *
 * @since 2.0.0
 *
 * @return \Required\User_Feedback\Controller
 */
function user_feedback() {
	static $controller = null;

	if ( null === $controller ) {
		$controller = new \Required\User_Feedback\Controller();
	}

	return $controller;
}

// Initialize the plugin.
add_action( 'plugins_loaded', [ user_feedback(), 'add_hooks' ] );