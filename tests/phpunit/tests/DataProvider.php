<?php

namespace Required\User_Feedback\Tests;

class DataProvider extends \WP_UnitTestCase {
	function _filter_user_feedback_support_data( $data ) {
		return [
			'foo' => 'bar',
			'bar' => [ 'baz' ],
		];
	}

	function test_should_return_the_ajax_url() {
		$data = ( new \Required\User_Feedback\DataProvider() )->get_data();

		$this->assertEquals( admin_url( 'admin-ajax.php' ) . '?action=user_feedback_submit', $data['ajax_url'] );
	}

	function test_should_return_the_site_language() {
		$data = ( new \Required\User_Feedback\DataProvider() )->get_data();

		$this->assertEquals( get_bloginfo( 'language' ), $data['language'] );
	}

	function test_should_return_anonymous_user_data() {
		$data = ( new \Required\User_Feedback\DataProvider() )->get_data();

		$this->assertEqualSets( [
			'logged_in' => false,
			'name'      => __( 'Anonymous', 'user-feedback' ),
			'email'     => false,
		], $data['user'] );
	}

	function test_should_return_logged_in_user_data() {
		$current_user = get_current_user_id();

		wp_set_current_user( $this->factory->user->create( [
			'display_name' => 'John Doe',
			'user_email'   => 'johndoe@required.ch',
			'role'         => 'administrator',
		] ) );

		$data = ( new \Required\User_Feedback\DataProvider() )->get_data();

		wp_set_current_user( $current_user );

		$this->assertEqualSets( [
			'logged_in' => true,
			'name'      => 'John Doe',
			'email'     => 'johndoe@required.ch',
		], $data['user'] );
	}

	function test_should_return_third_party_data() {
		add_filter( 'user_feedback_support_data', [ $this, '_filter_user_feedback_support_data' ] );
		$data = ( new \Required\User_Feedback\DataProvider() )->get_data();
		remove_filter( 'user_feedback_support_data', [ $this, '_filter_user_feedback_support_data' ] );

		$this->assertEquals( [
			'foo' => 'bar',
			'bar' => [ 'baz' ],
		], $data['third_party'] );
	}

	function test_should_return_info_for_anonymous_user() {
		$data = ( new \Required\User_Feedback\DataProvider() )->get_data();

		$this->assertEqualSets( [
			'logged_in' => false,
			'name'      => __( 'Anonymous', 'user-feedback' ),
			'email'     => false,
		], $data['user'] );
	}

	function test_should_return_get_template_vars() {
		$data = ( new \Required\User_Feedback\DataProvider() )->get_data()['templates'];

		$this->assertArrayHasKey( 'button', $data );
		$this->assertArrayHasKey( 'bubble', $data );
		$this->assertArrayHasKey( 'intro', $data );
		$this->assertArrayHasKey( 'form', $data );
		$this->assertArrayHasKey( 'done', $data );
	}
}
