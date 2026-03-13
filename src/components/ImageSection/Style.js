import { __ } from "@wordpress/i18n";
import { borderTypes } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import CustomColorPicker from "../common/CustomColorPicker/CustomColorPicker";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import CustomSelection from "../common/CustomSelection/CustomSelection";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";
function Style() {
	const { attributes, setAttributes } = useAttributes();
	const {
		imageBorderColorHover,
		imageBorderColorNormal,
		imageBorderStyle,
		imageColorEffect,
	} = attributes;
	return (
		<>
			<CustomSelection
				label="Hover Effect"
				attributeKey="imageHoverEffectType"
				options={[
					{
						label: "Select Hover Effect",
						value: "",
						disabled: "disabled",
					},
					{ label: "Normal", value: "normal" },
					{ label: "Zoom In", value: "zoom-in" },
					{ label: "Zoom Out", value: "zoom-out" },
					{ label: "Slide Left", value: "slide-left" },
					{ label: "Slide Right", value: "slide-right" },
					{ label: "Rotate Left", value: "rotate-left" },
					{ label: "Rotate Right", value: "rotate-right" },
					{ label: "Opacity", value: "opacity" },
				]}
				inline={false}
			/>

			{attributes.imageHoverEffectType === "opacity" && (
				<CustomRangeControl
					label="Opacity"
					attributeKey="hoverEffectOpacity"
					min={0}
					max={1}
					defaultValue={1}
					step={0.1}
					showUnit={false}
					showDevice={false}
				></CustomRangeControl>
			)}

			<CustomToggleGroupControl
				attributes={attributes}
				attributesKey="imageEffect"
				setAttributes={setAttributes}
				items={[
					{ label: "Normal", value: "normal" },
					{ label: "Hover", value: "hover" },
				]}
			></CustomToggleGroupControl>

			<CustomRangeControl
				label="Grayscale Level"
				attributeKey={
					attributes.imageEffect === "normal"
						? "grayScaleNormalLevel"
						: "grayScaleHoverLevel"
				}
				min={0}
				max={100}
				defaultValue={0}
				step={1}
				showUnit={false}
				showDevice={false}
			></CustomRangeControl>

			<CustomRangeControl
				label="Blur"
				attributeKey={
					attributes.imageEffect === "normal"
						? "blurNormalLevel"
						: "blurHoverLevel"
				}
				min={0}
				max={20}
				defaultValue={0}
				step={1}
				showUnit={false}
				showDevice={false}
			></CustomRangeControl>

			<CustomRangeControl
				label="Brightness"
				attributeKey={
					attributes.imageEffect === "normal"
						? "brightnessNormalLevel"
						: "brightnessHoverLevel"
				}
				min={0}
				max={10}
				defaultValue={1}
				step={0.1}
				showUnit={false}
				showDevice={false}
			></CustomRangeControl>

			<CustomToggleGroupControl
				label={__("Border", "smart-post-carousel")}
				attributes={attributes}
				attributesKey="imageBorderStyle"
				setAttributes={setAttributes}
				items={borderTypes}
			></CustomToggleGroupControl>

			{imageBorderStyle !== "none" && (
				<>
					{/* Border Width */}
					<CustomRangeControl
						label={__("Border Width", "smart-post-carousel")}
						attributeKey="imageBorderWidth"
						min={0}
						max={10}
						defaultValue={1}
						showUnit={true}
						step={1}
					></CustomRangeControl>

					<CustomToggleGroupControl
						attributes={attributes}
						attributesKey="imageColorEffect"
						setAttributes={setAttributes}
						items={[
							{ label: "Normal", value: "normal" },
							{ label: "Hover", value: "hover" },
						]}
					></CustomToggleGroupControl>

					{/* Border Color */}
					<CustomColorPicker
						label={__("Border Color", "smart-post-carousel")}
						defaultValue="#cccccc"
						onChange={(value) =>
							setAttributes({
								[imageColorEffect === "normal"
									? "imageBorderColorNormal"
									: "imageBorderColorHover"]: value,
							})
						}
						value={
							imageColorEffect === "normal"
								? imageBorderColorNormal
								: imageBorderColorHover
						}
					></CustomColorPicker>
				</>
			)}

			{/* Border Radius */}

			<CustomRangeControl
				label={__("Border Radius", "smart-post-carousel")}
				attributeKey="imageBorderRadius"
				min={0}
				max={50}
				defaultValue={1}
				showUnit={true}
				step={1}
			></CustomRangeControl>

			{/* Space Between Content */}

			<CustomRangeControl
				label={__("Space Between Content", "smart-post-carousel")}
				attributeKey="spaceBetweenContent"
				min={0}
				max={200}
				defaultValue={1}
				showUnit={true}
				step={1}
			></CustomRangeControl>
		</>
	);
}

export default Style;
