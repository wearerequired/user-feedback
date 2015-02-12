<?php
/**
 * Delete all data when the plugin is uninstalled.
 *
 * @todo What happens to attachments?
 *
 * @package   User_Feedback
 * @author    Pascal Birchler <pascal@required.ch>
 * @license   GPL-2.0+
 * @link      https://github.com/wearerequired/user-feedback/
 * @copyright 2015 required gmbh
 */

// If uninstall, not called from WordPress, then exit
defined( 'WP_UNINSTALL_PLUGIN' ) or die;

/** @var WP_Post[] $posts */
$posts = get_posts( array( 'post_type' => 'user_feedback', 'posts_per_page' => -1 ) );
foreach ( $posts as $post ) {
	wp_delete_post( $post->ID );
}