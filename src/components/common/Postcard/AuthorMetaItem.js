import { userIcons } from "../../../const";

export default function AuthorMeta({
	author,
	authorAvatar,
	authorDisplayType,
	authorIconStyle,
	color,
	typo,
}) {
	const authorIcon =
		userIcons.find((i) => i.value === authorIconStyle)?.icon ||
		userIcons[0].icon;

	const normalColor = color?.normal ?? color ?? "inherit";
	const hoverColor = color?.hover || normalColor;
	const Tag = typo?.tags ?? "span";

	const colorVars = {
		"--meta-normal-color": normalColor,
		"--meta-hover-color": hoverColor,
	};

	switch (authorDisplayType) {
		case "gravatar":
			return (
				<Tag className="sp-smart-post-carousel-card-meta-item">
					<img
						className="sp-smart-post-carousel-author-avatar"
						src={authorAvatar}
						alt={author}
					/>
				</Tag>
			);

		case "nameGravatar":
			return (
				<Tag
					className="sp-smart-post-carousel-card-meta-item"
					style={colorVars}
				>
					<img
						className="sp-smart-post-carousel-author-avatar"
						src={authorAvatar}
						alt={author}
					/>
					<span className="sp-smart-post-carousel-card-meta-item-text">
						{author}
					</span>
				</Tag>
			);

		case "iconName":
			return (
				<Tag
					className="sp-smart-post-carousel-card-meta-item"
					style={colorVars}
				>
					<span className="sp-smart-post-carousel-card-meta-item-icon">
						{authorIcon}
					</span>
					<span className="sp-smart-post-carousel-card-meta-item-text">
						{author}
					</span>
				</Tag>
			);

		case "name":
		default:
			return (
				<Tag
					className="sp-smart-post-carousel-card-meta-item"
					style={colorVars}
				>
					<span className="sp-smart-post-carousel-card-meta-item-text">
						{author}
					</span>
				</Tag>
			);
	}
}
