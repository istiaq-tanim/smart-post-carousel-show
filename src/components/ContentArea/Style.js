import { __ } from "@wordpress/i18n";
import { useAttributes } from "../../hooks/useAttributes";
import { DashedBorder, DottedBorder, DoubleBorder, SolidBorder } from "../../smart-post-carousel/assets/borderIcon";
import BackgroundStyle from "../common/Background/Background";
import CustomColorPicker from "../common/CustomColorPicker/CustomColorPicker";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";

function Style() {
	const { attributes, setAttributes } = useAttributes();
	const { contentBackGroundStyles, contentEffect, contentBorderColorNormal, contentBorderColorHover } = attributes;


	return (
		<>
			{/* Tabs for Meta Item Hover Normal */}
			<CustomToggleGroupControl
				attributes={attributes}
				attributesKey="contentEffect"
				setAttributes={setAttributes}
				items={[
					{ label: "Default", value: "default" },
					{ label: "Hover", value: "hover" },
				]}
			></CustomToggleGroupControl>

			{/*  */}

			<BackgroundStyle
				backgroundStyle={contentBackGroundStyles}
				contentEffect={contentEffect}
				label="Background Style"
				onChange={(value) => setAttributes({ contentBackGroundStyles: value })}
			></BackgroundStyle>


			{/* Content Border */}

			<CustomToggleGroupControl
				label={__("Border", "smart-post-carousel")}
				attributes={attributes}
				attributesKey={contentEffect === "hover" ? "contentHoverBorderStyle" : "contentBorderStyle"}
				setAttributes={setAttributes}
				items={[
					{ label: "None", value: "none" },
					{ label: <SolidBorder />, value: "solid" },
					{ label: <DashedBorder />, value: "dashed" },
					{ label: <DottedBorder />, value: "dotted" },
					{ label: <DoubleBorder />, value: "double" },
				]}
			></CustomToggleGroupControl>
			{/* Border Width */}
			<CustomRangeControl
				label="Border Width"
				attributeKey={contentEffect === "hover" ? "contentBorderWidthHover" : "contentBorderWidthNormal"}
				min={0}
				max={10}
				defaultValue={1}
				showUnit={true}
				step={1}
			></CustomRangeControl>
			{/* Border Color */}
			<CustomColorPicker
				label="Border Color"
				defaultValue=""
				onChange={(value) => setAttributes({ [contentEffect === "hover" ? "contentBorderColorHover" : "contentBorderColorNormal"]: value })}
				value={contentEffect === "hover" ? contentBorderColorHover : contentBorderColorNormal}
			></CustomColorPicker>

			{/* Border Radius */}
			<CustomRangeControl
				label="Border Radius"
				attributeKey={contentEffect === "hover" ? "contentBorderRadiusHover" : "contentBorderRadiusNormal"}
				min={0}
				max={48}
				defaultValue={0}
				showUnit={true}
				step={1}
			></CustomRangeControl>
		</>
	);
}

export default Style;
