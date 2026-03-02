import { useDeviceType } from "../../../hooks/useDevice";
import { FacebookIcon } from "../../../smart-post-carousel/assets/icon";
import CategoryList from "./CategoryList";
import Excerpt from "./Excerpt";
import MetaSeparator from "./MetaSeparator";
import getMetaElement from "./renderers/getMetaElement";

function ContentElement({ item, context }) {
	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";

	const {
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
	} = context;

	switch (item.value) {
		case "category":
			return orientation !== "orientation_three" ? (
				<CategoryList key="category" categories={post.category} />
			) : null;

		case "title":
			return (
				<h3
					key="title"
					className="sp-smart-post-carousel-card-title"
					dangerouslySetInnerHTML={{ __html: title }}
				/>
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
						"--metaSeparatorColor": metaSeparatorColor ?? "#000000",
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
										<React.Fragment key={i.value}>
											{getMetaElement(i, metaContext)}
											{index < arr.length - 1 && (
												<MetaSeparator type={metaSeparatorStyle} />
											)}
										</React.Fragment>
									))}
							</div>
							<div className="sp-smart-post-carousel-meta-right">
								{metaDataAllContentArray
									.filter((i) => i.show && i.position === "right")
									.map((i, index, arr) => (
										<React.Fragment key={i.value}>
											{getMetaElement(i, metaContext)}
											{index < arr.length - 1 && (
												<MetaSeparator type={metaSeparatorStyle} />
											)}
										</React.Fragment>
									))}
							</div>
						</>
					) : (
						visibleItems.map((i, index) => (
							<React.Fragment key={i.value}>
								{getMetaElement(i, metaContext)}
								{index < visibleItems.length - 1 && (
									<MetaSeparator type={metaSeparatorStyle} />
								)}
							</React.Fragment>
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
			return (
				<div key="readMore" className="sp-smart-post-carousel-read-more-button">
					<a className="sp-smart-post-carousel-read-more-btn-link">Read More</a>
				</div>
			);

		case "social":
			return (
				<ul key="social" className="sp-smart-post-carousel-social-share">
					{[0, 1, 2].map((i) => (
						<li key={i} className="sp-smart-post-carousel-social-share-icon">
							<i className="sp-icon-facebook">
								<FacebookIcon />
							</i>
						</li>
					))}
				</ul>
			);

		default:
			return null;
	}
}

export default ContentElement;
