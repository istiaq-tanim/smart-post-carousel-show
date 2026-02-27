import { metaSeparatorStyles } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import CustomColorPicker from "../common/CustomColorPicker/CustomColorPicker";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import CustomSelection from "../common/CustomSelection/CustomSelection";
import SpacingControl from "../common/CustomSpacingControl/SpacingControl";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";
import Typography from "../common/Typography/Typography";

function Style() {
	const { attributes, setAttributes } = useAttributes();
	const { metaTypo, metaColor, metaEffect, metaMargin, metaSeparatorColor } =
		attributes;

	const currentColor = metaColor?.[metaEffect] ?? "";

	const handleColorChange = (newColor) => {
		setAttributes({
			metaColor: {
				...metaColor,
				[metaEffect]: newColor,
			},
		});
	};

	return (
		<>
			{/* Typography for Meta Item */}
			<Typography
				label="Meta Typography"
				attributeKey="metaTypo"
				onChange={(value) => setAttributes({ metaTypo: value })}
				values={metaTypo}
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
				defaultValue={metaEffect === "normal" ? "#4e6e3e" : ""}
				onChange={handleColorChange}
				value={currentColor}
			></CustomColorPicker>

			<hr style={{ marginTop: 0, marginBottom: "4px" }} />

			{/* Separator Selection Filed */}

			<CustomSelection
				label="Separator"
				options={metaSeparatorStyles}
				attributeKey="metaSeparatorStyle"
				inline={false}
			/>

			{/*Separator Color For Meta Item*/}

			<CustomColorPicker
				label="Separator Color"
				defaultValue={"#000000"}
				onChange={(newValue) => setAttributes({ metaSeparatorColor: newValue })}
				value={metaSeparatorColor}
			></CustomColorPicker>

			{/*Space between items Handler*/}

			<CustomRangeControl
				label="Space Between Meta Data"
				attributeKey="metaColumnGap"
				min={0}
				max={50}
				defaultValue={8}
				step={1}
				showDevice={false}
			></CustomRangeControl>

			{/*Space between icon and text inside item Handler*/}

			<CustomRangeControl
				label="Meta Data Row Gap"
				attributeKey="metaRowGap"
				min={0}
				max={50}
				defaultValue={12}
				step={1}
				showDevice={false}
			></CustomRangeControl>

			{/* Margin */}

			<SpacingControl
				values={metaMargin}
				label="Margin"
				showUnit={true}
				options={["px", "%", "Em"]}
				onChange={(values) => setAttributes({ metaMargin: values })}
			></SpacingControl>
		</>
	);
}

export default Style;
