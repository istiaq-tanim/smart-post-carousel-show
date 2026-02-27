<?php
/**
 * Plugin Name:       Smart Post Carousel
 * Description:       A post Carousel for showcasing Posts.
 * Version:           1.0.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Kazi Istiaq Mahamud
 * License:           GPL-2.0-or-later
 * Text Domain:       smart-post-carousel
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register block category
 */
add_filter(
	'block_categories_all',
	function ( $categories ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'smart-post-carousel',
					'title' => __( 'Smart Post', 'smart-post-carousel' ),
				),
			)
		);
	},
	10
);

/**
 * Register blocks
 */
add_action(
	'init',
	function () {
		wp_register_block_types_from_metadata_collection(
			__DIR__ . '/build',
			__DIR__ . '/build/blocks-manifest.php'
		);
	}
);

/**
 * Enqueue editor assets + AJAX data
 */
add_action(
	'enqueue_block_editor_assets',
	function () {
		wp_enqueue_style(
			'font-awesome',
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
			array(),
			'6.5.0'
		);

		wp_enqueue_script(
			'spcp-editor-script',
			plugins_url( 'build/index.js', __FILE__ ),
			array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data' ),
			'1.0.0',
			true
		);

		wp_localize_script(
			'spcp-editor-script',
			'sp_smart_post_block_localize',
			array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce'    => wp_create_nonce( 'sp_content_ajax_nonce' ),
			)
		);
	}
);

/**
 * Enqueue frontend assets
 */
add_action(
	'wp_enqueue_scripts',
	function () {
		if ( ! has_block( 'smart-post-carousel/carousel' ) ) {
			return;
		}

		wp_enqueue_style(
			'font-awesome',
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
			array(),
			'6.5.0'
		);

		wp_enqueue_script(
			'smart-post-carousel-frontend',
			plugins_url( 'build/frontend.js', __FILE__ ),
			array( 'jquery' ),
			'1.0.0',
			true
		);

		wp_localize_script(
			'smart-post-carousel-frontend',
			'smartCarouselData',
			array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce'    => wp_create_nonce( 'sp_content_ajax_nonce' ),
			)
		);
	}
);

/**
 * AJAX handler
 */
require_once plugin_dir_path( __FILE__ ) . 'includes/class-ajax-query.php';

add_action(
	'init',
	function () {
		SP_Smart_Content_Ajax_Query::instance();
	}
);
