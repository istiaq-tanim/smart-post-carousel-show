import { useAttributes } from "../../hooks/useAttributes";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";

function General() {
	const { attributes, setAttributes } = useAttributes();
	return (
		<>
			<CustomToggleGroupControl
				attributes={attributes}
				label="Read More Type"
				attributesKey="buttonType"
				setAttributes={setAttributes}
				items={[
					{ label: "Button", value: "button" },
					{ label: "Text Link", value: "link" },
				]}
			></CustomToggleGroupControl>
		</>
	);
}

export default General;
