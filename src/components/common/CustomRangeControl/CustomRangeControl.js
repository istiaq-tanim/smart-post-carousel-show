import { RangeControl } from "@wordpress/components";

import RangeHeader from "./RangeHeader";
import { useAttributes } from "../../../hooks/useAttributes";
import { useRangeHandler } from "../../../hooks/useRangeHandler";
import { useRangeValue } from "../../../hooks/useRangeValue";
import "./editor.scss";
import { useDeviceType } from "../../../hooks/useDevice";

function CustomRangeControl({
	label = "Space Between Lists",
	attributeKey = "spaceBetween",
	min = 0,
	max = 100,
	defaultValue = 0,
	nestedKey = null,
	unit = "px",
	showReset = true,
	showDevice = true,
}) {
	const { attributes, setAttributes } = useAttributes();
	const deviceType = useDeviceType();

	// Get current value using custom hook
	const { value, activeSubKey } = useRangeValue({
		attributes,
		attributeKey,
		nestedKey,
		deviceType,
		defaultValue,
	});

	// Handle changes and reset using custom hook
	const { handleChange, handleReset } = useRangeHandler({
		attributes,
		setAttributes,
		attributeKey,
		nestedKey,
		activeSubKey,
		defaultValue,
	});

	return (
		<div className="custom-range-control">
			<RangeHeader
				label={label}
				unit={unit}
				showReset={showReset}
				showDevice={showDevice}
				onReset={handleReset}
			/>

			<div className="input-range">
				<RangeControl
					max={max}
					min={min}
					value={value}
					onChange={(newValue) => handleChange(newValue)}
				/>
			</div>
		</div>
	);
}

export default CustomRangeControl;
