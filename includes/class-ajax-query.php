<?php
/**
 * AJAX Content Query Handler
 * Handles AJAX requests for posts, pages, and media with:
 *  - Default filters  : post type (posts/pages/media), quick query
 *  - Advanced filters : taxonomy, date, keyword, custom fields
 *
 * @package Smart_Post_Show_Pro
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'SP_Smart_Content_Ajax_Query' ) ) {

	/**
	 * SP_Smart_Content_Ajax_Query class.
	 */
	class SP_Smart_Content_Ajax_Query {

		/**
		 * Singleton instance.
		 *
		 * @var SP_Smart_Content_Ajax_Query
		 */
		private static $instance;

		/**
		 * Meta key for post view counts (used by quick query).
		 */
		const VIEWS_META_KEY = '_post_views_count';

		/**
		 * Quick query slugs => rolling period definition.
		 * Front-end labels:
		 *
		 * @var array<string,array>
		 */
		const QUICK_QUERY_MAP = array(
			'popular_24h'     => array( 'hours' => 24 ),
			'popular_3days'   => array( 'days' => 3 ),
			'popular_7days'   => array( 'days' => 7 ),
			'popular_14days'  => array( 'days' => 14 ),
			'popular_30days'  => array( 'days' => 30 ),
			'popular_3months' => array( 'months' => 3 ),
			'popular_1year'   => array( 'years' => 1 ),
			'popular_alltime' => array(),
		);


		/**
		 * Get singleton instance.
		 *
		 * @return SP_Smart_Content_Ajax_Query
		 */
		public static function instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
				self::$instance->init();
			}
			return self::$instance;
		}

		/**
		 * Register all AJAX hooks.
		 */
		public function init() {
			// Generic handler — routes by queryData.postType / multiplePostType automatically.
			// Use this action from the front-end for all cases.
			add_action( 'wp_ajax_sp_query_content', array( $this, 'query_content' ) );
			add_action( 'wp_ajax_nopriv_sp_query_content', array( $this, 'query_content' ) );

			// Individual type handlers (kept for backward compatibility).
			add_action( 'wp_ajax_sp_get_posts', array( $this, 'get_posts' ) );
			add_action( 'wp_ajax_nopriv_sp_get_posts', array( $this, 'get_posts' ) );

			add_action( 'wp_ajax_sp_get_pages', array( $this, 'get_pages' ) );
			add_action( 'wp_ajax_nopriv_sp_get_pages', array( $this, 'get_pages' ) );

			add_action( 'wp_ajax_sp_get_media', array( $this, 'get_media' ) );
			add_action( 'wp_ajax_nopriv_sp_get_media', array( $this, 'get_media' ) );

			// Cross-type search.
			add_action( 'wp_ajax_sp_search_content', array( $this, 'search_content' ) );
			add_action( 'wp_ajax_nopriv_sp_search_content', array( $this, 'search_content' ) );

			// Inspector options panel.
			add_action( 'wp_ajax_sp_meta_data_query', array( $this, 'meta_data_query' ) );
			add_action( 'wp_ajax_nopriv_sp_meta_data_query', array( $this, 'meta_data_query' ) );

			add_action( 'wp_ajax_sp_get_all_posts', array( $this, 'get_all_posts' ) );
			add_action( 'wp_ajax_nopriv_sp_get_all_posts', array( $this, 'get_all_posts' ) );
		}



		/**
		 * Verify request nonce.
		 *
		 * @param string $nonce Nonce value.
		 * @return bool
		 */
		private function verify_nonce( $nonce ) {
			return wp_verify_nonce( $nonce, 'sp_content_ajax_nonce' );
		}

		/**
		 * Extract and verify nonce from $_POST; sends 403 on failure.
		 */
		private function check_nonce() {
			$nonce = isset( $_POST['nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['nonce'] ) ) : '';
			if ( ! $this->verify_nonce( $nonce ) ) {
				wp_send_json_error( array( 'message' => 'Invalid nonce.' ), 403 );
			}
		}

		/**
		 * Decode queryData from $_POST.
		 *
		 * @return array
		 */
		private function get_query_data() {
			$raw  = isset( $_POST['queryData'] ) ? wp_unslash( $_POST['queryData'] ) : '{}'; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
			$data = json_decode( $raw, true );
			return is_array( $data ) ? $data : array();
		}


		/**
		 * Generic handler — reads postType/multiplePostType from queryData,
		 * runs ONE WP_Query with all resolved types, and returns combined results.
		 *
		 * Handles all selection scenarios:
		 *   - Single type   : post | page | attachment
		 *   - Multiple types: [post, page] | [attachment, page] | [post, page, attachment]
		 */
		public function query_content() {
			$this->check_nonce();
			$qd         = $this->get_query_data();
			$post_types = $this->resolve_post_type_string( $qd );

			// Build args with all resolved types — no force_type override.
			$args  = $this->build_query_args( $qd );
			$query = new WP_Query( $args );

			// Use media formatter only when attachment is the sole type.
			// For mixed selections use format_posts_data which handles all types.
			$is_only_media = $post_types === 'attachment'
				|| ( is_array( $post_types ) && count( $post_types ) === 1 && $post_types[0] === 'attachment' );

			$posts_data = $is_only_media
				? $this->format_media_data( $query )
				: $this->format_posts_data( $query );

			wp_send_json_success(
				array(
					'posts'        => $posts_data,
					'posts_status' => count( $posts_data ) > 0,
					'total_posts'  => $query->found_posts,
					'total_pages'  => $query->max_num_pages,
					'current_page' => isset( $qd['paged'] ) ? (int) $qd['paged'] : 1,
				)
			);
		}

		/**
		 * Get posts via AJAX — resolves type from queryData (backward compat).
		 */
		public function get_posts() {
			$this->check_nonce();
			$qd         = $this->get_query_data();
			$post_types = $this->resolve_post_type_string( $qd );

			$args  = $this->build_query_args( $qd );
			$query = new WP_Query( $args );

			$is_only_media = $post_types === 'attachment'
				|| ( is_array( $post_types ) && count( $post_types ) === 1 && $post_types[0] === 'attachment' );

			$posts_data = $is_only_media
				? $this->format_media_data( $query )
				: $this->format_posts_data( $query );

			wp_send_json_success(
				array(
					'posts'        => $posts_data,
					'posts_status' => count( $posts_data ) > 0,
					'total_posts'  => $query->found_posts,
					'total_pages'  => $query->max_num_pages,
					'current_page' => isset( $qd['paged'] ) ? (int) $qd['paged'] : 1,
				)
			);
		}

		/**
		 * Get pages via AJAX (post_type = page).
		 */
		public function get_pages() {
			$this->check_nonce();
			$qd         = $this->get_query_data();
			$args       = $this->build_query_args( $qd, 'page' );
			$query      = new WP_Query( $args );
			$pages_data = $this->format_posts_data( $query );

			wp_send_json_success(
				array(
					'posts'        => $pages_data,
					'posts_status' => count( $pages_data ) > 0,
					'total_pages'  => $query->found_posts,
					'total_paged'  => $query->max_num_pages,
					'current_page' => isset( $qd['paged'] ) ? (int) $qd['paged'] : 1,
				)
			);
		}

		/**
		 * Get media via AJAX (post_type = attachment).
		 */
		public function get_media() {
			$this->check_nonce();
			$qd         = $this->get_query_data();
			$args       = $this->build_query_args( $qd, 'attachment' );
			$query      = new WP_Query( $args );
			$media_data = $this->format_media_data( $query );

			wp_send_json_success(
				array(
					'posts'        => $media_data,
					'posts_status' => count( $media_data ) > 0,
					'total_media'  => $query->found_posts,
					'total_pages'  => $query->max_num_pages,
					'current_page' => isset( $qd['paged'] ) ? (int) $qd['paged'] : 1,
				)
			);
		}


		/**
		 * Build a complete WP_Query args array from queryData.
		 *
		 * Processing order:
		 *  1.  Base defaults
		 *  2.  Post type  (single string or array for multiple types)
		 *  12. Include specific post IDs
		 *
		 * @param array  $qd         Decoded queryData.
		 * @param string $force_type Force a specific post_type (overrides qd value).
		 * @return array WP_Query compatible args.
		 */
		public function build_query_args( array $qd, $force_type = '' ) {
			$args = array(
				'post_status'         => 'publish',
				'ignore_sticky_posts' => true,
				'suppress_filters'    => false,
			);

			// 1. Post type.
			$post_type         = $force_type ?: $this->resolve_post_type_string( $qd );
			$args['post_type'] = $post_type;

			// 2. Post status — must include 'inherit' when attachment is in the mix.
			$has_attachment = $post_type === 'attachment'
				|| ( is_array( $post_type ) && in_array( 'attachment', $post_type, true ) );

			if ( $has_attachment ) {
				$args['post_status'] = array( 'publish', 'inherit' );
			}

			// 3. Mime type for media.
			if ( ! empty( $qd['mime_type'] ) ) {
				$args['post_mime_type'] = sanitize_text_field( $qd['mime_type'] );
			}

			// 4. Pagination.
			$args = array_merge( $args, $this->resolve_pagination( $qd ) );

			// 5. Quick query check.
			$quick_query_active = ! empty( $qd['quickQuery'] ) && 'select_quick_query' !== $qd['quickQuery'];

			if ( $quick_query_active ) {
				$args = array_merge( $args, $this->resolve_quick_query( $qd['quickQuery'] ) );
			} else {
				// 6. Default order.
				$args = array_merge( $args, $this->resolve_order( $qd ) );
			}

			// 7. Common filters.
			// Promote that flag into $qd before calling resolve_meta_query().
			$common = $this->resolve_common_filters( $qd );

			if ( ! empty( $common['_require_thumbnail'] ) ) {
				$qd['_require_thumbnail'] = true;
				unset( $common['_require_thumbnail'] );
			}

			$args = array_merge( $args, $common );

			// 8. Taxonomy query.
			$tax_query = $this->resolve_taxonomy_query( $qd );
			if ( ! empty( $tax_query ) ) {
				$args['tax_query'] = $tax_query;
			}

			// 9. Date query (skip when quick query already owns it).
			if ( ! $quick_query_active ) {
				$date_query = $this->resolve_date_query( $qd );
				if ( ! empty( $date_query ) ) {
					$args['date_query'] = $date_query;
				}
			}

			// 10. Keyword search.
			if ( ! empty( $qd['keywordSearch'] ) ) {
				$args['s'] = sanitize_text_field( $qd['keywordSearch'] );
			}

			// 11. Meta / custom-field query (also handles _require_thumbnail).

			$meta_query = $this->resolve_meta_query( $qd );
			if ( ! empty( $meta_query ) ) {
				if ( ! empty( $args['meta_query'] ) ) {

					$args['meta_query'] = array(
						'relation' => 'AND',
						$args['meta_query'],
						$meta_query,
					);
				} else {
					$args['meta_query'] = $meta_query;
				}
			}

			// 12. Include only specific post IDs.
			if ( ! empty( $qd['includeOnlyPost'] ) && is_array( $qd['includeOnlyPost'] ) ) {
				$args['post__in'] = array_map( 'absint', $qd['includeOnlyPost'] );
			}

			return $args;
		}



		/**
		 * Resolve post_type value from queryData.
		 *
		 * Supports three front-end formats:
		 *
		 *
		 * Returns a string for single type, array for multiple types.
		 *
		 * @param array $qd Query data.
		 * @return string|string[]
		 */
		private function resolve_post_type_string( array $qd ) {
			$map = array(
				'posts'      => 'post',
				'post'       => 'post',
				'pages'      => 'page',
				'page'       => 'page',
				'media'      => 'attachment',
				'attachment' => 'attachment',
			);

			// b) postTypes checkbox array.
			if ( ! empty( $qd['postTypes'] ) && is_array( $qd['postTypes'] ) ) {
				$types = array_values(
					array_unique(
						array_filter(
							array_map(
								function ( $t ) use ( $map ) {
									return $map[ strtolower( sanitize_key( $t ) ) ] ?? sanitize_key( $t );
								},
								$qd['postTypes']
							)
						)
					)
				);
				return count( $types ) === 1 ? $types[0] : $types;
			}

			// c) multiplePostType DnD array [{id, label, value}, ...].
			if ( ! empty( $qd['multiplePostType'] ) && is_array( $qd['multiplePostType'] ) ) {
				$types = array();
				foreach ( $qd['multiplePostType'] as $item ) {
					$raw = is_array( $item ) ? ( $item['value'] ?? '' )
						: ( is_object( $item ) ? ( $item->value ?? '' ) : (string) $item );
					if ( $raw ) {
						$types[] = $map[ strtolower( sanitize_key( $raw ) ) ] ?? sanitize_key( $raw );
					}
				}
				$types = array_values( array_unique( array_filter( $types ) ) );
				if ( ! empty( $types ) ) {
					return count( $types ) === 1 ? $types[0] : $types;
				}
			}

			// a) Single postType string — fallback.
			$raw = ! empty( $qd['postType'] ) ? strtolower( sanitize_key( $qd['postType'] ) ) : 'post';
			return $map[ $raw ] ?? $raw;
		}


		/**
		 * Resolve posts_per_page, offset, and paged.
		 * Supports both camelCase (postLimit/currentPage) and snake_case (posts_per_page/paged).
		 *
		 * @param array $qd Query data.
		 * @return array
		 */
		private function resolve_pagination( array $qd ) {
			$limit  = isset( $qd['posts_per_page'] ) ? (int) $qd['posts_per_page']
					: ( isset( $qd['postLimit'] ) ? (int) $qd['postLimit'] : 6 );
			$offset = isset( $qd['offset'] ) ? (int) $qd['offset'] : 0;
			$paged  = isset( $qd['paged'] ) ? (int) $qd['paged']
					: ( isset( $qd['currentPage'] ) ? (int) $qd['currentPage'] : 1 );

			$args = array(
				'posts_per_page' => $limit > 0 ? $limit : 6,
				'offset'         => $offset,
			);

			if ( ! empty( $qd['paginationEnable'] ) && $paged > 1 ) {
				$args['paged'] = $paged;
			}

			return $args;
		}


		/**
		 * Resolve orderby / order args.
		 * Supports both camelCase (orderBy/orderDirection) and snake_case (orderby/order).
		 *
		 * @param array $qd Query data.
		 * @return array
		 */
		private function resolve_order( array $qd ) {
			$allowed_orderby = array(
				'date',
				'modified',
				'title',
				'name',
				'author',
				'comment_count',
				'rand',
				'menu_order',
				'ID',
				'meta_value',
				'meta_value_num',
			);

			$orderby = $qd['orderby'] ?? $qd['orderBy'] ?? 'date';
			$orderby = in_array( $orderby, $allowed_orderby, true ) ? $orderby : 'date';

			$order = isset( $qd['order'] ) ? strtoupper( $qd['order'] )
					: ( isset( $qd['orderDirection'] ) ? strtoupper( $qd['orderDirection'] ) : 'DESC' );
			$order = in_array( $order, array( 'ASC', 'DESC' ), true ) ? $order : 'DESC';

			return array(
				'orderby' => $orderby,
				'order'   => $order,
			);
		}


		/**
		 * Build WP_Query overrides for the chosen quick query option.
		 * Orders by VIEWS_META_KEY DESC with an optional rolling date window.
		 *
		 * @param string $slug Quick query slug from queryData.quickQuery.
		 * @return array Partial WP_Query args.
		 */
		private function resolve_quick_query( $slug ) {
			// Old code used meta_key which excluded posts without _post_views_count entirely
			$args = array(
				'orderby'    => array(
					'has_views' => 'DESC',
					'date'      => 'DESC',
				),
				'meta_query' => array( // phpcs:ignore WordPress.DB.SlowDBQuery
				'relation'  => 'OR',
				'has_views' => array(
					'key'     => self::VIEWS_META_KEY,
					'type'    => 'NUMERIC',
					'compare' => 'EXISTS',
				),
				'no_views'  => array(
					'key'     => self::VIEWS_META_KEY,
					'compare' => 'NOT EXISTS',
				),
				),
			);

			// Unknown slug — return without date restriction
			if ( ! array_key_exists( $slug, self::QUICK_QUERY_MAP ) ) {
				return $args;
			}

			$period = self::QUICK_QUERY_MAP[ $slug ];

			// popular_alltime — no date restriction needed
			if ( empty( $period ) ) {
				return $args;
			}

			// Add rolling date window
			$after = $this->period_to_date( $period );
			if ( $after ) {
				$args['date_query'] = array(
					array(
						'after'     => $after,
						'inclusive' => true,
						'column'    => 'post_date',
					),
				);
			}

			return $args;
		}

		/**
		 * Convert a period array to a date string for date_query 'after'.
		 *
		 * @param array $period e.g. ['hours'=>24] | ['days'=>7] | ['months'=>3].
		 * @return string|null
		 */
		private function period_to_date( array $period ) {
			$now = current_time( 'timestamp' ); // phpcs:ignore WordPress.DateTime.CurrentTimeTimestamp

			if ( isset( $period['hours'] ) ) {
				return gmdate( 'Y-m-d H:i:s', $now - ( (int) $period['hours'] * HOUR_IN_SECONDS ) );
			}
			if ( isset( $period['days'] ) ) {
				return gmdate( 'Y-m-d H:i:s', $now - ( (int) $period['days'] * DAY_IN_SECONDS ) );
			}
			if ( isset( $period['months'] ) ) {
				return gmdate( 'Y-m-d H:i:s', strtotime( '-' . (int) $period['months'] . ' months', $now ) );
			}
			if ( isset( $period['years'] ) ) {
				return gmdate( 'Y-m-d H:i:s', strtotime( '-' . (int) $period['years'] . ' years', $now ) );
			}

			return null;
		}



		/**
		 * Resolve every control in the "Common Filtering" Inspector panel:
		 *
		 * @param array $qd Query data.
		 * @return array Partial WP_Query args. May contain _require_thumbnail = true.
		 */
		private function resolve_common_filters( array $qd ) {
			$args        = array();
			$post_not_in = array();

			// --- Exclude Post (dropdown) ---
			if ( ! empty( $qd['excludePost'] ) && is_array( $qd['excludePost'] ) ) {
				foreach ( $qd['excludePost'] as $item ) {
					$id = is_array( $item ) ? ( $item['value'] ?? $item['id'] ?? 0 )
						: ( is_object( $item ) ? ( $item->value ?? $item->id ?? 0 ) : (int) $item );
					if ( $id > 0 ) {
						$post_not_in[] = (int) $id;
					}
				}
			}

			// --- Exclude Current Post (toggle) ---
			if ( ! empty( $qd['excludeCurrentPosts'] ) ) {
				$post_id = (int) ( $qd['postId'] ?? $qd['page_id'] ?? 0 );
				if ( $post_id > 0 ) {
					$post_not_in[] = $post_id;
				}
			}

			// --- Exclude Sticky Posts (toggle) ---
			if ( ! empty( $qd['excludeStickyPosts'] ) ) {
				$sticky = get_option( 'sticky_posts', array() );
				if ( ! empty( $sticky ) ) {
					$post_not_in = array_merge( $post_not_in, array_map( 'absint', (array) $sticky ) );
				}
				$args['ignore_sticky_posts'] = true;
			}

			// Commit post__not_in.
			if ( ! empty( $post_not_in ) ) {
				$args['post__not_in'] = array_values( array_unique( array_map( 'absint', $post_not_in ) ) );
			}

			// --- Exclude Author (select) ---
			if ( ! empty( $qd['excludeAuthor'] ) && is_array( $qd['excludeAuthor'] ) ) {
				$author_ids = array();
				foreach ( $qd['excludeAuthor'] as $item ) {
					$id = is_array( $item ) ? ( $item['value'] ?? $item['id'] ?? 0 )
						: ( is_object( $item ) ? ( $item->value ?? $item->id ?? 0 ) : (int) $item );
					if ( $id > 0 ) {
						$author_ids[] = (int) $id;
					}
				}
				if ( ! empty( $author_ids ) ) {
					$args['author__not_in'] = $author_ids;
				}
			}

			// --- Filter by specific author (include) ---
			if ( ! empty( $qd['filterByAuthor'] ) && is_array( $qd['filterByAuthor'] ) ) {
				$args['author__in'] = array_map( 'absint', $qd['filterByAuthor'] );
			}

			// --- Exclude Password-Protected Posts (toggle) ---
			if ( ! empty( $qd['excludeProtectedPosts'] ) ) {
				$args['has_password'] = false;
			}

			// --- Exclude Children / Sub-pages (toggle) ---
			if ( ! empty( $qd['excludeChildrenPosts'] ) ) {
				$args['post_parent'] = 0;
			}

			// --- Exclude Posts without Featured Image (toggle) ---
			// Internal flag — picked up by resolve_meta_query().
			if ( ! empty( $qd['excludePostWithoutImagePosts'] ) ) {
				$args['_require_thumbnail'] = true;
			}

			return $args;
		}


		/**
		 * Build tax_query from taxonomies, categories, termId,
		 * filterProduct, excludeTerm and relation.
		 *
		 * @param array $qd Query data.
		 * @return array
		 */
		private function resolve_taxonomy_query( array $qd ) {
			$tax_query = array();
			$relation  = ( ! empty( $qd['relation'] ) && strtoupper( $qd['relation'] ) === 'OR' ) ? 'OR' : 'AND';

			// Explicit taxonomy / term selections [{taxonomy, terms[]}].
			if ( ! empty( $qd['taxonomies'] ) && is_array( $qd['taxonomies'] ) ) {
				foreach ( $qd['taxonomies'] as $tax_data ) {
					$tax  = is_array( $tax_data ) ? ( $tax_data['taxonomy'] ?? '' ) : ( $tax_data->taxonomy ?? '' );
					$trms = is_array( $tax_data ) ? ( $tax_data['terms'] ?? array() )
							: ( (array) ( $tax_data->terms ?? array() ) );
					if ( empty( $tax ) || empty( $trms ) ) {
						continue;
					}
					$tax_query[] = array(
						'taxonomy' => sanitize_key( $tax ),
						'field'    => 'term_id',
						'terms'    => array_map( 'absint', (array) $trms ),
						'operator' => 'IN',
					);
				}
			}

			// Categories shorthand [term_id, ...].
			if ( ! empty( $qd['categories'] ) && is_array( $qd['categories'] ) ) {
				$tax_query[] = array(
					'taxonomy' => 'category',
					'field'    => 'term_id',
					'terms'    => array_map( 'absint', $qd['categories'] ),
					'operator' => 'IN',
				);
			}

			// Single term ID (archive blocks).
			if ( ! empty( $qd['termId'] ) ) {
				$tax_query[] = array(
					'taxonomy' => 'category',
					'field'    => 'term_id',
					'terms'    => array( absint( $qd['termId'] ) ),
					'operator' => 'IN',
				);
			}

			// WooCommerce product_cat.
			if ( ! empty( $qd['filterProduct'] ) && is_array( $qd['filterProduct'] ) ) {
				$tax_query[] = array(
					'taxonomy' => 'product_cat',
					'field'    => 'term_id',
					'terms'    => array_map( 'absint', $qd['filterProduct'] ),
					'operator' => 'IN',
				);
			}

			// Exclude Term — auto-grouped by taxonomy.
			if ( ! empty( $qd['excludeTerm'] ) && is_array( $qd['excludeTerm'] ) ) {
				$by_tax = array();
				foreach ( $qd['excludeTerm'] as $item ) {
					$tid  = is_array( $item ) ? ( $item['value'] ?? $item['id'] ?? 0 )
							: ( is_object( $item ) ? ( $item->value ?? $item->id ?? 0 ) : (int) $item );
					$term = get_term( absint( $tid ) );
					if ( $term && ! is_wp_error( $term ) ) {
						$by_tax[ $term->taxonomy ][] = $term->term_id;
					}
				}
				foreach ( $by_tax as $taxonomy => $ids ) {
					$tax_query[] = array(
						'taxonomy' => sanitize_key( $taxonomy ),
						'field'    => 'term_id',
						'terms'    => $ids,
						'operator' => 'NOT IN',
					);
				}
			}

			if ( count( $tax_query ) > 1 ) {
				array_unshift( $tax_query, array( 'relation' => $relation ) );
			}

			return $tax_query;
		}


		/**
		 * Get all posts for include/exclude dropdown search.
		 * Supports live search text filtering.
		 */
		public function get_all_posts() {
			$this->check_nonce();

			$raw  = isset( $_POST['queryData'] ) ? wp_unslash( $_POST['queryData'] ) : '{}'; // phpcs:ignore
			$qd  = json_decode( $raw, true );
			$qd  = is_array( $qd ) ? $qd : array();

			$search_text = sanitize_text_field( $qd['liveSearchText'] ?? '' );
			$post_type   = $this->resolve_post_type_string( $qd );

			if ( $post_type === 'attachment' ) {
				$post_type = 'post';
			}
			if ( is_array( $post_type ) ) {
				$post_type = array_values( array_diff( $post_type, array( 'attachment' ) ) );
				if ( empty( $post_type ) ) {
					$post_type = array( 'post' );
				}
			}

			$query = new WP_Query(
				array(
					'post_type'      => $post_type,
					'post_status'    => 'publish',
					'posts_per_page' => 0,
					's'              => $search_text,
				)
			);

			$posts = array();
			if ( $query->have_posts() ) {
				while ( $query->have_posts() ) {
					$query->the_post();
					$posts[] = array(
						'label' => get_the_title(),
						'value' => get_the_ID(),
					);
				}
				wp_reset_postdata();
			}

			wp_send_json_success( array( 'posts' => $posts ) );
		}




		private function resolve_date_query( array $qd ) {
			if ( empty( $qd['filterByDate'] ) ) {
				return array();
			}

			$date_query = array();

			if ( ! empty( $qd['specificDate'] ) ) {
				$ts = strtotime( $qd['specificDate'] );
				if ( $ts ) {
					$date_query[] = array(
						'year'  => (int) gmdate( 'Y', $ts ),
						'month' => (int) gmdate( 'm', $ts ),
						'day'   => (int) gmdate( 'd', $ts ),
					);
				}
			}

			if ( ! empty( $qd['specificMonth'] ) ) {
				$date_query[] = array( 'month' => (int) $qd['specificMonth'] );
			}

			if ( ! empty( $qd['specificYear'] ) ) {
				$date_query[] = array( 'year' => (int) $qd['specificYear'] );
			}

			if ( ! empty( $qd['specificPeriodAfter'] ) ) {
				$date_query[] = array(
					'after'     => sanitize_text_field( $qd['specificPeriodAfter'] ),
					'inclusive' => true,
				);
			}

			if ( ! empty( $qd['specificPeriodBefore'] ) ) {
				$date_query[] = array(
					'before'    => sanitize_text_field( $qd['specificPeriodBefore'] ),
					'inclusive' => true,
				);
			}

			if ( ! empty( $qd['specificDateAfter'] ) ) {
				$date_query[] = array(
					'after'     => sanitize_text_field( $qd['specificDateAfter'] ),
					'inclusive' => false,
				);
			}

			if ( ! empty( $qd['specificDateBefore'] ) ) {
				$date_query[] = array(
					'before'    => sanitize_text_field( $qd['specificDateBefore'] ),
					'inclusive' => false,
				);
			}

			if ( ! empty( $qd['excludeDateAfter'] ) ) {
				$date_query[] = array(
					'before'    => sanitize_text_field( $qd['excludeDateAfter'] ),
					'inclusive' => false,
				);
			}

			if ( ! empty( $qd['excludeDateBefore'] ) ) {
				$date_query[] = array(
					'after'     => sanitize_text_field( $qd['excludeDateBefore'] ),
					'inclusive' => false,
				);
			}

			if ( count( $date_query ) > 1 ) {
				array_unshift( $date_query, array( 'relation' => 'AND' ) );
			}

			return $date_query;
		}

		// -------------------------------------------------------------------------
		// Advanced filter — meta / custom fields
		// -------------------------------------------------------------------------

		/**
		 * Build meta_query from _require_thumbnail flag and filterByCustomFields.
		 *
		 * @param array $qd Query data.
		 * @return array
		 */
		private function resolve_meta_query( array $qd ) {
			$meta_query = array();
			$relation   = ( ! empty( $qd['customFieldRelation'] ) && strtoupper( $qd['customFieldRelation'] ) === 'OR' )
				? 'OR' : 'AND';

			// Require featured image (_require_thumbnail promoted from resolve_common_filters).
			if ( ! empty( $qd['_require_thumbnail'] ) ) {
				$meta_query[] = array(
					'key'     => '_thumbnail_id',
					'compare' => 'EXISTS',
				);
			}

			// Custom field filters.
			if ( ! empty( $qd['filterByCustomFields'] ) && is_array( $qd['filterByCustomFields'] ) ) {
				$allowed_compare = array(
					'=',
					'!=',
					'>',
					'>=',
					'<',
					'<=',
					'LIKE',
					'NOT LIKE',
					'IN',
					'NOT IN',
					'BETWEEN',
					'NOT BETWEEN',
					'EXISTS',
					'NOT EXISTS',
					'REGEXP',
					'NOT REGEXP',
				);

				foreach ( $qd['filterByCustomFields'] as $field ) {
					$key = is_array( $field ) ? ( $field['key'] ?? '' )
						: ( is_object( $field ) ? ( $field->key ?? '' ) : '' );
					if ( empty( $key ) ) {
						continue;
					}

					$compare_raw = is_array( $field ) ? ( $field['compare'] ?? '=' )
								: ( is_object( $field ) ? ( $field->compare ?? '=' ) : '=' );
					$compare     = in_array( strtoupper( $compare_raw ), $allowed_compare, true )
						? strtoupper( $compare_raw ) : '=';

					$clause = array(
						'key'     => sanitize_text_field( $key ),
						'compare' => $compare,
					);

					$value = is_array( $field ) ? ( $field['value'] ?? null )
							: ( is_object( $field ) ? ( $field->value ?? null ) : null );
					if ( null !== $value && ! in_array( $compare, array( 'EXISTS', 'NOT EXISTS' ), true ) ) {
						$clause['value'] = sanitize_text_field( $value );
					}

					$type = is_array( $field ) ? ( $field['type'] ?? '' )
							: ( is_object( $field ) ? ( $field->type ?? '' ) : '' );
					if ( ! empty( $type ) ) {
						$clause['type'] = sanitize_text_field( $type );
					}

					$meta_query[] = $clause;
				}
			}

			if ( count( $meta_query ) > 1 ) {
				array_unshift( $meta_query, array( 'relation' => $relation ) );
			}

			return $meta_query;
		}

		/**
		 * Format a WP_Query result (posts, pages, or mixed types) into response shape.
		 *
		 * Handles mixed type results correctly:
		 *  - attachment post → thumbnail IS the attachment itself
		 *  - post/page       → thumbnail from featured image
		 *
		 * @param WP_Query $query WordPress query.
		 * @return array
		 */
		private function format_posts_data( $query ) {
			$posts_data = array();

			if ( ! $query->have_posts() ) {
				return $posts_data;
			}

			while ( $query->have_posts() ) {
				$query->the_post();

				$post_id        = get_the_ID();
				$current_type   = get_post_type(); // per-post type check for mixed results
				$author_meta_id = get_the_author_meta( 'ID' );
				$archive_year   = get_the_time( 'Y' );
				$archive_month  = get_the_time( 'm' );
				$archive_day    = get_the_time( 'd' );

				// For attachments, the post itself IS the image.
				if ( 'attachment' === $current_type ) {
					$image_id      = $post_id;
					$thumbnail_url = wp_get_attachment_url( $post_id ) ?: false;
				} else {
					$image_id      = get_post_thumbnail_id( $post_id );
					$thumbnail_url = get_the_post_thumbnail_url( $post_id, 'full' ) ?: false;
				}

				$posts_data[] = array(
					'post_id'              => $post_id,
					'post_type'            => $current_type,
					'title'                => get_the_title(),
					'link'                 => get_the_permalink(),
					'content'              => get_the_content(),
					'excerpt'              => get_the_excerpt(),
					'post_thumbnail'       => get_the_post_thumbnail(),
					'post_thumbnail_url'   => $thumbnail_url,
					'image_size'           => 'full',
					'post_image_gallery'   => get_post_meta( $post_id, '_sp_gallery_ids', true ) ?: '',
					'post_video_meta_data' => get_post_meta( $post_id, '_sp_video_meta', true ) ?: '',
					'attachment_srcset'    => $image_id ? ( wp_get_attachment_image_srcset( $image_id ) ?: false ) : false,
					'attachment_metadata'  => $image_id ? ( wp_get_attachment_metadata( $image_id ) ?: false ) : false,
					'attachment_url'       => $image_id ? ( wp_get_attachment_url( $image_id ) ?: false ) : false,
					'post_thumbnail_id'    => $image_id,
					'author'               => get_the_author(),
					'author_id'            => $author_meta_id,
					'author_avatar_url'    => get_avatar_url( $author_meta_id ),
					'author_url'           => get_author_posts_url( $author_meta_id ),
					'category_list'        => get_the_category_list( '' ) ?: false,
					'tag_list'             => get_the_tag_list( '' ) ?: false,
					'post_list'            => get_post_format() ?: false,
					'category'             => get_the_category() ?: array(),
					'date'                 => get_the_date( 'c' ),
					'date_archive_url'     => get_day_link( $archive_year, $archive_month, $archive_day ),
					'comment_count'        => get_comment_count( $post_id ),
					'view_count'           => get_post_meta( $post_id, self::VIEWS_META_KEY, true ) ?: '',
					'like_count'           => get_post_meta( $post_id, '_post_like_count', true ) ?: '',
					'image_title'          => $image_id ? get_the_title( $image_id ) : '',
					'image_alt'            => $image_id
						? ( get_post_meta( $image_id, '_wp_attachment_image_alt', true ) ?: false )
						: false,
					'like_options'         => $this->get_like_button_data( $post_id ),
					'post_date'            => array(
						'default' => get_the_date( get_option( 'date_format' ) ),
						'day'     => get_the_date( 'j' ),
						'month'   => get_the_date( 'F' ),
						'year'    => get_the_date( 'Y' ),
					),
					'badges_list'          => get_the_terms( $post_id, 'sp_smart_badges' ) ?: false,
					'all_term_list'        => $this->get_all_terms_html( $post_id ),
					// Media-specific fields (populated only for attachments in mixed results).
					'mime_type'            => 'attachment' === $current_type ? get_post_mime_type( $post_id ) : '',
					'file_url'             => 'attachment' === $current_type ? ( wp_get_attachment_url( $post_id ) ?: '' ) : '',
				);
			}

			wp_reset_postdata();
			return $posts_data;
		}

		/**
		 * Format a WP_Query result (attachments only) into the media response shape.
		 *
		 * @param WP_Query $query WordPress query.
		 * @return array
		 */
		private function format_media_data( $query ) {
			$media_data = array();

			if ( ! $query->have_posts() ) {
				return $media_data;
			}

			while ( $query->have_posts() ) {
				$query->the_post();

				$attachment_id  = get_the_ID();
				$metadata       = wp_get_attachment_metadata( $attachment_id );
				$author_meta_id = get_the_author_meta( 'ID' );
				$file_path      = get_attached_file( $attachment_id );

				$media_data[] = array(
					'post_id'             => $attachment_id,
					'post_type'           => 'attachment',
					'title'               => get_the_title(),
					'filename'            => $file_path ? basename( $file_path ) : '',
					'url'                 => wp_get_attachment_url( $attachment_id ),
					'mime_type'           => get_post_mime_type( $attachment_id ),
					'type'                => $this->get_attachment_type( get_post_mime_type( $attachment_id ) ),
					'date'                => get_the_date( 'c' ),
					'filesize'            => ( $file_path && file_exists( $file_path ) )
						? size_format( filesize( $file_path ) ) : '',
					'image_alt'           => get_post_meta( $attachment_id, '_wp_attachment_image_alt', true ) ?: false,
					'caption'             => wp_get_attachment_caption( $attachment_id ),
					'attachment_metadata' => $metadata,
					'sizes'               => $this->get_image_sizes( $attachment_id ),
					'author'              => get_the_author(),
					'author_id'           => $author_meta_id,
					'author_avatar_url'   => get_avatar_url( $author_meta_id ),
					'post_thumbnail_url'  => wp_get_attachment_url( $attachment_id ) ?: false,
					'post_date'           => array(
						'default' => get_the_date( get_option( 'date_format' ) ),
						'day'     => get_the_date( 'j' ),
						'month'   => get_the_date( 'F' ),
						'year'    => get_the_date( 'Y' ),
					),
				);
			}

			wp_reset_postdata();
			return $media_data;
		}



		/**
		 * Search across posts, pages, and/or media.
		 */
		public function search_content() {
			$this->check_nonce();

			$search_term  = isset( $_POST['search'] )
				? sanitize_text_field( wp_unslash( $_POST['search'] ) ) : '';
			$content_type = isset( $_POST['contentType'] )
				? sanitize_text_field( wp_unslash( $_POST['contentType'] ) ) : 'all';

			if ( empty( $search_term ) ) {
				wp_send_json_error( array( 'message' => 'Search term is required.' ), 400 );
			}

			$results = array();

			if ( in_array( $content_type, array( 'all', 'posts' ), true ) ) {
				$q                = new WP_Query(
					array(
						'post_type'      => 'post',
						'post_status'    => 'publish',
						's'              => $search_term,
						'posts_per_page' => 20,
					)
				);
				$results['posts'] = $this->format_posts_data( $q );
			}

			if ( in_array( $content_type, array( 'all', 'pages' ), true ) ) {
				$q                = new WP_Query(
					array(
						'post_type'      => 'page',
						'post_status'    => 'publish',
						's'              => $search_term,
						'posts_per_page' => 20,
					)
				);
				$results['pages'] = $this->format_posts_data( $q );
			}

			if ( in_array( $content_type, array( 'all', 'media' ), true ) ) {
				$q                = new WP_Query(
					array(
						'post_type'      => 'attachment',
						'post_status'    => 'inherit',
						's'              => $search_term,
						'posts_per_page' => 20,
					)
				);
				$results['media'] = $this->format_media_data( $q );
			}

			wp_send_json_success( $results );
		}


		/**
		 * Metadata query — provides taxonomies, authors, post types, image sizes, meta fields.
		 */
		public function meta_data_query() {
			$this->check_nonce();

			$raw        = isset( $_POST['metaQueryData'] ) ? sanitize_text_field( wp_unslash( $_POST['metaQueryData'] ) ) : ''; // phpcs:ignore
			$query_data = (array) json_decode( $raw );

			$post_type          = $query_data['postType'] ?? 'post';
			$edit_site          = $query_data['editSite'] ?? '';
			$multiple_post_type = ( 'multiple_post_type' === $post_type && isset( $query_data['multiplePostType'] ) )
				? array_map( fn( $t ) => $t->value, (array) $query_data['multiplePostType'] )
				: array( $post_type );

			// Taxonomies.
			$all_taxonomies = get_object_taxonomies( $multiple_post_type, 'objects' );
			$taxonomy_list  = array();

			foreach ( $all_taxonomies as $taxonomy ) {
				$terms      = get_terms(
					array(
						'taxonomy'   => $taxonomy->name,
						'hide_empty' => false,
					)
				);
				$term_items = array();
				$index      = 0;

				foreach ( $terms as $term ) {
					$term_items[] = array(
						'id'            => $index++,
						'label'         => $term->name,
						'slug'          => $term->slug,
						'value'         => $term->term_id,
						'type'          => 'taxonomy',
						'taxonomy_type' => $term->taxonomy,
					);
				}

				$taxonomy_list[] = array(
					'label'       => $taxonomy->label,
					'name'        => $taxonomy->name,
					'terms'       => array(),
					'terms_items' => $term_items,
				);
			}

			// Authors.
			$authors     = get_users( array( 'role__in' => array( 'author', 'administrator', 'editor' ) ) );
			$author_list = array_map(
				fn( $a ) => array(
					'id'    => $a->ID,
					'role'  => $a->roles,
					'type'  => 'author',
					'value' => $a->ID,
					'label' => $a->display_name,
				),
				$authors
			);

			// Post count.
			$post_count = 0;
			foreach ( $multiple_post_type as $pt ) {
				$counts      = wp_count_posts( $pt );
				$post_count += isset( $counts->publish ) ? (int) $counts->publish : 0;
			}

			// Meta fields (editor only — gated by editSite flag).
			$meta_field_list = array();
			if ( 'editSite' === $edit_site ) {
				global $wpdb;
				$keys = $wpdb->get_col( "SELECT meta_key FROM $wpdb->postmeta GROUP BY meta_key ORDER BY meta_key" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				if ( $keys ) {
					natcasesort( $keys );
					foreach ( array_filter( $keys ) as $key ) {
						$meta_field_list[ esc_attr( $key ) ] = esc_html( $key );
					}
				}
			}

			wp_send_json_success(
				array(
					'taxonomies'          => $taxonomy_list,
					'authors'             => array(),
					'author_list'         => $author_list,
					'post_count'          => $post_count,
					'image_sizes'         => get_intermediate_image_sizes(),
					'all_post_type_list'  => get_post_types( array( 'public' => true ) ),
					'all_meta_field_list' => $meta_field_list,
				)
			);
		}


		/**
		 * Get like button data — delegates to SP_PCP_User_Like if available.
		 *
		 * @param int $post_id Post ID.
		 * @return array
		 */
		private function get_like_button_data( $post_id ) {
			if ( class_exists( 'SP_PCP_User_Like' ) && method_exists( 'SP_PCP_User_Like', 'get_pcp_likes_block_button' ) ) {
				return SP_PCP_User_Like::get_pcp_likes_block_button( $post_id );
			}

			return array(
				'button_class' => ' pcpl-button-1',
				'nonce'        => wp_create_nonce( 'post-like-nonce-' . $post_id ),
				'is_comment'   => 0,
				'title'        => 'Like',
				'loader'       => '<span id="pcpl-loader"></span>',
				'icon'         => '<span class="sp-smart-post-meta-icon"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="currentColor"><path d="M89.5313 12.5585C78.2422 3.06629 60.8008 4.49207 50 15.4882C39.1992 4.49207 21.7578 3.04676 10.4688 12.5585C-4.21873 24.9218 -2.07029 45.078 8.39846 55.7616L42.6563 90.6639C44.6094 92.6561 47.2266 93.7694 50 93.7694C52.793 93.7694 55.3907 92.6757 57.3438 90.6835L91.6016 55.7811C102.051 45.0975 104.238 24.9413 89.5313 12.5585Z"/></svg></span>',
			);
		}

		/**
		 * Get all terms as HTML list.
		 *
		 * @param int $post_id Post ID.
		 * @return string
		 */
		private function get_all_terms_html( $post_id ) {
			$categories = get_the_category( $post_id );
			if ( empty( $categories ) ) {
				return '';
			}

			$html = '<ul class="post-categories">';
			foreach ( $categories as $cat ) {
				$html .= sprintf(
					'<li><a href="%s" rel="noreferrer noopener" data-slug="%s">%s</a></li>',
					esc_url( get_category_link( $cat->term_id ) ),
					esc_attr( $cat->slug ),
					esc_html( $cat->name )
				);
			}
			return $html . '</ul>';
		}

		/**
		 * Resolve mime type string to a simple type label.
		 *
		 * @param string $mime_type Full mime type e.g. 'image/jpeg'.
		 * @return string image|video|audio|pdf|file
		 */
		private function get_attachment_type( $mime_type ) {
			if ( strpos( $mime_type, 'image/' ) === 0 ) {
				return 'image'; }
			if ( strpos( $mime_type, 'video/' ) === 0 ) {
				return 'video'; }
			if ( strpos( $mime_type, 'audio/' ) === 0 ) {
				return 'audio'; }
			if ( strpos( $mime_type, 'application/pdf' ) === 0 ) {
				return 'pdf';   }
			return 'file';
		}

		/**
		 * Get all registered image sizes with URLs for a given attachment.
		 *
		 * @param int $attachment_id Attachment ID.
		 * @return array
		 */
		private function get_image_sizes( $attachment_id ) {
			if ( ! wp_attachment_is_image( $attachment_id ) ) {
				return array();
			}

			$size_data = array();
			foreach ( get_intermediate_image_sizes() as $size ) {
				$image = wp_get_attachment_image_src( $attachment_id, $size );
				if ( $image ) {
					$size_data[ $size ] = array(
						'url'    => $image[0],
						'width'  => $image[1],
						'height' => $image[2],
					);
				}
			}
			return $size_data;
		}
	}
}
