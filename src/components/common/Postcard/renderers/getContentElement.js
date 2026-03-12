import { getCategoryRenderLocation } from "../../../../../utils/getRenderLocation";
import { useDeviceType } from "../../../../hooks/useDevice";
import CategoryList from "../CategoryList";
import Excerpt from "../Excerpt";
import MetaSeparator from "../MetaSeparator";
import ReadMore from "../ReadMore";
import SocialIcon from "../SocialIcon";
import Title from "../Title";
import getMetaElement from "./getMetaElement";

const getContentElement = (
	item,
	{
		post,
		title,
		orientation,
		metaDataAllContentArray,
		metaDisplayType,
		metaContext,
		metaColumnGap,
		metaRowGap,
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
		showReadMore,
		showTitle,
		taxonomyType,
		taxonomyPosition,
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
	},
) => {
	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";

	switch (item.value) {
		case "category": {
			const { showInContent } = getCategoryRenderLocation(
				taxonomyPosition,
				orientation,
			);
			if (!showInContent) return null;
			return <CategoryList key="category" post={post} type={taxonomyType} />;
		}

		case "title":
			return (
				showTitle && <Title badges={post.badges_list} title={title}></Title>
			);

		case "meta":
			const visibleItems = metaDataAllContentArray.filter((i) => i.show);
			return (
				<div
					key="meta"
					className={`sp-smart-post-carousel-card-meta-wrapper ${metaDisplayType}`}
					style={{
						"--meta-column-gap": `${metaColumnGap ?? 8}px`,
						"--meta-row-gap": `${metaRowGap ?? 12}px`,
						"--meta-margin": `${metaMargin[normalizedDeviceType]?.top ?? 0}px ${
							metaMargin[normalizedDeviceType]?.right ?? 0
						}px ${metaMargin[normalizedDeviceType]?.bottom ?? 0}px ${
							metaMargin[normalizedDeviceType]?.left ?? 0
						}px`,
						"--metaSeparatorColor": `${metaSeparatorColor ?? "#000000"}`,
						"--meta-font-family": metaContext?.metaTypo?.family ?? "inherit",
						"--meta-font-size": `${metaContext?.metaTypo?.fontSize ?? 12}px`,
						"--meta-font-weight": metaContext?.metaTypo?.weight ?? 400,
						"--meta-line-height": metaContext?.metaTypo?.height ?? 1.5,
						"--meta-letter-spacing": `${metaContext?.metaTypo?.spacing ?? 0}px`,
					}}
				>
					{metaDisplayType === "split" ? (
						<>
							<div className="sp-smart-post-carousel-meta-left">
								{metaDataAllContentArray
									.filter((i) => i.show && i.position === "left")
									.map((i, index, arr) => (
										<>
											{getMetaElement(i, metaContext)}
											{index < arr.length - 1 && (
												<MetaSeparator type={metaSeparatorStyle} />
											)}
										</>
									))}
							</div>
							<div className="sp-smart-post-carousel-meta-right">
								{metaDataAllContentArray
									.filter((i) => i.show && i.position === "right")
									.map((i, index, arr) => (
										<>
											{getMetaElement(i, metaContext)}
											{index < arr.length - 1 && (
												<MetaSeparator type={metaSeparatorStyle} />
											)}
										</>
									))}
							</div>
						</>
					) : (
						visibleItems.map((i, index) => (
							<>
								{getMetaElement(i, metaContext)}
								{index < visibleItems.length - 1 && (
									<MetaSeparator type={metaSeparatorStyle} />
								)}
							</>
						))
					)}
				</div>
			);

		case "excerpt":
			return showExcerpt ? (
				<Excerpt
					key="excerpt"
					excerptType={excerptType}
					post={post}
					excerptLength={excerptLength}
					excerptEllipsis={excerptEllipsis}
					excerptTypo={excerptTypo}
					excerptColor={excerptColor}
					excerptMargin={excerptMargin}
				/>
			) : null;

		case "readMore":
			return showReadMore ? <ReadMore></ReadMore> : null;

		case "social":
			return (
				showSocialShare && (
					<div
						className="sp-smart-post-carousel-share-icons-preview"
						style={{
							"--social-icon-size": `${
								socialIconSize[normalizedDeviceType] ?? 36
							}px`,
							"--social-icon-color-normal": shareIconColorNormal,
							"--social-icon-color-hover": shareIconColorHover,
							"--social-icon-bg-normal": shareIconBackgroundColorNormal,
							"--social-icon-bg-hover": shareIconBackgroundColorHover,
							"--social-icon-border": socialIconBorderStyle || "none",
							"--social-icon-border-size": `${
								socialIconBorderWidth?.[normalizedDeviceType] ?? 0
							}px`,
							"--social-icon-border-color": `${
								socialIconBorderColor ?? "#4e4f52"
							}`,
							"--social-icon-border-radius": `${
								socialIconBorderRadiusNormal?.[normalizedDeviceType] ?? 0
							}px`,
							"--social-icon-gap": `${
								socialIconGap?.[normalizedDeviceType] ?? 0
							}px`,
							"--social-icon-padding": `${
								socialIconPadding?.[normalizedDeviceType]?.top ?? 0
							}px ${socialIconPadding?.[normalizedDeviceType]?.right ?? 0}px ${
								socialIconPadding?.[normalizedDeviceType]?.bottom ?? 0
							}px ${socialIconPadding?.[normalizedDeviceType]?.left ?? 0}px`,
							"--social-icon-margin": `${
								socialIconMargin?.[normalizedDeviceType]?.top ?? 0
							}px ${socialIconMargin?.[normalizedDeviceType]?.right ?? 0}px ${
								socialIconMargin?.[normalizedDeviceType]?.bottom ?? 0
							}px ${socialIconMargin?.[normalizedDeviceType]?.left ?? 0}px`,
						}}
					>
						{sharingMedia.map(({ value }) => (
							<SocialIcon key={value} value={value} type={socialIconType} />
						))}
					</div>
				)
			);

		default:
			return null;
	}
};

export default getContentElement;
