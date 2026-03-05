import { useMemo } from "@wordpress/element";
import { useAttributes } from "../../../hooks/useAttributes";
import { useDeviceType } from "../../../hooks/useDevice";

function Title({ title, badges }) {
	const { attributes } = useAttributes();

	const {
		titleLength,
		titleType,
		titleTag,
		badgesGap,
		showBadges,
		badgeTypo,
		titleTypo,
		titleColor,
		titleMargin,
	} = attributes;

	const Tag = titleTag || "h3";
	const BadgeTag = badgeTypo.tags || "li";
	const badgePosition = attributes.badgePosition;

	const normalTitleColor = titleColor?.normal ?? color ?? "inherit";
	const hoverTitleColor = titleColor?.hover || normalTitleColor;

	const convertTitle = useMemo(() => {
		if (titleType === "full") return title;

		const { value, unit } = titleLength;
		const fullText = title || "";

		if (unit === "words") {
			const words = fullText.trim().split(/\s+/);
			return words.length <= value
				? fullText
				: `${words.slice(0, value).join(" ")}`;
		}

		if (unit === "char") {
			return fullText.length <= value
				? fullText
				: `${fullText.slice(0, value)}`;
		}

		return fullText;
	}, [titleType, titleLength, title]);

	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";

	return (
		<div
			style={{
				"--title-font-size": `${titleTypo.fontSize ?? 12}px`,
				"--title-font-family": titleTypo.family ?? "Roboto",
				"--title-font-weight": titleTypo.weight ?? 400,
				"--title-line-height": titleTypo?.height ?? 1.5,
				"--title-letter-spacing": `${titleTypo?.spacing ?? 0}px`,
				"--title-normal-color": normalTitleColor,
				"--title-hover-color": hoverTitleColor,
				"--badgeBetweenGap": `${badgesGap[normalizedDeviceType]}px`,
				"--badge-font-size": `${badgeTypo.fontSize ?? 12}px`,
				"--badge-font-family": badgeTypo.family ?? "Roboto",
				"--badge-font-weight": badgeTypo.weight ?? 400,
				"--badge-line-height": badgeTypo?.height ?? 1.5,
				"--badge-letter-spacing": `${badgeTypo?.spacing ?? 0}px`,
				"--title-margin": `${titleMargin[normalizedDeviceType].top ?? 0}px ${
					titleMargin[normalizedDeviceType].right ?? 0
				}px ${titleMargin[normalizedDeviceType].bottom ?? 0}px ${
					titleMargin[normalizedDeviceType].left ?? 0
				}px`,
			}}
		>
			<Tag key={Tag} className="sp-smart-post-carousel-card-title">
				{/* Badges Before */}
				{showBadges &&
					badges &&
					badges?.length > 0 &&
					badgePosition === "before" && (
						<span>
							<ul className="sp-smart-post-carousel-title-badges-list sp-smart-post-carousel-badges-before-title">
								{badges.map((badge, index) => (
									<li
										key={index}
										className="sp-smart-post-carousel-title-badge-item"
									>
										{badge.name}
									</li>
								))}
							</ul>
						</span>
					)}

				{/* Title Text */}
				<span
					className="sp-smart-post-title-text"
					data-text="true"
					dangerouslySetInnerHTML={{ __html: convertTitle }}
				/>

				{/* Badges After */}
				{showBadges &&
					badges &&
					badges?.length > 0 &&
					badgePosition === "after" && (
						<span>
							<ul className="sp-smart-post-carousel-title-badges-list sp-smart-post-carousel-badges-after-title">
								{badges.map((badge, index) => (
									<BadgeTag
										key={index}
										className="sp-smart-post-carousel-title-badge-item"
									>
										{badge.name}
									</BadgeTag>
								))}
							</ul>
						</span>
					)}
			</Tag>
		</div>
	);
}

export default Title;
