import { useState, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useAttributes } from "../../hooks/useAttributes";
import CustomToggle from "../common/CustomToggle/CustomToggle";
import SelectDropDown from "../common/SelectDropDown/SelectDropDown";
import { arrowIconOptions } from "../../const";
import { Popover } from "@wordpress/components";
import { PopUpIcon } from "../../smart-post-carousel/assets/icon";

function General() {
	const { attributes, setAttributes } = useAttributes();
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const buttonRef = useRef(null);

	return (
		<div>
			<CustomToggle
				label={__("Visibility on Hover", "smart-post-carousel")}
				value={attributes.visibilityOnHover}
				attributesKey="visibilityOnHover"
				setAttributes={setAttributes}
			/>

			{/* Row with label and icon button */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<span>{__("Arrow Icon Style", "smart-post-carousel")}</span>
				<button
					ref={buttonRef}
					onClick={() => setIsPopoverOpen((prev) => !prev)}
				>
					<PopUpIcon></PopUpIcon>
				</button>

				{/* Popover */}
				{isPopoverOpen && (
					<Popover
						anchor={buttonRef.current}
						onClose={() => setIsPopoverOpen(false)}
						placement="right-end"
					>
						<SelectDropDown
							attributes={attributes.arrowStyle}
							attributesKey="arrowStyle"
							setAttributes={setAttributes}
							options={arrowIconOptions}
						/>
					</Popover>
				)}
			</div>
		</div>
	);
}

export default General;
