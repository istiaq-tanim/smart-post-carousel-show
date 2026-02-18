import { Popover } from "@wordpress/components";
import "./editor.scss";
import SelectDropDownField from "./SelectDropDownField";
import { PopUpIcon } from "../../../smart-post-carousel/assets/icon";
import { useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

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
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const buttonRef = useRef(null);
	return (
		<div className="sp-smart-post-carousel-dropdown-wrapper">
			<span>{__(label, "smart-post-carousel")}</span>
			<div ref={buttonRef} onClick={() => setIsPopoverOpen((prev) => !prev)}>
				<PopUpIcon isActive={isPopoverOpen}></PopUpIcon>
			</div>

			{/* Popover */}
			{isPopoverOpen && (
				<Popover
					anchor={buttonRef.current}
					onClose={() => setIsPopoverOpen(false)}
					placement="bottom-start"
				>
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
			)}
		</div>
	);
}

export default SelectDropDown;
