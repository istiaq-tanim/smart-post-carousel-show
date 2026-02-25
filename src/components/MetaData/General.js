import { arrowIconOptions, authorDisplayStyle } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import CustomSelection from "../common/CustomSelection/CustomSelection";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";
import DragAndDrop from "../common/DragandDrop/DragandDrop";
import SelectDropDown from "../common/SelectDropDown/SelectDropDown";

function General() {
	const { attributes, setAttributes } = useAttributes();
	const { metaDataAllContentArray } = attributes;

	return (
		<>
			{/* Drag and Drop for Meta Items */}
			<DragAndDrop
				label="Meta Data"
				items={metaDataAllContentArray}
				toggleBtn={true}
				onChange={(updated) =>
					setAttributes({ metaDataAllContentArray: updated })
				}
			></DragAndDrop>
			{/* Meta Display Type */}

			<CustomToggleGroupControl
				label="Meta Display Type"
				attributes={attributes}
				attributesKey="metaDisplayType"
				setAttributes={setAttributes}
				items={[
					{ label: "Inline", value: "inline" },
					{ label: "Split Left-Right", value: "split" },
				]}
			></CustomToggleGroupControl>

			{/* Link Open In Section */}

			<CustomSelection
				label="Author Display Style"
				options={authorDisplayStyle}
				attributeKey="authorDisplayStyle"
				inline={false}
			></CustomSelection>

			{/* Dropdown For Author Icon */}
			<SelectDropDown
				label="Author Icon Style"
				attributes={attributes.arrowStyle}
				attributesKey="arrowStyle"
				setAttributes={setAttributes}
				options={arrowIconOptions}
			/>
		</>
	);
}

export default General;
