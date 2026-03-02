import { useAttributes } from "../../hooks/useAttributes";
import CustomColorPicker from "../common/CustomColorPicker/CustomColorPicker";
import SpacingControl from "../common/CustomSpacingControl/SpacingControl";
import Typography from "../common/Typography/Typography";

function Style() {
	const { attributes, setAttributes } = useAttributes();
	const { excerptTypo, excerptColor, excerptMargin } = attributes;

	const handleColorChange = (newColor) => {
		setAttributes({
			excerptColor: newColor,
		});
	};
	return (
		<>
			{/* Typography for Excerpt */}
			<Typography
				label="Typography"
				attributeKey="excerptTypo"
				onChange={(value) => setAttributes({ excerptTypo: value })}
				values={excerptTypo}
			></Typography>

			{/* Color Picker for Excerpt */}

			<CustomColorPicker
				label="Color"
				defaultValue={"#4e6e3e"}
				onChange={handleColorChange}
				value={excerptColor}
			></CustomColorPicker>

			{/* Margin */}
			<SpacingControl
				values={excerptMargin}
				min={0}
				max={48}
				label="Margin"
				showUnit={true}
				onChange={(values) => setAttributes({ excerptMargin: values })}
				options={["px", "%", "em"]}
				step={1}
			></SpacingControl>
		</>
	);
}

export default Style;
