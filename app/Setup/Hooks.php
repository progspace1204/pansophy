<?php

namespace Pansophy\Setup;

use Pansophy\Admin\PansophyAdmin;
use Pansophy\Pansophy\PansophyModel;

class Hooks {
	public function __construct() {
		$pansophy_admin = new PansophyAdmin();
		add_action( 'init', [ $pansophy_admin, 'init' ] );

		$pansophy_model = new PansophyModel();
		add_action( 'init', [ $pansophy_model, 'init' ] );
	}
}