import { __ } from "@wordpress/i18n";
import { borderTypes } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import CustomColorPicker from "../common/CustomColorPicker/CustomColorPicker";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import SpacingControl from "../common/CustomSpacingControl/SpacingControl";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";

function Style() {
	const { attributes, setAttributes } = useAttributes();
	const {
		shareIconColorNormal,
		shareIconColorHover,
		socialIconEffect,
		shareIconBackgroundColorHover,
		shareIconBackgroundColorNormal,
		socialIconBorderColor,
		socialIconPadding,
		socialIconMargin,
		socialIconBorderStyle,
	} = attributes;

	return (
		<>
			<CustomRangeControl
				label="Icon Size"
				attributeKey="socialIconSize"
				min={0}
				max={50}
				defaultValue={16}
				showUnit={true}
			></CustomRangeControl>

			<CustomToggleGroupControl
				label="Icon Type"
				attributes={attributes}
				attributesKey="socialIconType"
				setAttributes={setAttributes}
				items={[
					{ label: "Original", value: "original" },
					{ label: "Custom", value: "custom" },
				]}
			></CustomToggleGroupControl>
			{attributes.socialIconType === "custom" && (
				<>
					{/* Tabs for Social Icon Effect */}

					<CustomToggleGroupControl
						attributes={attributes}
						attributesKey="socialIconEffect"
						setAttributes={setAttributes}
						items={[
							{ label: "Normal", value: "normal" },
							{ label: "Hover", value: "hover" },
						]}
					></CustomToggleGroupControl>

					{/* Custom Style Share Icon Text Color */}

					<CustomColorPicker
						label="Social Icon Color"
						defaultValue="#fff"
						onChange={(value) =>
							setAttributes({
								[socialIconEffect === "hover"
									? "shareIconColorHover"
									: "shareIconColorNormal"]: value,
							})
						}
						value={
							socialIconEffect === "hover"
								? shareIconColorHover
								: shareIconColorNormal
						}
					></CustomColorPicker>

					{/* Custom Style Share Icon Background Color */}

					<CustomColorPicker
						label="Social Background Color"
						defaultValue={socialIconEffect === "hover" ? "#4E6E3E" : "#4e4f52"}
						onChange={(value) =>
							setAttributes({
								[socialIconEffect === "hover"
									? "shareIconBackgroundColorHover"
									: "shareIconBackgroundColorNormal"]: value,
							})
						}
						value={
							socialIconEffect === "hover"
								? shareIconBackgroundColorHover
								: shareIconBackgroundColorNormal
						}
					></CustomColorPicker>
				</>
			)}
			{/* Border Style */}

			<CustomToggleGroupControl
				label={__("Border", "smart-post-carousel")}
				attributes={attributes}
				attributesKey="socialIconBorderStyle"
				setAttributes={setAttributes}
				items={borderTypes}
			></CustomToggleGroupControl>

			{/* Check border style */}
			{socialIconBorderStyle !== "none" && (
				<>
					{/* Border Width */}
					<CustomRangeControl
						label="Border Width"
						attributeKey="socialIconBorderWidth"
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
						onChange={(value) =>
							setAttributes({
								socialIconBorderColor: value,
							})
						}
						value={socialIconBorderColor}
					></CustomColorPicker>

					{/* Border Radius */}
					<CustomRangeControl
						label="Border Radius"
						attributeKey="socialIconBorderRadiusNormal"
						min={0}
						max={50}
						defaultValue={0}
						showUnit={true}
						showDevice={true}
						step={1}
					></CustomRangeControl>
				</>
			)}

			<CustomRangeControl
				label={__("Space Between Items", "smart-post-carousel")}
				attributeKey="socialIconGap"
				min={0}
				max={24}
				defaultValue={8}
				showUnit={true}
				step={1}
			></CustomRangeControl>

			<SpacingControl
				values={socialIconPadding}
				min={0}
				max={48}
				label="Padding"
				step={1}
				onChange={(values) => setAttributes({ socialIconPadding: values })}
			></SpacingControl>

			<SpacingControl
				values={socialIconMargin}
				min={0}
				max={48}
				label="Margin"
				step={1}
				onChange={(values) => setAttributes({ socialIconMargin: values })}
			></SpacingControl>
		</>
	);
}

export default Style;
