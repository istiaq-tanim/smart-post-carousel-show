import { getCategoryRenderLocation } from "../../../../../utils/getRenderLocation";
import { useDeviceType } from "../../../../hooks/useDevice";
import CategoryList from "../CategoryList";
import Excerpt from "../Excerpt";
import MetaSeparator from "../MetaSeparator";
import ReadMore from "../ReadMore";
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
		showTaxonomy,
		showMetaData,
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
			return (
				showTaxonomy && (
					<CategoryList key="category" post={post} type={taxonomyType} />
				)
			);
		}

		case "title":
			return (
				showTitle && <Title badges={post.badges_list} title={title}></Title>
			);

		case "meta":
			if (!showMetaData) return null;
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
				<ul key="social" className="sp-smart-post-carousel-social-share">
					<li className="sp-smart-post-carousel-social-share-icon">
						<i className="sp-icon-facebook"></i>
					</li>
					<li className="sp-smart-post-carousel-social-share-icon">
						<i className="sp-icon-facebook"></i>
					</li>
					<li className="sp-smart-post-carousel-social-share-icon">
						<i className="sp-icon-facebook"></i>
					</li>
				</ul>
			);

		default:
			return null;
	}
};

export default getContentElement;
