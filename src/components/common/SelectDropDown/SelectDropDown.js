import { Popover } from "@wordpress/components";
import "./editor.scss";
import SelectDropDownField from "./SelectDropDownField";

function SelectDropDown({
	label,
	options,
	attributes,
	setAttributes,
	attributesKey,
	onClick = null,
	className = "",
	onClose,
}) {
	return (
		<Popover>
			<SelectDropDownField
				options={options}
				attributes={attributes}
				setAttributes={setAttributes}
				attributesKey={attributesKey}
				className={className}
				onClick={onClick}
				onClose={onClose}
			/>
		</Popover>
	);
}

export default SelectDropDown;
