import { memo } from "@wordpress/element";
import { TotalTime } from "./TotalTime";
import { ICONS } from "../../../smart-post-carousel/assets/metaIcon";

export const ReadingTime = memo(({ content, attributes, color, typo }) => {
	const {
		metaReadingTimePostfix = "read",
		metaPerMin = { unit: "words", value: 200 },
	} = attributes;

	if (!content) return null;

	const normalColor = color?.normal ?? color ?? "inherit";
	const hoverColor = color?.hover || normalColor;
	const Tag = typo?.tags ?? "span";

	return (
		<Tag
			className="sp-smart-post-carousel-card-meta-item"
			style={{
				"--meta-normal-color": normalColor,
				"--meta-hover-color": hoverColor,
			}}
		>
			<span className="sp-smart-post-carousel-card-meta-item-icon">
				{ICONS["clock"]}
			</span>
			<span className="sp-smart-post-carousel-card-meta-item-text">
				<TotalTime
					content={content}
					metaPrefix={metaReadingTimePostfix}
					metaPerMin={metaPerMin}
				/>
			</span>
		</Tag>
	);
});
