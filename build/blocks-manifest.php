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
			),
			'iconSize' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => 16,
					'tablet' => 16,
					'mobile' => 16
				)
			),
			'iconWidth' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => 40,
					'tablet' => 40,
					'mobile' => 40
				)
			),
			'iconHeight' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => 40,
					'tablet' => 40,
					'mobile' => 40
				)
			),
			'spaceBetweenArrow' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => 100,
					'tablet' => 100,
					'mobile' => 100
				)
			),
			'horizontalPosition' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => 44,
					'tablet' => 0,
					'mobile' => 0
				)
			),
			'verticalPosition' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => 50,
					'tablet' => 50,
					'mobile' => 50
				)
			),
			'navArrowStyleType' => array(
				'type' => 'string',
				'default' => 'normal'
			),
			'iconColor' => array(
				'type' => 'string',
				'default' => '#fff'
			),
			'iconHoverColor' => array(
				'type' => 'string',
				'default' => '#fff'
			),
			'iconBackGroundColor' => array(
				'type' => 'string',
				'default' => '#4e4f52'
			),
			'iconBackGroundHoverColor' => array(
				'type' => 'string',
				'default' => '#4e6e3e'
			),
			'borderStyle' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'borderWidth' => array(
				'type' => 'number',
				'default' => array(
					'desktop' => 0,
					'tablet' => 0,
					'mobile' => 0
				)
			),
			'borderColor' => array(
				'type' => 'string',
				'default' => '#11111'
			),
			'borderRadius' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => array(
						'top' => 50,
						'right' => 50,
						'bottom' => 50,
						'left' => 50,
						'linked' => true
					),
					'tablet' => array(
						'top' => 50,
						'right' => 50,
						'bottom' => 50,
						'left' => 50,
						'linked' => true
					),
					'mobile' => array(
						'top' => 50,
						'right' => 50,
						'bottom' => 50,
						'left' => 50,
						'linked' => true
					)
				)
			),
			'showBoxShadow' => array(
				'type' => 'boolean',
				'default' => false
			),
			'boxShadow' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => array(
						'xOffset' => 0,
						'yOffset' => 0,
						'blur' => 0,
						'spread' => 0,
						'linked' => false,
						'type' => 'outset'
					),
					'tablet' => array(
						'xOffset' => 0,
						'yOffset' => 0,
						'blur' => 0,
						'spread' => 0,
						'linked' => false,
						'type' => 'outset'
					),
					'mobile' => array(
						'xOffset' => 0,
						'yOffset' => 0,
						'blur' => 0,
						'spread' => 0,
						'linked' => false,
						'type' => 'outset'
					)
				)
			),
			'shadowColor' => array(
				'type' => 'string',
				'default' => '#d6d8de'
			),
			'paginationStyle' => array(
				'type' => 'string',
				'default' => 'dots'
			),
			'paginationWidth' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => 12,
					'tablet' => 12,
					'mobile' => 12
				)
			),
			'paginationHeight' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => 12,
					'tablet' => 12,
					'mobile' => 12
				)
			),
			'paginationDotGap' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => 6,
					'tablet' => 6,
					'mobile' => 6
				)
			),
			'paginationVerticalPosition' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => -36,
					'tablet' => -36,
					'mobile' => -36
				)
			),
			'paginationHorizontalPosition' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => 50,
					'tablet' => 50,
					'mobile' => 50
				)
			),
			'paginationDotStyleType' => array(
				'type' => 'string',
				'default' => 'normal'
			),
			'dotNormalTextColor' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'dotActiveTextColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'dotNormalBackGroundNormalColor' => array(
				'type' => 'string',
				'default' => '#cacbcf'
			),
			'dotNormalBackGroundActiveColor' => array(
				'type' => 'string',
				'default' => '#4E6E3E'
			),
			'paginationBorderStyle' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'paginationHover' => array(
				'type' => 'string',
				'default' => 'normal'
			),
			'allContentArray' => array(
				'type' => 'array',
				'default' => array(
					array(
						'id' => '1',
						'value' => 'category',
						'label' => 'Taxonomy (Category)'
					),
					array(
						'id' => '2',
						'value' => 'title',
						'label' => 'Title'
					),
					array(
						'id' => '3',
						'value' => 'meta',
						'label' => 'Meta Data'
					),
					array(
						'id' => '4',
						'value' => 'excerpt',
						'label' => 'Excerpt'
					),
					array(
						'id' => '5',
						'value' => 'readMore',
						'label' => 'Read More'
					),
					array(
						'id' => '6',
						'value' => 'social',
						'label' => 'Social Share'
					)
				)
			),
			'metaDataAllContentArray' => array(
				'type' => 'array',
				'default' => array(
					array(
						'id' => '1',
						'value' => 'author',
						'label' => 'Author',
						'show' => true,
						'position' => 'left'
					),
					array(
						'id' => '2',
						'value' => 'date',
						'label' => 'Date',
						'show' => true,
						'position' => 'left'
					),
					array(
						'id' => '3',
						'value' => 'comments',
						'label' => 'Comments',
						'show' => true,
						'position' => 'right'
					),
					array(
						'id' => '4',
						'value' => 'views',
						'label' => 'Views',
						'show' => true,
						'position' => 'right'
					),
					array(
						'id' => '5',
						'value' => 'likes',
						'label' => 'Likes',
						'show' => true,
						'position' => 'right'
					),
					array(
						'id' => '6',
						'value' => 'reading-time',
						'label' => 'Reading Time',
						'show' => true,
						'position' => 'left'
					)
				)
			),
			'metaDisplayType' => array(
				'type' => 'string',
				'default' => 'inline'
			),
			'authorDisplayStyle' => array(
				'type' => 'string',
				'default' => 'iconName'
			),
			'authorIcon' => array(
				'type' => 'string',
				'default' => 'outline'
			),
			'metaColor' => array(
				'type' => 'string',
				'default' => '#4e6e3e'
			),
			'dateFormat' => array(
				'type' => 'string',
				'default' => 'default'
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
