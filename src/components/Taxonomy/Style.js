import { __ } from "@wordpress/i18n";
import { borderTypes } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import BackgroundStyle from "../common/Background/Background";
import CustomColorPicker from "../common/CustomColorPicker/CustomColorPicker";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import SpacingControl from "../common/CustomSpacingControl/SpacingControl";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";
import Typography from "../common/Typography/Typography";

function Style() {
	const { attributes, setAttributes } = useAttributes();
	const {
		taxonomyTypo,
		taxonomyEffect,
		taxonomyTextColor,
		taxonomyBackGroundStyles,
		taxonomyBorderColorNormal,
		taxonomyBorderColorHover,
		taxonomyPadding,
		taxonomyMargin,
	} = attributes;

	const currentColor = taxonomyTextColor?.[taxonomyEffect] ?? "";

	const currentBorderStyleKey =
		taxonomyEffect === "hover"
			? "taxonomyHoverBorderStyle"
			: "taxonomyBorderStyle";

	const currentBorderStyle = attributes[currentBorderStyleKey];

	const handleColorChange = (newColor) => {
		setAttributes({
			taxonomyTextColor: {
				...taxonomyTextColor,
				[taxonomyEffect]: newColor,
			},
		});
	};

	return (
		<>
			{/* Typography for Taxonomy */}
			<Typography
				label="Typography"
				attributeKey="taxonomyTypo"
				onChange={(value) => setAttributes({ taxonomyTypo: value })}
				values={taxonomyTypo}
				tags={[
					{ label: "Default", value: "li" },
					{ label: "Heading h1", value: "h1" },
					{ label: "Heading h2", value: "h2" },
					{ label: "Heading h3", value: "h3" },
					{ label: "Heading h4", value: "h4" },
					{ label: "Heading h5", value: "h5" },
				]}
			></Typography>

			<CustomToggleGroupControl
				attributes={attributes}
				attributesKey="taxonomyEffect"
				setAttributes={setAttributes}
				items={[
					{ label: "Normal", value: "normal" },
					{ label: "Hover", value: "hover" },
				]}
			></CustomToggleGroupControl>

			{/* Taxonomy Text Color */}
			<CustomColorPicker
				label="Color"
				defaultValue={taxonomyEffect === "normal" ? "#fff" : ""}
				onChange={handleColorChange}
				value={currentColor}
			></CustomColorPicker>

			{/* Background Color Taxonomy */}

			<BackgroundStyle
				backgroundStyle={taxonomyBackGroundStyles}
				contentEffect={taxonomyEffect}
				label="Background Style"
				onChange={(value) => setAttributes({ taxonomyBackGroundStyles: value })}
			></BackgroundStyle>

			{/* Border Style */}

			<CustomToggleGroupControl
				label={__("Border", "smart-post-carousel")}
				attributes={attributes}
				attributesKey={currentBorderStyleKey}
				setAttributes={setAttributes}
				items={borderTypes}
			></CustomToggleGroupControl>

			{/* check border style */}
			{currentBorderStyle !== "none" && (
				<>
					{/* Border Width */}
					<CustomRangeControl
						label="Border Width"
						attributeKey={
							taxonomyEffect === "hover"
								? "taxonomyBorderWidthHover"
								: "taxonomyBorderWidthNormal"
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
								[taxonomyEffect === "hover"
									? "taxonomyBorderColorHover"
									: "taxonomyBorderColorNormal"]: value,
							})
						}
						value={
							taxonomyEffect === "hover"
								? taxonomyBorderColorHover
								: taxonomyBorderColorNormal
						}
					></CustomColorPicker>

					{/* Border Radius */}
					<CustomRangeControl
						label="Border Radius"
						attributeKey={
							taxonomyEffect === "hover"
								? "taxonomyBorderRadiusHover"
								: "taxonomyBorderRadiusNormal"
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

			<CustomRangeControl
				label={__("Space Between Items", "smart-post-carousel")}
				attributeKey="taxonomyGap"
				min={0}
				max={24}
				defaultValue={4}
				showUnit={true}
				step={1}
			></CustomRangeControl>

			<SpacingControl
				values={taxonomyPadding}
				min={0}
				max={48}
				label="Padding"
				step={1}
				onChange={(values) => setAttributes({ taxonomyPadding: values })}
			></SpacingControl>

			<SpacingControl
				values={taxonomyMargin}
				min={0}
				max={48}
				label="Margin"
				step={1}
				onChange={(values) => setAttributes({ taxonomyMargin: values })}
			></SpacingControl>
		</>
	);
}

export default Style;
