import { useAttributes } from "../../hooks/useAttributes";
import CustomColorPicker from "../common/CustomColorPicker/CustomColorPicker";
import SpacingControl from "../common/CustomSpacingControl/SpacingControl";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";
import Divider from "../common/Divider/Divider";
import Typography from "../common/Typography/Typography";

function Style() {
	const { attributes, setAttributes } = useAttributes();
	const { titleTypo, badgeTypo, titleEffect, titleColor, titleMargin } =
		attributes;

	const currentColor = titleColor?.[titleEffect] ?? "";

	const handleColorChange = (newColor) => {
		setAttributes({
			titleColor: {
				...titleColor,
				[titleEffect]: newColor,
			},
		});
	};

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

			<Divider></Divider>

			{/* Margin */}

			<SpacingControl
				values={titleMargin}
				label="Margin"
				showUnit={true}
				options={["px", "%", "Em"]}
				onChange={(values) => setAttributes({ titleMargin: values })}
				step={1}
			></SpacingControl>
		</div>
	);
}

export default Style;
