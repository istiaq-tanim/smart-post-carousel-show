import { useMemo } from "@wordpress/element";
import { useAttributes } from "../../../hooks/useAttributes";
import { useDeviceType } from "../../../hooks/useDevice";

function Title({ title, badges }) {
	const { attributes } = useAttributes();

	const { titleLength, titleType, titleTag, badgesGap, showBadges } =
		attributes;

	const tagFontSizes = {
		h1: "44px",
		h2: "32px",
		h3: "24px",
		h4: "22px",
		h5: "20px",
		h6: "18px",
		p: "22px",
	};
	const Tag = titleTag || "h3";
	const badgePosition = attributes.badgePosition;

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

	const derivedFontSize = tagFontSizes[titleTag] ?? "24px";
	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";

	return (
		<div
			style={{
				"--title-font-size": derivedFontSize,
				"--badgeBetweenGap": `${badgesGap[normalizedDeviceType]}px`,
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
			</Tag>
		</div>
	);
}

export default Title;
