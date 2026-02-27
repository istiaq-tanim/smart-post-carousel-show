import { useMemo } from "@wordpress/element";
import { getPostDate } from "../../../../utils";
import { useDeviceType } from "../../../hooks/useDevice";

import CategoryList from "./CategoryList";
import getContentElement from "./renderers/getContentElement";

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
		allContentArray,
		authorIcon,
		metaColor,
		dateFormat,
		metaRowGap,
		metaColumnGap,
		metaMargin,
		metaSeparatorStyle,
		metaSeparatorColor,
		metaTypo,
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

	const metaContext = useMemo(
		() => ({
			author,
			authorAvatar,
			authorDisplayStyle,
			postDate,
			commentsCount,
			views,
			likes,
			post,
			attributes,
			orientation,
			authorIcon,
			dateFormat,
			metaColor,
			metaTypo,
		}),
		[
			author,
			authorAvatar,
			authorDisplayStyle,
			postDate,
			commentsCount,
			views,
			likes,
			post,
			attributes,
			orientation,
			authorIcon,
			dateFormat,
			metaColor,
			metaTypo,
		],
	);
	const contentContext = useMemo(
		() => ({
			post,
			title,
			orientation,
			contentAlignment,
			metaDataAllContentArray,
			metaDisplayType,
			metaContext,
			metaColor,
			metaRowGap,
			metaColumnGap,
			metaMargin,
			metaSeparatorStyle,
			metaSeparatorColor,
		}),
		[
			post,
			title,
			orientation,
			contentAlignment,
			metaDataAllContentArray,
			metaDisplayType,
			metaContext,
			metaColor,
			metaRowGap,
			metaColumnGap,
			metaMargin,
			metaSeparatorStyle,
			metaSeparatorColor,
		],
	);

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
				{allContentArray.map((item) => getContentElement(item, contentContext))}
			</div>
		</div>
	);
}

export default PostCard;
