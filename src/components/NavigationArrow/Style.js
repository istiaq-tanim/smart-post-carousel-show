import { __ } from "@wordpress/i18n";
import { backGroundColorConfig, colorConfig } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import CustomColorPicker from "../common/CustomColorPicker/CustomColorPicker";
import SpacingControl from "../common/CustomSpacingControl/SpacingControl";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";

import {
	DashedBorder,
	DottedBorder,
	DoubleBorder,
	SolidBorder,
} from "../../smart-post-carousel/assets/borderIcon";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";

function Style() {
	const { attributes, setAttributes } = useAttributes();
	const { navArrowStyleType, borderColor, borderStyle } = attributes;
	const { label, attributeKey, defaultValue } = colorConfig[navArrowStyleType];
	const {
		label: bgLabel,
		attributeKey: bgAttributeKey,
		defaultValue: bgDefaultValue,
	} = backGroundColorConfig[navArrowStyleType];

	const hasBorder = borderStyle !== "none";

	return (
		<>
			{/* Tabs for Hover Normal */}
			<CustomToggleGroupControl
				attributes={attributes}
				attributesKey="navArrowStyleType"
				setAttributes={setAttributes}
				items={[
					{ label: "Normal", value: "normal" },
					{ label: "Hover", value: "hover" },
				]}
			></CustomToggleGroupControl>

			{/*Icon Color For Normal & Hover*/}

			<CustomColorPicker
				label={label}
				defaultValue={defaultValue}
				onChange={(value) => setAttributes({ [attributeKey]: value })}
				value={attributes[attributeKey]}
			></CustomColorPicker>

			{/*Icon Background Color For Normal & Hover*/}
			<CustomColorPicker
				label={bgLabel}
				defaultValue={bgDefaultValue}
				onChange={(value) => setAttributes({ [bgAttributeKey]: value })}
				value={attributes[bgAttributeKey]}
			></CustomColorPicker>

			{/* Icon Border */}

			<CustomToggleGroupControl
				label={__("Border", "smart-post-carousel")}
				attributes={attributes}
				attributesKey="borderStyle"
				setAttributes={setAttributes}
				items={[
					{ label: "None", value: "none" },
					{ label: <SolidBorder />, value: "solid" },
					{ label: <DashedBorder />, value: "dashed" },
					{ label: <DottedBorder />, value: "dotted" },
					{ label: <DoubleBorder />, value: "double" },
				]}
			></CustomToggleGroupControl>

			{/* Based on Border Style this section show */}

			{hasBorder && (
				<>
					{/* Icon Border Width */}
					<CustomRangeControl
						label="Border Width"
						attributeKey="borderWidth"
						min={0}
						max={10}
						defaultValue={0}
						showUnit={true}
						step={1}
					></CustomRangeControl>
					{/* Icon Border Color */}
					<CustomColorPicker
						label={label}
						defaultValue={defaultValue}
						onChange={(value) => setAttributes({ borderColor: value })}
						value={borderColor}
					></CustomColorPicker>
				</>
			)}

			{/* Icon Border Radius */}

			<SpacingControl
				values={attributes.borderRadius}
				defaultValues={attributes.borderRadius}
				label="Border Radius"
				onChange={(values) => setAttributes({ borderRadius: values })}
			></SpacingControl>

			{/* Box Shadow */}
			<SpacingControl
				values={attributes.borderRadius}
				defaultValues={attributes.borderRadius}
				label="Box Shadow"
				showLabels={true}
				onChange={(values) => setAttributes({ borderRadius: values })}
			></SpacingControl>

			{/* <CustomRangeControl
				label="Border Radius"
				attributeKey="borderRadius"
				min={0}
				max={300}
				defaultValue={50}
				showUnit={true}
				step={1}
			></CustomRangeControl> */}
		</>
	);
}

export default Style;
