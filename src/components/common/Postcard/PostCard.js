import { useMemo } from "@wordpress/element";
import { getPostDate } from "../../../../utils";
import { useDeviceType } from "../../../hooks/useDevice";

import { getCardStyles } from "../../../../utils/getCardStyles";
import { getCategoryRenderLocation } from "./../../../../utils/getRenderLocation";
import CategoryList from "./CategoryList";
import getContentElement from "./renderers/getContentElement";
import { getImageStyles } from "../../../../utils/getImageStyle";
import { getOverLayStyle } from "../../../../utils/getOverlaySTyle";

function PostCard({ post, attributes, index }) {
	const title = post?.title;
	const imageAlt = post?.image_alt || "featured image";
	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";

	const {
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
		showExcerpt,
		excerptType,
		excerptLength,
		excerptEllipsis,
		excerptTypo,
		excerptColor,
		excerptMargin,
		buttonType,
		buttonText,
		showReadMore,
		buttonTypo,
		showTitle,
		taxonomyType,
		taxonomyPosition,
		taxonomyTypo,
		sharingMedia,
		showSocialShare,
		socialIconSize,
		socialIconType,
		shareIconColorNormal,
		shareIconColorHover,
		shareIconBackgroundColorNormal,
		shareIconBackgroundColorHover,
		socialIconBorderStyle,
		socialIconBorderWidth,
		socialIconBorderColor,
		socialIconBorderRadiusNormal,
		socialIconGap,
		socialIconPadding,
		socialIconMargin,
		showFeaturedImage,
		imageSize,
		imageWidth,
		imageHeight,
		imageOverlayType,
		imageScale,
		imageBackGroundStyles,
	} = attributes;

	const author =
		post?._embedded?.author?.[0]?.name || post?.author || "Kazi Istiaq Mahamud";

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
		: "https://www.gravatar.com/avatar/?d=mp&s=48";

	const cardClassName = `sp-smart-post-carousel-card ${orientation}${
		equalHeight ? " equal-height" : ""
	}`;

	const { showOverlay, isAboveTitle, isOverlay, isDefaultOverlay } =
		getCategoryRenderLocation(taxonomyPosition, orientation);

	const overlayClass = `sp-smart-post-carousel-overlay-category${
		taxonomyPosition ? ` ${taxonomyPosition}` : ""
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
			showExcerpt,
			excerptType,
			excerptLength,
			excerptEllipsis,
			excerptTypo,
			excerptColor,
			excerptMargin,
			buttonType,
			buttonText,
			showReadMore,
			buttonTypo,
			showTitle,
			taxonomyType,
			taxonomyPosition,
			taxonomyTypo,
			sharingMedia,
			showSocialShare,
			socialIconSize,
			socialIconType,
			shareIconColorNormal,
			shareIconColorHover,
			shareIconBackgroundColorNormal,
			shareIconBackgroundColorHover,
			socialIconBorderStyle,
			socialIconBorderWidth,
			socialIconBorderColor,
			socialIconBorderRadiusNormal,
			socialIconGap,
			socialIconPadding,
			socialIconMargin,
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
			showExcerpt,
			excerptType,
			excerptLength,
			excerptEllipsis,
			excerptTypo,
			excerptColor,
			excerptMargin,
			buttonType,
			buttonText,
			showReadMore,
			buttonTypo,
			showTitle,
			taxonomyType,
			taxonomyPosition,
			sharingMedia,
			showSocialShare,
			socialIconSize,
			socialIconType,
			shareIconColorNormal,
			shareIconColorHover,
			socialIconBorderColor,
			socialIconBorderStyle,
			socialIconBorderWidth,
			socialIconBorderRadiusNormal,
			socialIconGap,
			socialIconPadding,
			socialIconMargin,
		],
	);

	const cardStyles = getCardStyles(attributes, normalizedDeviceType);
	const dateShow = metaDataAllContentArray.find(
		(item) => item.value === "date",
	);

	const imageStyles = getImageStyles(
		imageSize,
		imageWidth,
		imageHeight,
		normalizedDeviceType,
	);

	const overlayStyles = getOverLayStyle(
		imageOverlayType,
		index,
		imageBackGroundStyles,
	);

	console.log(overlayStyles);

	const combinedImageStyles = {
		...imageStyles,
		...overlayStyles,
		"--cardScale": `${imageScale ?? "none"}`,
	};

	return (
		<div className={cardClassName} style={cardStyles}>
			<div className="sp-smart-post-carousel-card-wrapper">
				{/* ── IMAGE ── */}
				{showFeaturedImage && (
					<div
						className="sp-smart-post-carousel-card-image"
						style={combinedImageStyles}
					>
						<img src={image} alt={imageAlt} />

						<div className="sp-smart-post-carousel-card-image-overlay" />

						{showOverlay && (
							<div className={overlayClass}>
								<CategoryList post={post} type={taxonomyType} />
							</div>
						)}

						{/* Date badge */}
						{dateShow.show && (
							<div className="sp-smart-post-carousel-date">
								<span className="sp-smart-post-carousel-day">
									{postDate.day}
								</span>
								<span className="sp-smart-post-carousel-month-year">
									{postDate.month} {postDate.year}
								</span>
							</div>
						)}
					</div>
				)}

				{/* ── CONTENT ── */}
				<div
					className="sp-smart-post-carousel-template-content"
					style={{ "--alignment": `${contentAlignment}` }}
				>
					{isAboveTitle && <CategoryList post={post} type={taxonomyType} />}
					{allContentArray.map((item) =>
						getContentElement(item, contentContext),
					)}
				</div>
			</div>
		</div>
	);
}

export default PostCard;
