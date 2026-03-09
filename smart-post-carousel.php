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

add_action(
	'enqueue_block_editor_assets',
	function () {
		wp_enqueue_style(
			'sp-social-share-icons-editor',
			plugins_url( 'assets/css/icon.css', __FILE__ ),
			array(),
			'1.0.0'
		);
	}
);

add_action(
	'wp_enqueue_scripts',
	function () {
		if ( ! has_block( 'smart-post-carousel/carousel' ) ) {
			return;
		}

		wp_enqueue_style(
			'sp-social-share-icons-frontend',
			plugins_url( 'assets/css/icon.css', __FILE__ ),
			array(),
			'1.0.0'
		);
	}
);

add_action(
	'init',
	function () {
		$badge_labels = array(
			'name'              => __( 'Badges', 'smart-post-carousel' ),
			'singular_name'     => __( 'Badge', 'smart-post-carousel' ),
			'search_items'      => __( 'Search Badges', 'smart-post-carousel' ),
			'all_items'         => __( 'All Badges', 'smart-post-carousel' ),
			'parent_item'       => __( 'Parent Badge', 'smart-post-carousel' ),
			'parent_item_colon' => __( 'Parent Badge:', 'smart-post-carousel' ),
			'edit_item'         => __( 'Edit Badge', 'smart-post-carousel' ),
			'update_item'       => __( 'Update Badge', 'smart-post-carousel' ),
			'add_new_item'      => __( 'Add New Badge', 'smart-post-carousel' ),
			'new_item_name'     => __( 'New Badge Name', 'smart-post-carousel' ),
			'menu_name'         => __( 'Badges', 'smart-post-carousel' ),
		);

		$badge_args = array(
			'hierarchical'      => true,
			'labels'            => $badge_labels,
			'show_ui'           => true,
			'show_admin_column' => true,
			'query_var'         => true,
			'rewrite'           => array( 'slug' => 'sp-badge' ),
			'show_in_rest'      => true,
		);

		register_taxonomy( 'sp_smart_badges', array( 'post' ), $badge_args );

		register_term_meta(
			'sp_smart_badges',
			'position',
			array(
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'string',
				'default'       => 'before',
				'auth_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	},
);

/**
 * AJAX handler
 */
require_once plugin_dir_path( __FILE__ ) . 'includes/class-ajax-query.php';

add_action(
	'init',
	function () {
		SP_Smart_Content_Ajax_Query::instance();
	},
);