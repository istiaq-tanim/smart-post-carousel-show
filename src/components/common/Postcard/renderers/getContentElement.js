import { useDeviceType } from "../../../../hooks/useDevice";
import { FacebookIcon } from "../../../../smart-post-carousel/assets/icon";
import CategoryList from "../CategoryList";
import MetaSeparator from "../MetaSeparator";
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
	},
) => {
	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";

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
			return (
				<div key="excerpt" className="sp-smart-post-carousel-excerpt-wrapper">
					<p className="sp-smart-post-carousel-excerpt">
						<span>{post?.excerpt?.slice(0, 50)}...</span>
					</p>
				</div>
			);

		case "readMore":
			return (
				<div key="readMore" className="sp-smart-post-carousel-read-more-button">
					<a className="sp-smart-post-carousel-read-more-btn-link">Read More</a>
				</div>
			);

		case "social":
			return (
				<ul key="social" className="sp-smart-post-carousel-social-share">
					<li className="sp-smart-post-carousel-social-share-icon">
						<i className="sp-icon-facebook">
							<FacebookIcon />
						</i>
					</li>
					<li className="sp-smart-post-carousel-social-share-icon">
						<i className="sp-icon-facebook">
							<FacebookIcon />
						</i>
					</li>
					<li className="sp-smart-post-carousel-social-share-icon">
						<i className="sp-icon-facebook">
							<FacebookIcon />
						</i>
					</li>
				</ul>
			);

		default:
			return null;
	}
};

export default getContentElement;
