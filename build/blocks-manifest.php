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
			'html' => false,
			'align' => array(
				'wide',
				'full'
			)
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
			'partialView' => array(
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
			),
			'contentOrientation' => array(
				'type' => 'string',
				'default' => 'orientation_one'
			),
			'columns' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => 3,
					'tablet' => 2,
					'mobile' => 1
				)
			),
			'height' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => 642,
					'tablet' => 642,
					'mobile' => 642
				)
			),
			'gap' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => 24,
					'tablet' => 48,
					'mobile' => 24
				)
			),
			'slideGroup' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => 1,
					'tablet' => 1,
					'mobile' => 1
				)
			),
			'autoPlay' => array(
				'type' => 'boolean',
				'default' => true
			),
			'delay' => array(
				'type' => 'number',
				'default' => 2000
			),
			'speed' => array(
				'type' => 'number',
				'default' => 600
			),
			'direction' => array(
				'type' => 'string',
				'default' => 'right'
			),
			'contentAlignment' => array(
				'type' => 'string',
				'default' => 'flex-start'
			),
			'preloader' => array(
				'type' => 'boolean',
				'default' => false
			),
			'equalHeight' => array(
				'type' => 'boolean',
				'default' => false
			),
			'onHover' => array(
				'type' => 'boolean',
				'default' => false
			),
			'linkOpen' => array(
				'type' => 'string',
				'default' => 'newTab'
			),
			'effect' => array(
				'type' => 'string',
				'default' => 'slide'
			),
			'adaptiveHeight' => array(
				'type' => 'boolean',
				'default' => false
			),
			'infiniteLoop' => array(
				'type' => 'boolean',
				'default' => true
			),
			'keyNavigation' => array(
				'type' => 'boolean',
				'default' => true
			),
			'freeScroll' => array(
				'type' => 'boolean',
				'default' => false
			),
			'navigationArrow' => array(
				'type' => 'boolean',
				'default' => true
			),
			'paginationDots' => array(
				'type' => 'boolean',
				'default' => true
			),
			'numberOfSlides' => array(
				'type' => 'number',
				'default' => 3
			),
			'arrowStyle' => array(
				'type' => 'string',
				'default' => 'chevron-solid'
			),
			'visibilityOnHover' => array(
				'type' => 'boolean',
				'default' => false
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
