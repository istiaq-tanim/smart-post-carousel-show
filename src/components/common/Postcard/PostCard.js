import { useMemo } from "@wordpress/element";
import { getPostDate } from "../../../../utils";
import { useDeviceType } from "../../../hooks/useDevice";

import CategoryList from "./CategoryList";
import ContentElement from "./ContentElement";

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
		contentBackGroundStyles,
		contentBorderStyle,
		contentHoverBorderStyle,
		contentBorderWidthNormal,
		contentBorderWidthHover,
		contentBorderColorNormal,
		contentBorderColorHover,
		contentBorderRadiusNormal,
		contentBorderRadiusHover,
		contentPadding,
		contentInnerPadding,
		contentMargin,
		contentBoxShadow,
		contentBoxShadowColor,
		showContentBoxShadow,
		showExcerpt,
		excerptType,
		excerptLength,
		excerptEllipsis,
		excerptTypo,
		excerptColor,
		excerptMargin,
		buttonType,
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
			showExcerpt,
			excerptType,
			excerptLength,
			excerptEllipsis,
			excerptTypo,
			excerptColor,
			excerptMargin,
			buttonType,
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
		],
	);

	const bgType = contentBackGroundStyles?.type || "transparent";
	const hoverBgType = contentBackGroundStyles?.hoverType || "transparent";

	const normalBg =
		bgType === "gradient"
			? contentBackGroundStyles?.gradientBackground
			: bgType === "solid"
			? contentBackGroundStyles?.solidBackground
			: null;

	const hoverBg =
		hoverBgType === "gradient"
			? contentBackGroundStyles?.hoverGradientBackground
			: hoverBgType === "solid"
			? contentBackGroundStyles?.hoverSolidBackground
			: null;

	return (
		<div
			className={cardClassName}
			style={{
				"--cardHeight": equalHeight
					? `${height[normalizedDeviceType]}px`
					: undefined,
				...(normalBg && { "--card-bg": normalBg }),
				...(hoverBg && { "--card-hover-bg": hoverBg }),
				"--card-border": contentBorderStyle || "none",
				"--card-hover-border": contentHoverBorderStyle || "none",
				"--card-border-width": `${
					contentBorderWidthNormal[normalizedDeviceType] || 1
				}px`,
				"--card-hover-border-width": `${
					contentBorderWidthHover[normalizedDeviceType] || 1
				}px`,
				"--card-border-color": contentBorderColorNormal || "#000",
				"--card-hover-border-color": contentBorderColorHover || "#000",
				"--card-border-radius": `${
					contentBorderRadiusNormal?.[normalizedDeviceType] ?? 0
				}px`,
				"--card-hover-border-radius": `${
					contentBorderRadiusHover?.[normalizedDeviceType] ?? 0
				}px`,
				"--card-padding": `${contentPadding[normalizedDeviceType].top ?? 0}px ${
					contentPadding[normalizedDeviceType].right ?? 0
				}px ${contentPadding[normalizedDeviceType].bottom ?? 0}px ${
					contentPadding[normalizedDeviceType].left ?? 0
				}px`,
				"--card-innerPadding": `${
					contentInnerPadding[normalizedDeviceType].top ?? 0
				}px ${contentInnerPadding[normalizedDeviceType].right ?? 0}px ${
					contentInnerPadding[normalizedDeviceType].bottom ?? 0
				}px ${contentInnerPadding[normalizedDeviceType].left ?? 0}px`,
				"--card-Margin": `${contentMargin[normalizedDeviceType].top ?? 0}px ${
					contentMargin[normalizedDeviceType].right ?? 0
				}px ${contentMargin[normalizedDeviceType].bottom ?? 0}px ${
					contentMargin[normalizedDeviceType].left ?? 0
				}px`,
				...(showContentBoxShadow &&
					contentBoxShadow?.[normalizedDeviceType] && {
						"--contentBoxShadow": `${
							contentBoxShadow[normalizedDeviceType].type === "inset"
								? "inset"
								: ""
						} ${contentBoxShadow[normalizedDeviceType].xOffset ?? 0}px ${
							contentBoxShadow[normalizedDeviceType].yOffset ?? 0
						}px ${contentBoxShadow[normalizedDeviceType].blur ?? 0}px ${
							contentBoxShadow[normalizedDeviceType].spread ?? 0
						}px ${contentBoxShadowColor ?? "transparent"}`.trim(),
					}),
			}}
		>
			{/* IMAGE */}
			<div className="sp-smart-post-carousel-card-wrapper">
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
					{allContentArray.map((item) => (
						<ContentElement
							key={item.value}
							item={item}
							context={contentContext}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default PostCard;
