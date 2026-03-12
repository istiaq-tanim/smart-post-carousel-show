import { __ } from "@wordpress/i18n";
import { useAttributes } from "../../hooks/useAttributes";
import useMetaData from "../../hooks/useMetaData";
import CustomSelection from "../common/CustomSelection/CustomSelection";

function General() {
	const { attributes, setAttributes } = useAttributes();
	const { imageSizes } = useMetaData(attributes);

	const imageSizeOptions = [
		{
			label: __("Original Size", "smart-post-carousel"),
			value: "original",
		},
		...imageSizes.map((image) => ({
			label: image,
			value: image,
		})),
		{
			label: __("Custom Size", "smart-post-carousel"),
			value: "custom",
		},
	];

	return (
		<>
			<CustomSelection
				label={__("Taxonomy Type", "smart-post-carousel")}
				options={imageSizeOptions}
				attributeKey="taxonomyType"
				inline={false}
			/>
		</>
	);
}

export default General;
