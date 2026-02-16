import { getPostDate } from "../../../../utils";
import { useDeviceType } from "../../../hooks/useDevice";
import CategoryList from "./CategoryList";
import MetaItem from "./MetaItem";
import { ReadingTime } from "./ReadingTime";

function PostCard({ post, attributes }) {
	const title = post?.title;
	const imageAlt = post?.image_alt || "featured image";
	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";
	const { height, contentAlignment, equalHeight } = attributes;

	const author =
		post?._embedded?.author?.[0]?.name || post?.author || "Salah Uddin";

	const postDate = getPostDate(post);

	const commentsCount = post?.comment_count?.all || 0;
	const views = post?.view_count || 0;
	const likes = post?.like_count || 0;

	const image =
		post?.post_thumbnail_url ||
		"http://localhost:10038/wp-content/plugins/smart-post-show-pro/public/assets/img/placeholder.png";

	// orientation class
	const orientation = attributes?.contentOrientation || "orientation_one";

	const cardClassName = `sp-smart-post-carousel-card ${orientation}${
		equalHeight ? " equal-height" : ""
	}`;

	return (
		<div
			className={cardClassName}
			style={{
				"--cardHeight": !equalHeight
					? `${height[normalizedDeviceType]}px`
					: undefined,
			}}
		>
			{/* IMAGE */}
			<div className="sp-smart-post-carousel-card-image">
				<img src={image} alt={imageAlt} />

				{/* category overlay */}
				<div className="sp-smart-post-carousel-overlay-category">
					<CategoryList categories={post.category} />
				</div>

				{/* date badge  */}
				<div className="sp-smart-post-carousel-date">
					<span className="sp-smart-post-carousel-day">{postDate.day}</span>
					<span className="sp-smart-post-carousel-month-year">
						{postDate.month} {postDate.year}
					</span>
				</div>
			</div>

			{/* CONTENT */}
			<div
				className="sp-smart-post-carousel-template-content"
				style={{
					"--alignment": `${contentAlignment}`,
				}}
			>
				{/* hide duplicate category in orientation 3 */}
				{orientation !== "orientation_three" && (
					<CategoryList categories={post.category} />
				)}

				<h3
					className="sp-smart-post-carousel-card-title"
					dangerouslySetInnerHTML={{ __html: title }}
				/>

				<div className="sp-smart-post-carousel-card-meta-wrapper">
					<MetaItem icon="author" text={author} />
					{orientation !== "orientation_two" && (
						<MetaItem icon="date" text={postDate.meta} />
					)}
					<MetaItem icon="comments" text={commentsCount} />
					<MetaItem icon="views" text={views} />
					<MetaItem icon="likes" text={likes} />

					<ReadingTime content={post.content} attributes={attributes} />
				</div>
			</div>
		</div>
	);
}

export default PostCard;
