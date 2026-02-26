import { useAttributes } from "../../hooks/useAttributes";
import CustomColorPicker from "../common/CustomColorPicker/CustomColorPicker";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";
import Typography from "../common/Typography/Typography";

function Style() {
	const { attributes, setAttributes } = useAttributes();
	const { meta, metaColor } = attributes;

	console.log(metaColor);
	return (
		<>
			{/* Typography for Meta Item */}
			<Typography
				label="Title Typography"
				attributeKey="meta"
				onChange={(value) => setAttributes({ meta: value })}
				values={meta}
			></Typography>

			{/* Tabs for Meta Item Hover Normal */}
			<CustomToggleGroupControl
				attributes={attributes}
				attributesKey="metaEffect"
				setAttributes={setAttributes}
				items={[
					{ label: "Normal", value: "normal" },
					{ label: "Hover", value: "hover" },
				]}
			></CustomToggleGroupControl>

			{/*Text Color For Meta Item*/}

			<CustomColorPicker
				label="Color"
				defaultValue="#4e6e3e"
				onChange={(value) => setAttributes({ metaColor: value })}
				value={metaColor}
			></CustomColorPicker>
		</>
	);
}

export default Style;
