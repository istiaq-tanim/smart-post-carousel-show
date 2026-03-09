import { __ } from "@wordpress/i18n";
import { taxonomyPosition } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import CustomSelection from "../common/CustomSelection/CustomSelection";
import { useMetaData } from "./../../hooks/useMetaData";

function General() {
	const { attributes } = useAttributes();
	const { allTaxonomies } = useMetaData(attributes, "editSite");

	const taxonomiesOptions = allTaxonomies.map((taxonomy) => ({
		label: taxonomy.label,
		value: taxonomy.name,
	}));
	return (
		<>
			<CustomSelection
				label={__("Taxonomy Type", "smart-post-carousel")}
				options={taxonomiesOptions}
				attributeKey="taxonomyType"
				inline={false}
			/>
			<CustomSelection
				label={__("Taxonomy Type", "smart-post-carousel")}
				options={taxonomyPosition}
				attributeKey="taxonomyPosition"
				inline={false}
			/>
		</>
	);
}

export default General;
