<?php
/**
 * AJAX Content Query Handler - EXACT Format Match
 * Handles AJAX requests for posts, pages, and media
 * Returns the EXACT same structure as your existing plugin
 *
 * @package Smart_Post_Show_Pro
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

if (!class_exists('SP_Smart_Content_Ajax_Query')) {
	/**
	 * SP_Smart_Content_Ajax_Query class.
	 */
	class SP_Smart_Content_Ajax_Query
	{

		/**
		 * Instance of this class.
		 *
		 * @var SP_Smart_Content_Ajax_Query
		 */
		private static $instance;

		/**
		 * Get singleton instance.
		 *
		 * @return SP_Smart_Content_Ajax_Query
		 */
		public static function instance()
		{
			if (!isset(self::$instance)) {
				self::$instance = new self();
				self::$instance->init();
			}
			return self::$instance;
		}

		/**
		 * Initialize AJAX hooks.
		 *
		 * @return void
		 */
		public function init()
		{
			// Posts AJAX handlers.
			add_action('wp_ajax_sp_get_posts', array($this, 'get_posts'));
			add_action('wp_ajax_nopriv_sp_get_posts', array($this, 'get_posts'));

			// Pages AJAX handlers.
			add_action('wp_ajax_sp_get_pages', array($this, 'get_pages'));
			add_action('wp_ajax_nopriv_sp_get_pages', array($this, 'get_pages'));

			// Media AJAX handlers.
			add_action('wp_ajax_sp_get_media', array($this, 'get_media'));
			add_action('wp_ajax_nopriv_sp_get_media', array($this, 'get_media'));

			// Search content (posts, pages, media).
			add_action('wp_ajax_sp_search_content', array($this, 'search_content'));
			add_action('wp_ajax_nopriv_sp_search_content', array($this, 'search_content'));

			// Metadata query for block options.
			add_action('wp_ajax_sp_meta_data_query', array($this, 'meta_data_query'));
			add_action('wp_ajax_nopriv_sp_meta_data_query', array($this, 'meta_data_query'));
		}

		/**
		 * Verify nonce for security.
		 *
		 * @param string $nonce Nonce value.
		 * @return bool
		 */
		private function verify_nonce($nonce)
		{
			return wp_verify_nonce($nonce, 'sp_content_ajax_nonce');
		}

		/**
		 * Sanitize query parameters.
		 *
		 * @param array $params Parameters to sanitize.
		 * @return array
		 */
		private function sanitize_query_params($params)
		{
			return array(
				'posts_per_page' => isset($params['posts_per_page']) ? intval($params['posts_per_page']) : 10,
				'paged' => isset($params['paged']) ? intval($params['paged']) : 1,
				'orderby' => isset($params['orderby']) ? sanitize_text_field($params['orderby']) : 'date',
				'order' => isset($params['order']) ? sanitize_text_field($params['order']) : 'DESC',
				'search' => isset($params['search']) ? sanitize_text_field($params['search']) : '',
				'category' => isset($params['category']) ? intval($params['category']) : 0,
				'author' => isset($params['author']) ? intval($params['author']) : 0,
				'status' => isset($params['status']) ? sanitize_text_field($params['status']) : 'publish',
			);
		}

		/**
		 * Get posts via AJAX.
		 *
		 * @return void
		 */
		public function get_posts()
		{
			$nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';

			if (!$this->verify_nonce($nonce)) {
				wp_send_json_error(array('message' => 'Invalid nonce'), 403);
			}

			$query_data = isset($_POST['queryData']) ? json_decode(wp_unslash($_POST['queryData']), true) : array();
			$params = $this->sanitize_query_params($query_data);

			$args = array(
				'post_type' => 'post',
				'post_status' => $params['status'],
				'posts_per_page' => $params['posts_per_page'],
				'paged' => $params['paged'],
				'orderby' => $params['orderby'],
				'order' => $params['order'],
			);

			// Add search parameter.
			if (!empty($params['search'])) {
				$args['s'] = $params['search'];
			}

			// Add category filter.
			if (!empty($params['category'])) {
				$args['cat'] = $params['category'];
			}

			// Add author filter.
			if (!empty($params['author'])) {
				$args['author'] = $params['author'];
			}

			$query = new WP_Query($args);
			$posts_data = $this->format_posts_data($query);

			wp_send_json_success(
				array(
					'posts' => $posts_data,
					'posts_status' => count($posts_data) > 0,
					'total_posts' => $query->found_posts,
					'total_pages' => $query->max_num_pages,
					'current_page' => $params['paged'],
				)
			);
		}

		/**
		 * Get pages via AJAX.
		 *
		 * @return void
		 */
		public function get_pages()
		{
			$nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';

			if (!$this->verify_nonce($nonce)) {
				wp_send_json_error(array('message' => 'Invalid nonce'), 403);
			}

			$query_data = isset($_POST['queryData']) ? json_decode(wp_unslash($_POST['queryData']), true) : array();
			$params = $this->sanitize_query_params($query_data);

			$args = array(
				'post_type' => 'page',
				'post_status' => $params['status'],
				'posts_per_page' => $params['posts_per_page'],
				'paged' => $params['paged'],
				'orderby' => $params['orderby'],
				'order' => $params['order'],
			);

			// Add search parameter.
			if (!empty($params['search'])) {
				$args['s'] = $params['search'];
			}

			// Add parent page filter.
			if (isset($query_data['parent_id'])) {
				$args['post_parent'] = intval($query_data['parent_id']);
			}

			$query = new WP_Query($args);
			$pages_data = $this->format_posts_data($query); // Use same format

			wp_send_json_success(
				array(
					'posts' => $pages_data, // Keep as 'posts' for consistency
					'posts_status' => count($pages_data) > 0,
					'total_pages' => $query->found_posts,
					'total_paged' => $query->max_num_pages,
					'current_page' => $params['paged'],
				)
			);
		}

		/**
		 * Get media via AJAX.
		 *
		 * @return void
		 */
		public function get_media()
		{
			$nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';

			if (!$this->verify_nonce($nonce)) {
				wp_send_json_error(array('message' => 'Invalid nonce'), 403);
			}

			$query_data = isset($_POST['queryData']) ? json_decode(wp_unslash($_POST['queryData']), true) : array();
			$params = $this->sanitize_query_params($query_data);

			$args = array(
				'post_type' => 'attachment',
				'post_status' => 'inherit',
				'posts_per_page' => $params['posts_per_page'],
				'paged' => $params['paged'],
				'orderby' => $params['orderby'],
				'order' => $params['order'],
			);

			// Add search parameter.
			if (!empty($params['search'])) {
				$args['s'] = $params['search'];
			}

			// Filter by mime type.
			if (isset($query_data['mime_type'])) {
				$args['post_mime_type'] = sanitize_text_field($query_data['mime_type']);
			}

			$query = new WP_Query($args);
			$media_data = $this->format_media_data($query);

			wp_send_json_success(
				array(
					'posts' => $media_data, // Keep as 'posts' for consistency
					'posts_status' => count($media_data) > 0,
					'total_media' => $query->found_posts,
					'total_pages' => $query->max_num_pages,
					'current_page' => $params['paged'],
				)
			);
		}

		/**
		 * Search across posts, pages, and media.
		 *
		 * @return void
		 */
		public function search_content()
		{
			$nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';

			if (!$this->verify_nonce($nonce)) {
				wp_send_json_error(array('message' => 'Invalid nonce'), 403);
			}

			$search_term = isset($_POST['search']) ? sanitize_text_field(wp_unslash($_POST['search'])) : '';
			$content_type = isset($_POST['contentType']) ? sanitize_text_field(wp_unslash($_POST['contentType'])) : 'all';

			if (empty($search_term)) {
				wp_send_json_error(array('message' => 'Search term is required'), 400);
			}

			$results = array();

			// Search posts.
			if ('all' === $content_type || 'posts' === $content_type) {
				$results['posts'] = $this->search_posts($search_term);
			}

			// Search pages.
			if ('all' === $content_type || 'pages' === $content_type) {
				$results['pages'] = $this->search_pages($search_term);
			}

			// Search media.
			if ('all' === $content_type || 'media' === $content_type) {
				$results['media'] = $this->search_media($search_term);
			}

			wp_send_json_success($results);
		}

		/**
		 * Search posts by term.
		 *
		 * @param string $search_term Search term.
		 * @return array
		 */
		private function search_posts($search_term)
		{
			$query = new WP_Query(
				array(
					'post_type' => 'post',
					'post_status' => 'publish',
					's' => $search_term,
					'posts_per_page' => 20,
				)
			);

			return $this->format_posts_data($query);
		}

		/**
		 * Search pages by term.
		 *
		 * @param string $search_term Search term.
		 * @return array
		 */
		private function search_pages($search_term)
		{
			$query = new WP_Query(
				array(
					'post_type' => 'page',
					'post_status' => 'publish',
					's' => $search_term,
					'posts_per_page' => 20,
				)
			);

			return $this->format_posts_data($query);
		}

		/**
		 * Search media by term.
		 *
		 * @param string $search_term Search term.
		 * @return array
		 */
		private function search_media($search_term)
		{
			$query = new WP_Query(
				array(
					'post_type' => 'attachment',
					'post_status' => 'inherit',
					's' => $search_term,
					'posts_per_page' => 20,
				)
			);

			return $this->format_media_data($query);
		}

		/**
		 * Format posts data for response - EXACT structure as your plugin.
		 *
		 * @param WP_Query $query WordPress query object.
		 * @return array
		 */
		private function format_posts_data($query)
		{
			$posts_data = array();

			if (!$query->have_posts()) {
				return $posts_data;
			}

			while ($query->have_posts()) {
				$query->the_post();

				$post_id = get_the_ID();
				$image_id = get_post_thumbnail_id($post_id);
				$author_meta_id = get_the_author_meta('ID');
				$current_date = get_the_date('c');
				$archive_year = get_the_time('Y');
				$archive_month = get_the_time('m');
				$archive_day = get_the_time('d');

				$posts_data[] = array(
					'post_id' => $post_id,
					'title' => get_the_title(),
					'link' => get_the_permalink(),
					'content' => get_the_content(),
					'excerpt' => get_the_excerpt(),
					'post_thumbnail' => get_the_post_thumbnail(),
					'post_thumbnail_url' => get_the_post_thumbnail_url($post_id, 'full') ?: false,
					'image_size' => 'full',
					'post_image_gallery' => get_post_meta($post_id, '_sp_gallery_ids', true) ?: '',
					'post_video_meta_data' => get_post_meta($post_id, '_sp_video_meta', true) ?: '',
					'attachment_srcset' => wp_get_attachment_image_srcset($image_id) ?: false,
					'attachment_metadata' => wp_get_attachment_metadata($image_id) ?: false,
					'attachment_url' => wp_get_attachment_url($image_id) ?: false,
					'post_thumbnail_id' => $image_id,
					'author' => get_the_author(),
					'author_id' => $author_meta_id,
					'author_avatar_url' => get_avatar_url($author_meta_id),
					'author_url' => get_author_posts_url($author_meta_id),
					'category_list' => get_the_category_list('') ?: false,
					'tag_list' => get_the_tag_list('') ?: false,
					'post_list' => get_post_format($post_id) ?: false,
					'category' => get_the_category() ?: array(),
					'date' => $current_date,
					'date_archive_url' => get_day_link($archive_year, $archive_month, $archive_day),
					'comment_count' => get_comment_count($post_id),
					'view_count' => get_post_meta($post_id, '_post_views_count', true) ?: '',
					'like_count' => get_post_meta($post_id, '_post_like_count', true) ?: '',
					'image_title' => get_the_title($image_id),
					'image_alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true) ?: false,
					'like_options' => $this->get_like_button_data($post_id),
					'post_date' => array(
						'default' => get_the_date(get_option('date_format')),
						'day' => get_the_date('j'),
						'month' => get_the_date('F'),
						'year' => get_the_date('Y'),
					),
					'badges_list' => get_the_terms($post_id, 'sp_smart_badges') ?: false,
					'all_term_list' => $this->get_all_terms_html($post_id),
				);
			}

			wp_reset_postdata();
			return $posts_data;
		}



		/**
		 * Format media data for response.
		 *
		 * @param WP_Query $query WordPress query object.
		 * @return array
		 */
		private function format_media_data($query)
		{
			$media_data = array();

			if (!$query->have_posts()) {
				return $media_data;
			}

			while ($query->have_posts()) {
				$query->the_post();

				$attachment_id = get_the_ID();
				$metadata = wp_get_attachment_metadata($attachment_id);
				$author_meta_id = get_the_author_meta('ID');
				$current_date = get_the_date('c');
				$file_path = get_attached_file($attachment_id);

				$media_data[] = array(
					'post_id' => $attachment_id,
					'title' => get_the_title(),
					'filename' => basename($file_path),
					'url' => wp_get_attachment_url($attachment_id),
					'mime_type' => get_post_mime_type($attachment_id),
					'type' => $this->get_attachment_type(get_post_mime_type($attachment_id)),
					'date' => $current_date,
					'filesize' => file_exists($file_path) ? size_format(filesize($file_path)) : '',
					'image_alt' => get_post_meta($attachment_id, '_wp_attachment_image_alt', true) ?: false,
					'caption' => wp_get_attachment_caption($attachment_id),
					'attachment_metadata' => $metadata,
					'sizes' => $this->get_image_sizes($attachment_id),
					'author' => get_the_author(),
					'author_id' => $author_meta_id,
					'author_avatar_url' => get_avatar_url($author_meta_id),
					'post_thumbnail_url' => wp_get_attachment_url($attachment_id) ?: false,
					'post_date' => array(
						'default' => get_the_date(get_option('date_format')),
						'day' => get_the_date('j'),
						'month' => get_the_date('F'),
						'year' => get_the_date('Y'),
					),
				);
			}

			wp_reset_postdata();
			return $media_data;
		}

		/**
		 * Get like button data (matches your plugin structure).
		 *
		 * @param int $post_id Post ID.
		 * @return array
		 */
		private function get_like_button_data($post_id)
		{
			// Check if SP_PCP_User_Like class exists (your plugin's like functionality)
			if (class_exists('SP_PCP_User_Like') && method_exists('SP_PCP_User_Like', 'get_pcp_likes_block_button')) {
				return SP_PCP_User_Like::get_pcp_likes_block_button($post_id);
			}

			// Fallback structure matching your example
			return array(
				'button_class' => ' pcpl-button-1',
				'nonce' => wp_create_nonce('post-like-nonce-' . $post_id),
				'is_comment' => 0,
				'title' => 'Like',
				'loader' => '<span id="pcpl-loader"></span>',
				'icon' => '<span class="sp-smart-post-meta-icon"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="currentColor"><g clip-path="url(#clip0_20749_9902)"><path d="M89.5313 12.5585C78.2422 3.06629 60.8008 4.49207 50 15.4882C39.1992 4.49207 21.7578 3.04676 10.4688 12.5585C-4.21873 24.9218 -2.07029 45.078 8.39846 55.7616L42.6563 90.6639C44.6094 92.6561 47.2266 93.7694 50 93.7694C52.793 93.7694 55.3907 92.6757 57.3438 90.6835L91.6016 55.7811C102.051 45.0975 104.238 24.9413 89.5313 12.5585ZM84.9219 49.1796L50.6641 84.0819C50.1953 84.5507 49.8047 84.5507 49.336 84.0819L15.0781 49.1796C7.94924 41.9139 6.50393 28.1639 16.5039 19.746C24.1016 13.3593 35.8203 14.3163 43.1641 21.7968L50 28.7694L56.836 21.7968C64.2188 14.2772 75.9375 13.3593 83.4961 19.7264C93.4766 28.1444 91.9922 41.9725 84.9219 49.1796Z"/></g><defs><clipPath id="clip0_20749_9902"><rect width="100" height="100" fill="white"/></clipPath></defs></svg></span>',
			);
		}

		/**
		 * Get all terms HTML (matches your plugin structure).
		 *
		 * @param int $post_id Post ID.
		 * @return string
		 */
		private function get_all_terms_html($post_id)
		{
			$categories = get_the_category($post_id);
			if (empty($categories)) {
				return '';
			}

			$html = '<ul class="post-categories">';
			foreach ($categories as $category) {
				$html .= sprintf(
					'<li><a href="%s" rel="noreferrer noopener" data-slug="%s">%s</a></li>',
					esc_url(get_category_link($category->term_id)),
					esc_attr($category->slug),
					esc_html($category->name)
				);
			}
			$html .= '</ul>';

			return $html;
		}

		/**
		 * Get attachment type from mime type.
		 *
		 * @param string $mime_type Mime type.
		 * @return string
		 */
		private function get_attachment_type($mime_type)
		{
			if (strpos($mime_type, 'image/') === 0) {
				return 'image';
			} elseif (strpos($mime_type, 'video/') === 0) {
				return 'video';
			} elseif (strpos($mime_type, 'audio/') === 0) {
				return 'audio';
			} elseif (strpos($mime_type, 'application/pdf') === 0) {
				return 'pdf';
			}
			return 'file';
		}

		/**
		 * Metadata query for block options panel.
		 * Provides taxonomies, authors, post types, image sizes and meta fields.
		 *
		 * @return void
		 */
		public function meta_data_query()
		{
			$nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';

			if (!$this->verify_nonce($nonce)) {
				wp_send_json_error(array('message' => 'Invalid nonce'), 403);
			}

			$query_data = isset($_POST['metaQueryData']) ? sanitize_text_field(wp_unslash($_POST['metaQueryData'])) : '';
			$query_data = (array) json_decode($query_data);

			// Query data.
			$post_type = isset($query_data['postType']) ? $query_data['postType'] : 'post';

			$ajax_live_filter = isset($query_data['ajaxLiveFilter']) ? (array) $query_data['ajaxLiveFilter'] : array();
			$edit_site = isset($query_data['editSite']) ? $query_data['editSite'] : '';
			$keyword_search = isset($query_data['keywordSearch']) ? $query_data['keywordSearch'] : '';
			$taxonomies_live_filter = isset($query_data['taxonomiesLiveFilter']) ? $query_data['taxonomiesLiveFilter'] : array();
			$author_live_filter = isset($query_data['authorLiveFilter']) ? $query_data['authorLiveFilter'] : array();

			// Resolve multiple post types.
			$multiple_post_type = ('multiple_post_type' === $post_type && isset($query_data['multiplePostType']))
				? $query_data['multiplePostType']
				: array();

			$multiple_post_type = ('multiple_post_type' === $post_type && !empty($multiple_post_type))
				? array_map(
					function ($multi_type) {
						return $multi_type->value;
					},
					$multiple_post_type
				)
				: array('post');

			$multiple_post_type = ('multiple_post_type' === $post_type && !empty($multiple_post_type))
				? $multiple_post_type
				: $post_type;

			// Live filter args.
			$term_query_args = array();
			$author_query_args = array();
			$post_lists = array();
			$all_post_ids = array();
			$ajax_live_filter_keys = array();

			if (!empty($taxonomies_live_filter) || !empty($author_live_filter)) {
				$post_query_args = \SmartPostShow\Blocks\PostQueryHandler::query($query_data, 'args');
				$post_limit = $post_query_args['post_limit'];
				$post_in = $post_query_args['include_posts'];
				$post_query_args = $post_query_args['args'];
				$post_query_args['posts_per_page'] = $post_limit;
				$post_query_args['fields'] = 'ids';
				$post_query_args['offset'] = 0;

				if (!empty($keyword_search)) {
					$post_query_args['s'] = $keyword_search;
				}

				$term_query_args = $post_query_args;
				$author_query_args = $post_query_args;
				$post_lists = get_posts($post_query_args);
				$all_post_ids = $post_in ? $post_in : $post_lists;

				foreach ($ajax_live_filter as $key => $value) {
					switch ($value->type) {
						case 'taxonomy':
							if ('all' !== $value->id) {
								$ajax_live_filter_keys[] = $value->taxonomy_type;
							}
							break;
						case 'author':
							if ('all' !== $value->id) {
								$ajax_live_filter_keys[] = $key;
							}
							break;
					}
				}
			}

			// Taxonomies.
			$all_taxonomies = get_object_taxonomies($multiple_post_type, 'objects');
			$taxonomy_list = array();

			foreach ($all_taxonomies as $taxonomy) {
				$terms = get_terms(
					array(
						'taxonomy' => $taxonomy->name,
						'hide_empty' => false,
					)
				);

				$term_ajax_filter = array();
				$term_items = array();
				$index = 0;

				foreach ($terms as $term) {
					if (!empty($taxonomies_live_filter)) {
						$term_query_args['tax_query'] = array(
							array(
								'taxonomy' => $term->taxonomy,
								'field' => 'term_id',
								'terms' => array($term->term_id),
							),
						);
						$term_query_args['posts_per_page'] = 9999;

						$term_ids = get_posts($term_query_args);
						$term_ids = array_intersect($all_post_ids, $term_ids);

						if ((!empty($ajax_live_filter_keys) && $ajax_live_filter_keys[0] !== $term->taxonomy) || count($ajax_live_filter_keys) > 1) {
							$term_ids = array_intersect($post_lists, $term_ids);
						}

						$child_terms = get_term_children($term->term_id, $taxonomy->name);
						$total_post_count = count($term_ids);

						if (!is_wp_error($child_terms) && count($child_terms) > 0) {
							foreach ($child_terms as $child_term_id) {
								$child_term = get_term($child_term_id, $taxonomy->name);
								$total_post_count += $child_term->count;
							}
						}
					}

					$term_args = array(
						'id' => $index,
						'label' => $term->name,
						'slug' => $term->slug,
						'value' => $term->term_id,
						'type' => 'taxonomy',
						'taxonomy_type' => $term->taxonomy,
					);

					$term_items[] = $term_args;

					if (!empty($taxonomies_live_filter) && !empty($total_post_count)) {
						$term_args['post_count'] = $total_post_count;
						$term_ajax_filter[] = $term_args;
					}

					++$index;
				}

				$taxonomy_list[] = array(
					'label' => $taxonomy->label,
					'name' => $taxonomy->name,
					'terms' => $term_ajax_filter,
					'terms_items' => $term_items,
				);
			}

			// Authors.
			$authors = get_users(array('role__in' => array('author', 'administrator', 'editor')));
			$filtered_authors = array();
			$author_list = array();
			$author_post_ids = array();

			foreach ($authors as $author) {
				if (!empty($author_live_filter) && !empty($author_query_args)) {
					unset($author_query_args['author__not_in']);
					$author_query_args['author__in'] = array($author->ID);
					$author_query_args['fields'] = 'ids';
					$author_post_ids = get_posts($author_query_args);
					$author_post_ids = array_intersect($all_post_ids, $author_post_ids);
				}

				$author_args = array(
					'id' => $author->ID,
					'role' => $author->roles,
					'type' => 'author',
					'value' => $author->ID,
					'label' => $author->display_name,
				);

				$author_list[] = $author_args;

				if (!empty($author_live_filter) && count($author_post_ids) > 0) {
					$author_args['post_count'] = count($author_post_ids);
					$filtered_authors[] = $author_args;
				}
			}

			// All public post types.
			$all_post_type_list = get_post_types(array('public' => true));

			// Meta field list (editor only).
			$meta_field_list = array();
			if ('editSite' === $edit_site) {
				global $wpdb;
				$keys = $wpdb->get_col(
					"SELECT meta_key FROM $wpdb->postmeta GROUP BY meta_key ORDER BY meta_key"
				);
				if ($keys) {
					natcasesort($keys);
				}
				$keys = array_filter($keys);
				foreach ($keys as $key) {
					$meta_field_list[esc_attr($key)] = esc_html($key);
				}
			}

			// Post count.
			$post_count = 0;
			if ('multiple_post_type' === $post_type && !is_string($multiple_post_type)) {
				foreach ($multiple_post_type as $value) {
					$post_count += isset(wp_count_posts($value)->publish) ? (int) wp_count_posts($value)->publish : 0;
				}
			} else {
				$post_count = isset(wp_count_posts($post_type)->publish) ? (int) wp_count_posts($post_type)->publish : 0;
			}

			wp_send_json_success(
				array(
					'taxonomies' => $taxonomy_list,
					'authors' => $filtered_authors,
					'author_list' => $author_list,
					'post_count' => $post_count,
					'image_sizes' => get_intermediate_image_sizes(),
					'all_post_type_list' => $all_post_type_list,
					'all_meta_field_list' => $meta_field_list,
				)
			);
		}

		/**
		 * Get image sizes for attachment.
		 *
		 * @param int $attachment_id Attachment ID.
		 * @return array
		 */
		private function get_image_sizes($attachment_id)
		{
			if (!wp_attachment_is_image($attachment_id)) {
				return array();
			}

			$sizes = get_intermediate_image_sizes();
			$size_data = array();

			foreach ($sizes as $size) {
				$image = wp_get_attachment_image_src($attachment_id, $size);
				if ($image) {
					$size_data[$size] = array(
						'url' => $image[0],
						'width' => $image[1],
						'height' => $image[2],
					);
				}
			}

			return $size_data;
		}
	}

	// Initialize the class.
	SP_Smart_Content_Ajax_Query::instance();
}
