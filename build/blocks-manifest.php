<?php
// This file is generated. Do not modify it manually.
return array(
	'smart-post-carousel' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/smart-post-carousel',
		'version' => '0.1.0',
		'title' => 'Smart Post Carousel',
		'category' => 'smart-post-carousel',
		'description' => 'Display posts in a responsive carousel with smooth navigation.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'showReadMore' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showTitle' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showTaxonomy' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showMetaData' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showExcerpt' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showSocialShare' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showFeaturedImage' => array(
				'type' => 'boolean',
				'default' => false
			),
			'carouselStyle' => array(
				'type' => 'string',
				'default' => 'standard'
			)
		),
		'render' => 'file:./render.php',
		'textdomain' => 'smart-post-carousel',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
