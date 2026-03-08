import { __ } from "@wordpress/i18n";
import { borderTypes, buttonIcons } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import BackgroundStyle from "../common/Background/Background";
import CustomColorPicker from "../common/CustomColorPicker/CustomColorPicker";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import SpacingControl from "../common/CustomSpacingControl/SpacingControl";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";
import SelectDropDown from "../common/SelectDropDown/SelectDropDown";
import Typography from "../common/Typography/Typography";

function Style() {
	const { attributes, setAttributes } = useAttributes();
	const {
		buttonTypo,
		iconVisibility,
		buttonStyle,
		iconEffectType,
		buttonTextColor,
		buttonBackGroundStyles,
		buttonBorderColorNormal,
		buttonBorderColorHover,
		buttonPadding,
		buttonType,
		buttonMargin,
	} = attributes;

	const currentColor = buttonTextColor?.[iconEffectType] ?? "";

	const currentBorderStyleKey =
		iconEffectType === "hover" ? "buttonHoverBorderStyle" : "buttonBorderStyle";

	const currentBorderStyle = attributes[currentBorderStyleKey];

	const handleColorChange = (newColor) => {
		setAttributes({
			buttonTextColor: {
				...buttonTextColor,
				[iconEffectType]: newColor,
			},
		});
	};

	return (
		<>
			{/* Typography for Button */}
			<Typography
				label="Typography"
				attributeKey="buttonTypo"
				onChange={(value) => setAttributes({ buttonTypo: value })}
				values={buttonTypo}
				tags={[
					{ label: "Default", value: "a" },
					{ label: "Heading h1", value: "h1" },
					{ label: "Heading h2", value: "h2" },
					{ label: "Heading h3", value: "h3" },
					{ label: "Heading h4", value: "h4" },
					{ label: "Heading h5", value: "h5" },
				]}
			></Typography>

			{/* Icon Visibility Type */}
			<CustomToggleGroupControl
				label="Icon Visibility"
				attributes={attributes}
				attributesKey="iconVisibility"
				setAttributes={setAttributes}
				items={[
					{ label: "None", value: "none" },
					{ label: "Always", value: "always" },
					{ label: "Hover", value: "hover" },
				]}
			></CustomToggleGroupControl>

			{["always", "hover"].includes(iconVisibility) && (
				<>
					{/* Icon Style for button */}
					<SelectDropDown
						label="Icon Style"
						attributes={buttonStyle}
						attributesKey="buttonStyle"
						setAttributes={setAttributes}
						options={buttonIcons}
					/>
					{/* Icon Gap */}
					<CustomRangeControl
						label="Icon Gap"
						attributeKey="iconGap"
						min={0}
						max={50}
						defaultValue={4}
						showUnit={true}
					></CustomRangeControl>
				</>
			)}

			<CustomToggleGroupControl
				attributes={attributes}
				attributesKey="iconEffectType"
				setAttributes={setAttributes}
				items={[
					{ label: "Normal", value: "normal" },
					{ label: "Hover", value: "hover" },
				]}
			></CustomToggleGroupControl>

			{/* Button Text Color */}
			<CustomColorPicker
				label="Color"
				defaultValue={iconEffectType === "normal" ? "#4e6e3e" : ""}
				onChange={handleColorChange}
				value={currentColor}
			></CustomColorPicker>

			{/* Background Color Button */}

			{buttonType === "button" && (
				<BackgroundStyle
					backgroundStyle={buttonBackGroundStyles}
					contentEffect={iconEffectType}
					label="Background Style"
					onChange={(value) => setAttributes({ buttonBackGroundStyles: value })}
				></BackgroundStyle>
			)}

			{/* Border Style */}

			{buttonType === "button" && (
				<CustomToggleGroupControl
					label={__("Border", "smart-post-carousel")}
					attributes={attributes}
					attributesKey={currentBorderStyleKey}
					setAttributes={setAttributes}
					items={borderTypes}
				></CustomToggleGroupControl>
			)}

			{/* check border style */}
			{currentBorderStyle !== "none" && buttonType === "button" && (
				<>
					{/* Border Width */}
					<CustomRangeControl
						label="Border Width"
						attributeKey={
							iconEffectType === "hover"
								? "buttonBorderWidthHover"
								: "buttonBorderWidthNormal"
						}
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
								[iconEffectType === "hover"
									? "buttonBorderColorHover"
									: "buttonBorderColorNormal"]: value,
							})
						}
						value={
							iconEffectType === "hover"
								? buttonBorderColorHover
								: buttonBorderColorNormal
						}
					></CustomColorPicker>

					{/* Border Radius */}
					<CustomRangeControl
						label="Border Radius"
						attributeKey={
							iconEffectType === "hover"
								? "buttonBorderRadiusHover"
								: "buttonBorderRadiusNormal"
						}
						min={0}
						max={50}
						defaultValue={0}
						showUnit={true}
						showDevice={true}
						step={1}
					></CustomRangeControl>


				</>
			)}

			{buttonType === "button" && (
				<SpacingControl
					values={buttonPadding}
					min={0}
					max={48}
					label="Padding"
					step={1}
					onChange={(values) => setAttributes({ buttonPadding: values })}
				></SpacingControl>
			)}
			<SpacingControl
				values={buttonMargin}
				min={0}
				max={48}
				label="Margin"
				step={1}
				onChange={(values) => setAttributes({ buttonMargin: values })}
			></SpacingControl>
		</>
	);
}

export default Style;