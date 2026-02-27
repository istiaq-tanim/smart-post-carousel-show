import { getVisibility } from "../../../utils";
import { authorDisplayStyle, dateFormat, userIcons } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import CustomSelection from "../common/CustomSelection/CustomSelection";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";
import DragAndDrop from "../common/DragAndDrop/DragAndDrop";
import SelectDropDown from "../common/SelectDropDown/SelectDropDown";

function General() {
	const { attributes, setAttributes } = useAttributes();
	const { metaDataAllContentArray, authorDisplayStyle: authorStyle } =
		attributes;

	// Check if author , date meta item is enabled

	const isAuthorVisible = getVisibility(metaDataAllContentArray, "author");
	const isTimeVisible = getVisibility(metaDataAllContentArray, "date");

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
			/>

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
			/>

			{/* Author Icon Style */}

			{isAuthorVisible && (
				<CustomSelection
					label="Author Display Style"
					options={authorDisplayStyle}
					attributeKey="authorDisplayStyle"
					inline={false}
				/>
			)}

			{/* Dropdown For Author Icon */}
			{isAuthorVisible && authorStyle === "iconName" && (
				<SelectDropDown
					label="Author Icon Style"
					attributes={attributes.authorIcon}
					attributesKey="authorIcon"
					setAttributes={setAttributes}
					options={userIcons}
				/>
			)}

			{/* Date Format Selector */}
			{isTimeVisible && (
				<CustomSelection
					label="Date Format"
					options={dateFormat}
					attributeKey="dateFormat"
					inline={false}
				/>
			)}
		</>
	);
}

export default General;
