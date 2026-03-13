import { useAttributes } from "../../hooks/useAttributes";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import CustomSelection from "../common/CustomSelection/CustomSelection";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";
function Style() {
	const { attributes, setAttributes } = useAttributes();
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
		</>
	);
}

export default Style;
