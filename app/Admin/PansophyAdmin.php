<?php

namespace Pansophy\Admin;

class PansophyAdmin {


	public function init() {
		add_action( 'admin_menu', [ $this, 'init_menu' ] );
	}

	public function init_menu() {
		add_menu_page( __( 'Pansophy', 'pansophy' ), __( 'Pansophy', 'pansophy' ), 'manage_options',
			'pansophy', [ $this, 'admin_page' ], 'dashicons-admin-post', '2.1' );
	}

	/**
	 * Init Admin Page.
	 *
	 * @return void
	 */
	public function admin_page() {
		require_once PANSOPHY_DIR . 'templates/pansophy-settings.php';
	}
}