import { memo, useCallback } from "@wordpress/element";
import "./editor.scss";
import { DndTitleIcon } from "../../../smart-post-carousel/assets/icon";
import { ToggleControl } from "@wordpress/components";

function CustomToggle({
	label = "",
	value = false,
	attributesKey = "",
	setAttributes,
	onChange,
	updated = false,
}) {
	const handleChange = useCallback(
		(newValue) => {
			if (typeof onChange === "function") {
				onChange(newValue);
				return;
			}
			setAttributes?.({
				[attributesKey]: newValue,
			});
		},
		[onChange, setAttributes, attributesKey],
	);

	return (
		<div
			className={`sp-smart-post-carousel-toggle sp-smart-post-carousel-component-mb ${
				updated ? "toggle-update" : ""
			}`}
		>
			{updated && (
				<div className="sp-smart-post-carousel-toggle-left">
					<DndTitleIcon />
					<span className="sp-smart-post-carousel-component-title">
						{label}
					</span>
				</div>
			)}

			<ToggleControl
				label={updated ? "" : label}
				checked={value}
				onChange={handleChange}
			/>
		</div>
	);
}

export default memo(CustomToggle);
