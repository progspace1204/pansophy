<?php

namespace Pansophy\Pansophy;

class PansophyModel {

	public function init() {
		add_action( 'admin_footer', [ $this, 'load_template' ] );
		add_action( 'wp_footer', [ $this, 'load_template' ] );
	}

	public function load_template() {
		require_once PANSOPHY_DIR . 'templates/pansophy-app.php';
	}

}