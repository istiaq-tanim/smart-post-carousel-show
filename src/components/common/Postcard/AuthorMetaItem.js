import { ICONS } from "../../../smart-post-carousel/assets/metaIcon";

export default function AuthorMeta({
	author,
	authorAvatar,
	authorDisplayType,
}) {
	switch (authorDisplayType) {
		case "gravatar":
			return (
				<span className="sp-smart-post-carousel-card-meta-item">
					<img
						className="sp-smart-post-carousel-author-avatar"
						src={authorAvatar}
						alt={author}
					/>
				</span>
			);

		case "nameGravatar":
			return (
				<span className="sp-smart-post-carousel-card-meta-item">
					<img
						className="sp-smart-post-carousel-author-avatar"
						src={authorAvatar}
						alt={author}
					/>
					<span className="sp-smart-post-carousel-card-meta-item-text">
						{author}
					</span>
				</span>
			);

		case "iconName":
			return (
				<span className="sp-smart-post-carousel-card-meta-item">
					{ICONS["author"]}
					<span className="sp-smart-post-carousel-card-meta-item-text">
						{author}
					</span>
				</span>
			);

		case "name":
		default:
			return (
				<span className="sp-smart-post-carousel-card-meta-item">
					<span className="sp-smart-post-carousel-card-meta-item-text">
						{author}
					</span>
				</span>
			);
	}
}
