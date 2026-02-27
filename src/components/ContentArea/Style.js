import { useAttributes } from "../../hooks/useAttributes";
import BackgroundStyle from "../common/Background/Background";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";

function Style() {
	const { attributes, setAttributes } = useAttributes();
	const { contentBackGroundStyles } = attributes;

	return (
		<>
			{/* Tabs for Meta Item Hover Normal */}
			<CustomToggleGroupControl
				attributes={attributes}
				attributesKey="contentEffect"
				setAttributes={setAttributes}
				items={[
					{ label: "Default", value: "default" },
					{ label: "Hover", value: "hover" },
				]}
			></CustomToggleGroupControl>

			{/*  */}

			<BackgroundStyle
				backgroundStyle={contentBackGroundStyles}
				label="Background Style"
				onChange={(value) => setAttributes({ contentBackGroundStyles: value })}
			></BackgroundStyle>
		</>
	);
}

export default Style;
