<?php
/**
 * Plugin Name: User Feedback
 * Plugin URI:  https://github.com/wearerequired/user-feedback/
 * Description: Allows users to submit feedback and bug reports anywhere on the site using an interactive feedback button.
 * Version:     1.1.0
 * Author:      required+
 * Author URI:  http://required.ch
 * License:     GPLv2+
 * Text Domain: user-feedback
 * Domain Path: /languages
 *
 * @package User_Feedback
 */

/**
 * Copyright (c) 2015 required+ (email : support@required.ch)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2 or, at
 * your discretion, any later version, as published by the Free
 * Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

defined( 'WPINC' ) or die;

include( dirname( __FILE__ ) . '/lib/requirements-check.php' );

$user_feedback_requirements_check = new User_Feedback_Requirements_Check( array(
	'title' => 'User Feedback',
	'php'   => '5.3',
	'wp'    => '4.0',
	'file'  => __FILE__,
) );

if ( $user_feedback_requirements_check->passes() ) {
	// Pull in the plugin classes and initialize.
	include( dirname( __FILE__ ) . '/lib/wp-stack-plugin.php' );
	include( dirname( __FILE__ ) . '/classes/plugin.php' );
	User_Feedback_Plugin::start( __FILE__ );
}

unset( $user_feedback_requirements_check );
