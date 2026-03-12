import { __ } from "@wordpress/i18n";
import { useAttributes } from "../../hooks/useAttributes";
import useMetaData from "../../hooks/useMetaData";
import CustomSelection from "../common/CustomSelection/CustomSelection";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";
import BackgroundStyle from "../common/Background/Background";

function General() {
	const { attributes, setAttributes } = useAttributes();
	const {
		imageSize,
		imageOverlayType,
		imageBackGroundStyles,
		imageOverlayCustomColorEffect,
	} = attributes;
	const { imageSizes } = useMetaData(attributes);

	const imageSizeOptions = [
		{
			label: __("Original Size", "smart-post-carousel"),
			value: "original",
		},
		...imageSizes.map((image) => ({
			label: image,
			value: image,
		})),
		{
			label: __("Custom Size", "smart-post-carousel"),
			value: "custom",
		},
	];

	return (
		<>
			{/* Image Size Selector */}
			<CustomSelection
				label={__("Taxonomy Type", "smart-post-carousel")}
				options={imageSizeOptions}
				attributeKey="imageSize"
				inline={false}
			/>
			{imageSize === "custom" && (
				<>
					{/* Image Width */}
					<CustomRangeControl
						label="Width"
						attributeKey="imageWidth"
						min={0}
						max={100}
						defaultValue={100}
						unit="%"
						showUnit={true}
					></CustomRangeControl>

					{/* Image Height */}
					<CustomRangeControl
						label="Height"
						attributeKey="imageHeight"
						min={0}
						max={500}
						defaultValue={244}
						unit="px"
						showUnit={true}
					></CustomRangeControl>
				</>
			)}

			{/* Overlay Color Selector*/}

			<CustomSelection
				label={__("Overlay Color", "smart-post-carousel")}
				options={[
					{ label: "No Overlay", value: "no-overlay" },
					{
						label: "Multi Color - Solid",
						value: "multi-solid",
					},
					{
						label: "Multi Color - Gradient",
						value: "multi-gradient",
					},
					{ label: "Warm Sunset", value: "warm-sunset" },
					{
						label: "Ocean Breeze",
						value: "ocean-breeze",
					},
					{ label: "Royal Gold", value: "royal-gold" },
					{ label: "Cool Blues", value: "cool-blues" },
					{ label: "Soft Pastel", value: "soft-pastel" },
					{
						label: "Elegant Purple",
						value: "elegant-purple",
					},
					{
						label: "Energetic Orange",
						value: "energetic-orange",
					},
					{ label: "Custom", value: "custom" },
				]}
				attributeKey="imageOverlayType"
				inline={false}
			/>

			{/* 
			   Custom Color Selection Type
			*/}

			{imageOverlayType === "custom" && (
				<>
					<CustomToggleGroupControl
						attributes={attributes}
						attributesKey="imageOverlayCustomColorEffect"
						setAttributes={setAttributes}
						items={[
							{ label: "Normal", value: "normal" },
							{
								label: "Hover",
								value: "hover",
							},
						]}
					></CustomToggleGroupControl>

					<BackgroundStyle
						backgroundStyle={imageBackGroundStyles}
						contentEffect={imageOverlayCustomColorEffect}
						label="Custom Color"
						onChange={(value) =>
							setAttributes({ imageBackGroundStyles: value })
						}
					></BackgroundStyle>
				</>
			)}

			{/* image Scale Type */}
			<CustomToggleGroupControl
				label="Image Scale"
				attributes={attributes}
				attributesKey="imageScale"
				setAttributes={setAttributes}
				items={[
					{ label: "None", value: "none" },
					{ label: "Cover", value: "cover" },
					{ label: "Contain", value: "contain" },
					{ label: "Fill", value: "fill" },
				]}
			></CustomToggleGroupControl>
		</>
	);
}

export default General;
