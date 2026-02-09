import { memo } from "@wordpress/element";
import { TotalTime } from "./TotalTime";
import { ICONS } from "../../../smart-post-carousel/assets/metaIcon";

export const ReadingTime = memo(({ content, attributes }) => {
	const {
		metaReadingTimePostfix = "read",
		metaPerMin = { unit: "words", value: 200 },
	} = attributes;

	if (!content) return null;

	return (
		<span className="sp-smart-post-carousel-card-meta-item">
			{ICONS["clock"]}

			<span className="sp-smart-post-carousel-card-meta-item-text">
				<TotalTime
					content={content}
					metaPrefix={metaReadingTimePostfix}
					metaPerMin={metaPerMin}
				/>
			</span>
		</span>
	);
});
