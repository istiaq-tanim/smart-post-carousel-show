import { __ } from "@wordpress/i18n";
import { borderTypes } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import CustomColorPicker from "../common/CustomColorPicker/CustomColorPicker";
import CustomPopover from "../common/CustomPopover/CustomPopover";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import SpacingControl from "../common/CustomSpacingControl/SpacingControl";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";
import Typography from "../common/Typography/Typography";

function Style() {
	const { attributes, setAttributes } = useAttributes();
	const {
		titleTypo,
		badgeTypo,
		titleEffect,
		titleColor,
		titleMargin,
		labelColor,
		labelBackgroundColor,
		badgeBorderStyle,
		badgeBorderColor,
		badgeBorderRadius,
		badgePadding,
	} = attributes;

	const currentColor = titleColor?.[titleEffect] ?? "";

	const handleColorChange = (newColor) => {
		setAttributes({
			titleColor: {
				...titleColor,
				[titleEffect]: newColor,
			},
		});
	};

	console.log(badgeBorderRadius);

	return (
		<div>
			{/* Typography for Meta Item */}
			<Typography
				label="Title Typography"
				attributeKey="titleTypo"
				onChange={(value) => setAttributes({ titleTypo: value })}
				values={titleTypo}
			></Typography>
			<Typography
				label="Badge Typography"
				attributeKey="badgeTypo"
				onChange={(value) => setAttributes({ badgeTypo: value })}
				values={badgeTypo}
				tags={[
					{ label: "Default", value: "li" },
					{ label: "Heading h1", value: "h1" },
					{ label: "Heading h2", value: "h2" },
					{ label: "Heading h3", value: "h3" },
					{ label: "Heading h4", value: "h4" },
					{ label: "Heading h5", value: "h5" },
				]}
			></Typography>

			{/* Tabs for Title Item Hover Normal */}
			<CustomToggleGroupControl
				attributes={attributes}
				attributesKey="titleEffect"
				setAttributes={setAttributes}
				items={[
					{ label: "Normal", value: "normal" },
					{ label: "Hover", value: "hover" },
				]}
			></CustomToggleGroupControl>

			{/*Text Color For Title*/}

			<CustomColorPicker
				label="Color"
				defaultValue={titleEffect === "normal" ? "#4e6e3e" : ""}
				onChange={handleColorChange}
				value={currentColor}
			></CustomColorPicker>

			{/* Margin */}

			<SpacingControl
				values={titleMargin}
				label="Margin"
				showUnit={true}
				options={["px", "%", "Em"]}
				onChange={(values) => setAttributes({ titleMargin: values })}
				step={1}
			></SpacingControl>

			{/* Badge Style */}

			<CustomPopover label="Badge Style">
				<CustomColorPicker
					label={__("Label Color", "smart-post-carousel")}
					defaultValue={"#ffffff"}
					onChange={(newColor) => setAttributes({ labelColor: newColor })}
					value={labelColor}
				></CustomColorPicker>

				<CustomColorPicker
					label={__("Background Color", "smart-post-carousel")}
					defaultValue={"#ff5b2e"}
					onChange={(newColor) =>
						setAttributes({ labelBackgroundColor: newColor })
					}
					value={labelBackgroundColor}
				></CustomColorPicker>

				<CustomToggleGroupControl
					label={__("Border", "smart-post-carousel")}
					attributes={attributes}
					attributesKey="badgeBorderStyle"
					setAttributes={setAttributes}
					items={borderTypes}
				></CustomToggleGroupControl>

				{badgeBorderStyle !== "none" && (
					<>
						{/* Border Width */}
						<CustomRangeControl
							label={__("Border Width", "smart-post-carousel")}
							attributeKey="badgeBorderWidth"
							min={0}
							max={10}
							defaultValue={1}
							showUnit={true}
							step={1}
						></CustomRangeControl>

						{/* Border Color */}
						<CustomColorPicker
							label={__("Border Color", "smart-post-carousel")}
							defaultValue="#cccccc"
							onChange={(value) =>
								setAttributes({
									badgeBorderColor: value,
								})
							}
							value={badgeBorderColor}
						></CustomColorPicker>

						{/* Border Radius */}
						<SpacingControl
							values={badgeBorderRadius}
							label={__("Border Radius", "smart-post-carousel")}
							showUnit={true}
							options={["px", "%", "Em"]}
							onChange={(values) =>
								setAttributes({ badgeBorderRadius: values })
							}
							step={1}
						></SpacingControl>
					</>
				)}
				{/* Padding */}
				<SpacingControl
					values={badgePadding}
					label={__("Padding", "smart-post-carousel")}
					showUnit={true}
					options={["px", "%", "Em"]}
					onChange={(values) => setAttributes({ badgePadding: values })}
					step={1}
				></SpacingControl>
			</CustomPopover>
		</div>
	);
}

export default Style;
