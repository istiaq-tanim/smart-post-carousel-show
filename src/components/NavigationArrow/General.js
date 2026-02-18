import { __ } from "@wordpress/i18n";
import { useAttributes } from "../../hooks/useAttributes";
import CustomToggle from "../common/CustomToggle/CustomToggle";
import SelectDropDown from "../common/SelectDropDown/SelectDropDown";
import { arrowIconOptions } from "../../const";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";

function General() {
	const { attributes, setAttributes } = useAttributes();

	return (
		<div>
			<CustomToggle
				label={__("Visibility on Hover", "smart-post-carousel")}
				value={attributes.visibilityOnHover}
				attributesKey="visibilityOnHover"
				setAttributes={setAttributes}
			/>

			{/* Row with label and icon button */}
			<SelectDropDown
				label="Arrow Icon Style"
				attributes={attributes.arrowStyle}
				attributesKey="arrowStyle"
				setAttributes={setAttributes}
				options={arrowIconOptions}
			/>

			{/* Icon Size Range Control */}

			<CustomRangeControl
				label="Size"
				attributeKey="iconSize"
				min={0}
				max={200}
				defaultValue={16}
				showUnit={true}
			></CustomRangeControl>

			{/* Background Width */}
			<CustomRangeControl
				label="Width"
				attributeKey="iconWidth"
				min={0}
				max={200}
				defaultValue={40}
				showUnit={true}
			></CustomRangeControl>

			{/* Background Height */}
			<CustomRangeControl
				label="Height"
				attributeKey="iconHeight"
				min={0}
				max={200}
				defaultValue={40}
				showUnit={true}
			></CustomRangeControl>

			{/* Space Between Arrow */}
			<CustomRangeControl
				label="Space Between Arrows"
				attributeKey="spaceBetweenArrow"
				min={0}
				max={200}
				defaultValue={100}
				showUnit={true}
			></CustomRangeControl>

			{/* Horizontal Position */}
			<CustomRangeControl
				label="Horizontal Position"
				attributeKey="horizontalPosition"
				min={-200}
				max={200}
				defaultValue={44}
				showUnit={true}
			></CustomRangeControl>

			{/* Vertical Position */}
			<CustomRangeControl
				label="Vertical Position"
				attributeKey="verticalPosition"
				min={0}
				max={200}
				defaultValue={50}
				showUnit={true}
			></CustomRangeControl>
		</div>
	);
}

export default General;
