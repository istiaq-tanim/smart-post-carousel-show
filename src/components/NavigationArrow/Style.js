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
import CustomToggle from "../common/CustomToggle/CustomToggle";

function Style() {
	const { attributes, setAttributes } = useAttributes();
	const {
		navArrowStyleType,
		borderColor,
		borderStyle,
		shadowColor,
		showBoxShadow,
	} = attributes;
	const { label, attributeKey, defaultValue } = colorConfig[navArrowStyleType];
	const {
		label: bgLabel,
		attributeKey: bgAttributeKey,
		defaultValue: bgDefaultValue,
	} = backGroundColorConfig[navArrowStyleType];

	const hasBorder = borderStyle !== "none";

	console.log(attributes.boxShadow);

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
				label="Border Radius"
				onChange={(values) => setAttributes({ borderRadius: values })}
			></SpacingControl>

			{/* Enable Button For Showing Shadow Options */}

			<CustomToggle
				label={__("Enable Box Shadow", "smart-post-carousel")}
				value={attributes.showBoxShadow}
				attributesKey="showBoxShadow"
				setAttributes={setAttributes}
			/>

			{/* Box Shadow */}
			{showBoxShadow && (
				<>
					<SpacingControl
						values={attributes.boxShadow}
						label="Box Shadow"
						showLabels={true}
						labels={{
							top: "X Offset",
							right: "Y Offset",
							bottom: "Blur",
							left: "Speared",
						}}
						showUnit={true}
						step={1}
						onChange={(values) => setAttributes({ boxShadow: values })}
						options={["outset", "inset"]}
					></SpacingControl>

					{/* Icon Border Color */}
					<CustomColorPicker
						label="Shadow Color"
						defaultValue="#d6d8de"
						onChange={(value) => setAttributes({ shadowColor: value })}
						value={shadowColor}
					></CustomColorPicker>
				</>
			)}
		</>
	);
}

export default Style;
