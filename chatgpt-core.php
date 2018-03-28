<?php
/**
 * Plugin Name:       Testing Pansophy
 * Description:       Full ChatGPT communication and AI generated images using the power of Dall-E-2.
 * Requires at least: 5.8
 * Requires PHP:      8.0
 * Version:           1.0.0
 * Author:            Mind2Matter
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pansophy
 */

add_action( 'admin_menu', 'cgc_init_menu' );

/**
 * Init Admin Menu.
 *
 * @return void
 */
function cgc_init_menu() {
	add_menu_page( __( 'Pansophy', 'pansophy' ), __( 'Pansophy', 'pansophy' ), 'manage_options',
		'pansophy', 'cgc_admin_page', 'dashicons-admin-post', '2.1' );
}

/**
 * Init Admin Page.
 *
 * @return void
 */
function cgc_admin_page() {
	require_once plugin_dir_path( __FILE__ ) . 'templates/pansophy-settings.php';
}

add_action( 'admin_enqueue_scripts', 'cgc_admin_enqueue_scripts' );

/**
 * Enqueue scripts and styles.
 *
 * @return void
 */
function cgc_admin_enqueue_scripts() {
	wp_enqueue_style( 'cgc-google-fonts',
		'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap', false );
	wp_enqueue_style( 'cgc-style', plugin_dir_url( __FILE__ ) . 'build/index.css' );
	wp_enqueue_script( 'cgc-script', plugin_dir_url( __FILE__ ) . 'build/index.js', array( 'wp-element' ), '1.0.0',
		true );

	wp_localize_script('cgc-script', 'pansophy_data', [
		'plugin_dir_url' => plugin_dir_url( __FILE__ ),
	]);
}