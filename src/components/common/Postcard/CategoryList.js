import { parseTagList } from "../../../../utils/parseTagList";
import { useAttributes } from "../../../hooks/useAttributes";
import { useDeviceType } from "../../../hooks/useDevice";

export default function CategoryList({ post, type = "category", className = "" }) {

	const { attributes } = useAttributes();
	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";

	const { taxonomyTextColor, taxonomyBackGroundStyles, taxonomyBorderStyle, taxonomyHoverBorderStyle, taxonomyBorderWidthNormal, taxonomyBorderWidthHover, taxonomyBorderColorNormal, taxonomyBorderColorHover, taxonomyPadding, taxonomyMargin, taxonomyGap, taxonomyBorderRadiusNormal, taxonomyBorderRadiusHover } = attributes;

	const normalColor = taxonomyTextColor?.normal ?? color ?? "inherit";
	const hoverColor = taxonomyTextColor?.hover || normalColor;

	const bgType = taxonomyBackGroundStyles?.type || "transparent";
	const hoverBgType = taxonomyBackGroundStyles?.hoverType || "transparent";

	const normalBg =
		bgType === "gradient"
			? taxonomyBackGroundStyles?.gradientBackground
			: bgType === "solid"
				? taxonomyBackGroundStyles?.solidBackground
				: null;

	const hoverBg =
		hoverBgType === "gradient"
			? taxonomyBackGroundStyles?.hoverGradientBackground
			: hoverBgType === "solid"
				? taxonomyBackGroundStyles?.hoverSolidBackground
				: null;


	const items = (() => {
		switch (type) {
			case "post_tag":
				return parseTagList(post?.tag_list);
			case "post_format":
				const format = post?.post_list;
				if (!format || format === "standard") return [];
				return [{
					id: format,
					name: format.charAt(0).toUpperCase() + format.slice(1),
					slug: format,
					href: `/post-format/${format}`,
				}];


			case "sp_smart_badges":
				return (post?.badges_list || []).map(badge => ({
					id: badge.term_id,
					name: badge.name,
					slug: badge.slug,
					href: `/badge/${badge.slug}`,
				}));

			case "category":
			default:
				return (post?.category || []).map(cat => ({
					id: cat.term_id,
					name: cat.cat_name,
					slug: cat.slug,
					href: `/category/${cat.slug}`,
				}));

		}
	})();

	if (!items || items.length === 0) return null;



	return (
		<div className="sp-smart-post-carousel-category" style={{
			"--taxonomy-normal-color": normalColor,
			"--taxonomy-hover-color": hoverColor,
			...(normalBg && { "--button-bg": normalBg }),
			...(hoverBg && { "--button-hover-bg": hoverBg }),
			"--taxonomy-button-border": taxonomyBorderStyle || "none",
			"--taxonomy-hover-border":
				taxonomyHoverBorderStyle === "none"
					? taxonomyBorderStyle
					: taxonomyHoverBorderStyle,
			"--taxonomy-border-size": `${taxonomyBorderWidthNormal?.[normalizedDeviceType] ?? 1}px`,
			"--taxonomy-hover-border-size": `${taxonomyBorderWidthHover?.[normalizedDeviceType] ?? 1}px`,
			"--taxonomy-button-border-color": taxonomyBorderColorNormal || "#000",
			"--taxonomy-button-hover-border-color":
				`${taxonomyBorderColorHover || taxonomyBorderColorNormal}` || "#000",
			"--taxonomy-padding": `${taxonomyPadding?.[normalizedDeviceType]?.top ?? 0}px ${taxonomyPadding?.[normalizedDeviceType]?.right ?? 0}px ${taxonomyPadding?.[normalizedDeviceType]?.bottom ?? 0}px ${taxonomyPadding?.[normalizedDeviceType]?.left ?? 0}px`,

			"--taxonomy-margin": `${taxonomyMargin?.[normalizedDeviceType]?.top ?? 0}px ${taxonomyMargin?.[normalizedDeviceType]?.right ?? 0}px ${taxonomyMargin?.[normalizedDeviceType]?.bottom ?? 0}px ${taxonomyMargin?.[normalizedDeviceType]?.left ?? 0}px`,

			"--taxonomyListBetweenGap": `${taxonomyGap?.[normalizedDeviceType] ?? 4}px`,

			"--taxonomy-border-radius": `${taxonomyBorderRadiusNormal?.[normalizedDeviceType] ?? 0}px`,
			"--taxonomy-hover-border-radius": `${taxonomyBorderRadiusHover?.[normalizedDeviceType] ?? 0}px`,

		}}>
			<ul className={`sp-smart-post-carousel-category-list ${className}`}>
				{items.map((item) => (
					<li
						key={item.id}
						className="sp-smart-post-carousel-category-list-item"
					>
						<a
							href={`/category/${item.slug}`}
							className="sp-smart-post-carousel-category-list-badge"
							title={item?.name}
						>
							{item?.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
