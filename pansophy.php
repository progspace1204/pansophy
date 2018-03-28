<?php
/**
 * Plugin Name:       Pansophy
 * Description:       Full ChatGPT communication and AI generated images using the power of Dall-E-2.
 * Requires at least: 5.8
 * Requires PHP:      8.0
 * Version:           1.0.0
 * Author:            Mind2Matter
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pansophy
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


final class Pansophy {

	protected static $_instance = null;

	/**
	 * Class instance method
	 * ---------------------
	 *
	 * @return null|Pansophy
	 */
	public static function instance(): ?Pansophy {
		return null === self::$_instance ? ( self::$_instance = new self ) : self::$_instance;
	}

	public function __construct() {
		if ( ! function_exists( 'add_action' ) ) {
			header( 'Status: 403 Forbidden' );
			header( 'HTTP/1.1 403 Forbidden' );
			exit();
		}

		if ( defined( 'DOING_AJAX' ) && DOING_AJAX && ! empty( $_POST['action'] ) && ( $_POST['action'] === 'heartbeat' ) ) {
			return;
		}

		define( 'PANSOPHY_NAME', $this::plugin_data( 'Plugin Name' ) );
		define( 'PANSOPHY_SLUG', $this::plugin_data( 'Text Domain' ) );
		define( 'PANSOPHY_VERSION', $this::plugin_data( 'Version' ) );
		define( 'PANSOPHY_DIR', untrailingslashit( $this->plugin_path() ) . '/' );
		define( 'PANSOPHY_URL', untrailingslashit( plugins_url( basename( $this->plugin_path() ), basename( __FILE__ ) ) ) . '/' );

		$this->install();

		$this->autoload();

		add_action( 'init', [ $this, 'set_script_translations' ] );
		add_action( 'plugins_loaded', [ $this, 'load_plugin_textdomain' ] );
		add_action( 'plugins_loaded', [ $this, 'init_plugin' ] );
	}

	public function install(): void {
		if ( ! class_exists( 'Pansophy' ) ) {
			return;
		}

		register_activation_hook( basename( dirname( __FILE__ ) ) . '/' . basename( __FILE__ ), [ $this, 'activate' ] );
		register_deactivation_hook( basename( dirname( __FILE__ ) ) . '/' . basename( __FILE__ ), [
			$this,
			'deactivate'
		] );
	}

	/**
	 * Initialize the plugin
	 * ---------------------
	 */
	public function init_plugin(): void {
		if ( ! class_exists( 'Pansophy' ) ) {
			return;
		}
		add_action( 'after_switch_theme', 'flush_rewrite_rules', 15 );

		add_action( 'admin_init', [ $this, 'updater' ] );
		add_action( 'after_setup_theme', [ $this, 'include_functions' ], 30 );
		add_action( 'wp_enqueue_scripts', [ $this, 'frontend_scripts' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_scripts' ] );
	}

	private function autoload(): void {
		require PANSOPHY_DIR . 'vendor/autoload.php';
		new \Pansophy\Setup\Hooks();
	}

	public function activate(): void {
		flush_rewrite_rules();
		global $wpdb;
	    $charset_collate = $wpdb->get_charset_collate();
		
	    $table_name = $wpdb->prefix . 'chatgtp_data';

	    $sql = "CREATE TABLE " . $table_name . " (
		id bigint(50) NOT NULL AUTO_INCREMENT,
		question text NOT NULL,
		answer text NOT NULL,
		is_image BOOLEAN NOT NULL default 0,
		insert_time timestamp default current_timestamp not null,
		PRIMARY KEY  (id)
	    ) $charset_collate;";
	 
	    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
	    dbDelta($sql);
	}
	// public function generalSettings(): void {
	// 	flush_rewrite_rules();
	// 	global $wpdb;
	//     $charset_collate = $wpdb->get_charset_collate();
		
	//     $table_name = $wpdb->prefix . 'general_data';

	//     $sql = "CREATE TABLE " . $table_name . " (
	// 	id bigint(50) NOT NULL AUTO_INCREMENT,
	// 	question text NOT NULL,
	// 	answer text NOT NULL,
	// 	is_image BOOLEAN NOT NULL default 0,
	// 	insert_time timestamp default current_timestamp not null,
	// 	PRIMARY KEY  (id)
	//     ) $charset_collate;";
	 
	//     require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
	//     dbDelta($sql);
	// }

	public function deactivate(): void {
	}

	public function updater(): void {
		$version = get_option( 'pansophy__version' );
		if ( version_compare( (string) PANSOPHY_VERSION, $version, '>' ) ) {
			flush_rewrite_rules();
		}
	}

	public function load_plugin_textdomain(): void {
		load_plugin_textdomain( 'pansophy', false, basename( dirname( __FILE__ ) ) . '/languages' );
	}

	public function include_functions(): void {
	}

	public function frontend_scripts(): void {
		wp_enqueue_style( 'pansophy-google-fonts', 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap', false );
		wp_enqueue_style( 'pansophy-style', PANSOPHY_URL . 'build/index.css' );
		wp_enqueue_script( 'pansophy-script', PANSOPHY_URL . 'build/index.js', [
			'wp-element',
			'wp-i18n'
		], PANSOPHY_VERSION, true );

		wp_localize_script( 'pansophy-script', 'pansophy_data', [
			'plugin_dir_url' => plugin_dir_url( __FILE__ ),
			'pansophy_url'   => get_site_url() . '/wp-admin/admin.php?page=pansophy',
			'menu'           => $_GET['menu'] ?? 'home',
		] );
	}

	public function admin_scripts(): void {
		$screen = get_current_screen();
		if ( 'toplevel_page_pansophy' !== $screen?->id ) {
			//return;
		}
		wp_enqueue_style( 'pansophy-google-fonts', 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap', false );
		wp_enqueue_style( 'pansophy-style', PANSOPHY_URL . 'build/index.css' );
		wp_enqueue_script( 'pansophy-script', PANSOPHY_URL . 'build/index.js', [
			'wp-element',
			'wp-i18n'
		], PANSOPHY_VERSION, true );

		wp_localize_script( 'pansophy-script', 'pansophy_data', [
			'plugin_dir_url' => plugin_dir_url( __FILE__ ),
			'pansophy_url'   => get_site_url() . '/wp-admin/admin.php?page=pansophy',
			'menu'           => $_GET['menu'] ?? 'home',
			// "api_url"        => get_site_url() . '/wp-json'
			"api_url" => rest_url()


		] );
	}

	public function set_script_translations(): void {
	}

	public function plugin_path(): string {
		return untrailingslashit( plugin_dir_path( __FILE__ ) );
	}

	public static function plugin_data( $name ): ?string {
		$data = get_file_data( __FILE__, array( $name ), 'plugin' );

		return array_shift( $data );
	}

}

function pansophy(): ?Pansophy {
	return Pansophy::instance();
}

pansophy();


/**
* Define Plugins Contants
*/
define ( 'WPRK_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define ( 'WPRK_URL', trailingslashit( plugins_url( '/', __FILE__ ) ) );
/**
 * Loading Necessary Scripts
 */
add_action( 'admin_enqueue_scripts', 'load_scripts' );
function load_scripts() {
    wp_enqueue_script( 'Pansophy', WPRK_URL . 'dist/bundle.js', [ 'jquery', 'wp-element' ], wp_rand(), true );
    wp_localize_script( 'Pansophy', 'appLocalizer', [
        'apiUrl' => home_url( 'wp-json' ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
    ] );
}


add_action('init','delete_old_chatgpt_data');
add_action('delete_chatgpt_all_chat','delete_chatgpt_chat_func');

function delete_chatgpt_chat_func() {
    global $wpdb;
    $table = $wpdb->prefix . 'chatgtp_data';
	$sql = 'DELETE FROM '.$table.' WHERE 1=1';
    $wpdb->query( $sql );
}
function delete_old_chatgpt_data(){
 
	if(!wp_next_scheduled('delete_chatgpt_all_chat')) {
	 
		 wp_schedule_event (time(), 'every_seven_day', 'delete_chatgpt_all_chat');
	  }
  }
  
// Define the '7 dyas' interval
function custom_cron_intervals( $schedules ) {
	$cron_time = get_option('auto_delete');
    $cron_time = (int) $cron_time;
    $defaualt_time = 604800; // 7 days in seconds
    if( $cron_time > 0 ){
     	 $defaualt_time = $cron_time*60*60*24;
     }
     $schedules['every_seven_day'] = array(
    // 'interval' => $defaualt_time, 
	'interval' => 3600, 
    'display'  => __( 'Every Seven Days' ),
  );
     
  return $schedules;
}

add_filter( 'cron_schedules', 'custom_cron_intervals');
// user change cron time
function user_set_wp_cron_time(){
    $cron_time = get_option('auto_delete');
    $cron_time = (int) $cron_time;
     if( $cron_time > 0 ){
		// Delete the 'delete_chatgpt_all_chat' cron job
		$clear_status = wp_clear_scheduled_hook( 'delete_chatgpt_all_chat' );
 
		 if(!wp_next_scheduled('delete_chatgpt_all_chat')) {
	 		 
			 wp_schedule_event (time(), 'every_seven_day', 'delete_chatgpt_all_chat');
		  }
     	 return $clear_status;
     }
     return 2;
}
require_once WPRK_PATH . 'classes/class-create-settings-routes.php';
require_once WPRK_PATH . 'classes/class-general-settings-routes.php';
require_once WPRK_PATH . 'classes/class-chatgpt-plugin-routes.php';