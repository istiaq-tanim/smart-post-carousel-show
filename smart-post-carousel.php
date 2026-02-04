<?php

/**
 * Plugin Name:       Smart Post Carousel
 * Description:       A post Carousel for showcasing Posts.
 * Version:           1.0.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Kazi Istiaq mahamud
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       smart-post-carousel
 *
 * @package CreateBlock
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

function smart_list_register_block_category($categories, $post)
{
	return array_merge(
		$categories,
		[
			[
				'slug'  => 'smart-post-carousel',
				'title' => __('Smart Post', 'smart-post-carousel'),
				'icon'  => null
			]
		]
	);
}
add_filter('block_categories_all', 'smart_list_register_block_category', 10, 2);
function create_block_smart_post_carousel_block_init()
{
	wp_register_block_types_from_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
}
add_action('init', 'create_block_smart_post_carousel_block_init');
