import { memo, useMemo } from "@wordpress/element";
import { useDeviceType } from "../../../hooks/useDevice";

function Excerpt({
	excerptType,
	excerptLength,
	post,
	excerptEllipsis,
	excerptTypo,
	excerptColor,
	excerptMargin,
}) {
	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";
	const excerpt = useMemo(() => {
		if (excerptType === "full") return post?.excerpt;

		const { value, unit } = excerptLength;
		const fullText = post?.excerpt || "";

		if (unit === "words") {
			const words = fullText.trim().split(/\s+/);
			return words.length <= value
				? fullText
				: `${words.slice(0, value).join(" ")}${excerptEllipsis}`;
		}

		if (unit === "char") {
			return fullText.length <= value
				? fullText
				: `${fullText.slice(0, value)}${excerptEllipsis}`;
		}

		return fullText;
	}, [excerptType, excerptLength, post?.excerpt, excerptEllipsis]);

	const Tag = excerptTypo?.tags ?? "span";

	return (
		<div
			key="excerpt"
			className="sp-smart-post-carousel-excerpt-wrapper"
			style={{
				"--excerpt-font-family": excerptTypo?.family ?? "inherit",
				"--excerpt-font-size": `${excerptTypo?.fontSize ?? 16}px`,
				"--excerpt-font-weight": excerptTypo?.weight ?? 400,
				"--excerpt-line-height": excerptTypo?.height ?? 1.5,
				"--excerpt-letter-spacing": `${excerptTypo?.spacing ?? 0}px`,
				"--excerptColor": excerptColor || "#4e6e3e",
				"--excerptMargin": `${
					excerptMargin[normalizedDeviceType].top ?? 14
				}px ${excerptMargin[normalizedDeviceType].right ?? 0}px ${
					excerptMargin[normalizedDeviceType].bottom ?? 0
				}px ${excerptMargin[normalizedDeviceType].left ?? 0}px`,
			}}
		>
			<p className="sp-smart-post-carousel-excerpt">
				<Tag>{excerpt}</Tag>
			</p>
		</div>
	);
}

export default memo(Excerpt);
