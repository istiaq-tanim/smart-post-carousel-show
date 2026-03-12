import { SOCIAL_PLATFORMS } from "../../const/SocialPlatForm";
import { useAttributes } from "./../../hooks/useAttributes";
import MultiSelectDndKit from "./../common/MultiselectDnD/DraggableSelect";

const ALL_PLATFORM_ITEMS = SOCIAL_PLATFORMS.map(({ id, value, label }) => ({
	id,
	value,
	label,
}));

function General() {
	const { attributes, setAttributes } = useAttributes();

	const { sharingMedia } = attributes;
	const handleChange = (newValues) => {
		setAttributes({ sharingMedia: newValues });
	};
	return (
		<>
			<MultiSelectDndKit
				label="Sharing Media"
				items={ALL_PLATFORM_ITEMS}
				values={sharingMedia}
				onChange={handleChange}
				searchable={true}
			/>
		</>
	);
}

export default General;
