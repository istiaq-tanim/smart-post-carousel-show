import { OrientationItems } from "../../const";
import Layouts from "../common/Layouts/Layouts";

function ContentOrientations({
	label = "",
	attributes,
	setAttributes,
	attributesKey,
	onChange = false,
}) {
	return (
		<Layouts
			attributes={attributes}
			setAttributes={setAttributes}
			attributesKey={attributesKey}
			displayActive={true}
			grid={4}
			label={label}
			onChange={onChange}
			items={OrientationItems}
		></Layouts>
	);
}

export default ContentOrientations;
