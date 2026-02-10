import CustomToggle from "../common/CustomToggle/CustomToggle";
import { useAttributes } from "../../hooks/useAttributes";
import { __ } from "@wordpress/i18n";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";

function Slider() {
	const { attributes, setAttributes } = useAttributes();
	return (
		<>
			{/* Auto Play Section */}
			<CustomToggle
				label={__("AutoPlay", "smart-post-carousel")}
				value={attributes.autoPlay}
				attributesKey="autoPlay"
				setAttributes={setAttributes}
			/>

			{/* AutoPlay Delay*/}
			<CustomRangeControl
				label="AutoPlay Delay"
				attributeKey="delay"
				min={0}
				max={5000}
				defaultValue={4000}
				showDevice={false}
			></CustomRangeControl>

			{/* Carousel Speed */}
			<CustomRangeControl
				label="Carousel Speed"
				attributeKey="speed"
				min={0}
				max={5000}
				defaultValue={600}
				showDevice={false}
			></CustomRangeControl>
		</>
	);
}

export default Slider;
