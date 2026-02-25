import { getPostDate } from "../../../../utils";
import { useDeviceType } from "../../../hooks/useDevice";
import AuthorMeta from "./AuthorMetaItem";
import CategoryList from "./CategoryList";
import MetaItem from "./MetaItem";
import { ReadingTime } from "./ReadingTime";

function PostCard({ post, attributes }) {
	const title = post?.title;
	const imageAlt = post?.image_alt || "featured image";
	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";
	const {
		height,
		contentAlignment,
		equalHeight,
		metaDataAllContentArray = [],
		metaDisplayType,
		authorDisplayStyle,
	} = attributes;

	const author =
		post?._embedded?.author?.[0]?.name || post?.author || "Salah Uddin";

	const postDate = getPostDate(post);

	const commentsCount = post?.comment_count?.all || 0;
	const views = post?.view_count || 0;
	const likes = post?.like_count || 0;

	const image =
		post?.post_thumbnail_url ||
		"http://localhost:10038/wp-content/plugins/smart-post-show-pro/public/assets/img/placeholder.png";

	const orientation = attributes?.contentOrientation || "orientation_one";

	const authorAvatar = post?.author_avatar_url
		? post?.author_avatar_url
		: "`https://www.gravatar.com/avatar/?d=mp&s=48`;";

	const cardClassName = `sp-smart-post-carousel-card ${orientation}${
		equalHeight ? " equal-height" : ""
	}`;

	const getMetaElement = (item) => {
		switch (item.value) {
			case "author":
				return (
					<AuthorMeta
						key="author"
						author={author}
						authorAvatar={authorAvatar}
						authorDisplayType={authorDisplayStyle}
					/>
				);
			case "date":
				return orientation !== "orientation_two" ? (
					<MetaItem key="date" icon="date" text={postDate.meta} />
				) : null;
			case "comments":
				return <MetaItem key="comments" icon="comments" text={commentsCount} />;
			case "views":
				return <MetaItem key="views" icon="views" text={views} />;
			case "likes":
				return <MetaItem key="likes" icon="likes" text={likes} />;
			case "reading-time":
				return (
					<ReadingTime
						key="reading-time"
						content={post.content}
						attributes={attributes}
					/>
				);
			default:
				return null;
		}
	};

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

				<div className="sp-smart-post-carousel-overlay-category">
					<CategoryList categories={post.category} />
				</div>

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
				style={{ "--alignment": `${contentAlignment}` }}
			>
				{orientation !== "orientation_three" && (
					<CategoryList categories={post.category} />
				)}

				<h3
					className="sp-smart-post-carousel-card-title"
					dangerouslySetInnerHTML={{ __html: title }}
				/>

				<div
					className={`sp-smart-post-carousel-card-meta-wrapper ${metaDisplayType}`}
				>
					{metaDisplayType === "split" ? (
						<>
							<div className="sp-smart-post-carousel-meta-left">
								{metaDataAllContentArray
									.filter((item) => item.show && item.position === "left")
									.map((item) => getMetaElement(item))}
							</div>

							<div className="sp-smart-post-carousel-meta-right">
								{metaDataAllContentArray
									.filter((item) => item.show && item.position === "right")
									.map((item) => getMetaElement(item))}
							</div>
						</>
					) : (
						metaDataAllContentArray
							.filter((item) => item.show)
							.map((item) => getMetaElement(item))
					)}
				</div>
			</div>
		</div>
	);
}

export default PostCard;
