import CategoryList from "./CategoryList";
import MetaItem from "./MetaItem";
import { ReadingTime } from "./ReadingTime";

function PostCard({ post, attributes }) {
	const title = post?.title;
	const excerpt = post?.excerpt;
	const imageAlt = post?.image_alt || "featured image";
	const author =
		post._embedded?.author?.[0]?.name || post.author || "Salah Uddin";
	const getFormattedDate = () => {
		if (post.post_date?.default) {
			return post.post_date.default;
		}
		if (post.post_date?.month && post.post_date?.day && post.post_date?.year) {
			return `${post.post_date.month} ${post.post_date.day}, ${post.post_date.year}`;
		}

		// If regular date string from WordPress
		if (post.date) {
			return new Date(post.date).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		}

		// Fallback
		return "June 15, 2022";
	};

	// const categories = post._embedded?.["wp:term"]?.[0] || [];
	const commentsCount = post.comment_count.all || 0;
	const views = post.view_count || 0;
	const likes = post.like_count || 0;

	const image =
		post?.post_thumbnail_url ||
		"http://localhost:10038/wp-content/plugins/smart-post-show-pro/public/assets/img/placeholder.png";
	return (
		<div className="sp-smart-post-carousel-card">
			<div className="sp-smart-post-carousel-card-image">
				<img src={image} alt={imageAlt} />
			</div>
			<div className="sp-smart-post-carousel-template-content">
				<CategoryList categories={post.category} />

				<h3
					className="sp-smart-post-carousel-card-title"
					dangerouslySetInnerHTML={{ __html: title }}
				/>
				<div className="sp-smart-post-carousel-card-meta-wrapper">
					<MetaItem icon="author" text={author} />
					<MetaItem icon="date" text={getFormattedDate()} />
					<MetaItem icon="comments" text={commentsCount} />
					<MetaItem icon="views" text={views} />
					<MetaItem icon="likes" text={likes} />
					<ReadingTime
						content={post.content}
						attributes={attributes}
					></ReadingTime>
				</div>
			</div>
		</div>
	);
}

export default PostCard;
