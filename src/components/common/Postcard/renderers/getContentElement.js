import { FacebookIcon } from "../../../../smart-post-carousel/assets/icon";
import CategoryList from "../CategoryList";
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
		metaColor,
	},
) => {
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
			return (
				<div
					key="meta"
					className={`sp-smart-post-carousel-card-meta-wrapper ${metaDisplayType}`}
					style={{ color: metaColor }}
				>
					{metaDisplayType === "split" ? (
						<>
							<div className="sp-smart-post-carousel-meta-left">
								{metaDataAllContentArray
									.filter((i) => i.show && i.position === "left")
									.map((i) => getMetaElement(i, metaContext))}
							</div>
							<div className="sp-smart-post-carousel-meta-right">
								{metaDataAllContentArray
									.filter((i) => i.show && i.position === "right")
									.map((i) => getMetaElement(i, metaContext))}
							</div>
						</>
					) : (
						metaDataAllContentArray
							.filter((i) => i.show)
							.map((i) => getMetaElement(i, metaContext))
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
