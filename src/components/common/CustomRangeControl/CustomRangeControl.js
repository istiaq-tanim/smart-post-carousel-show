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
	showUnit = false,
	options,
	step = 1,
	flat = false,
}) {
	const { attributes, setAttributes } = useAttributes();
	const deviceType = useDeviceType();

	const { value, activeSubKey } = useRangeValue({
		attributes,
		attributeKey,
		nestedKey,
		deviceType,
		defaultValue,
		skip: flat,
	});

	const { handleChange, handleReset } = useRangeHandler({
		attributes,
		setAttributes,
		attributeKey,
		nestedKey,
		activeSubKey,
		defaultValue,
		skip: flat,
	});

	// Unit logic
	const currentUnit = flat
		? attributes[attributeKey]?.unit ?? unit
		: attributes[attributeKey]?.[activeSubKey]?.unit ?? unit;

	const handleUnitChange = (newUnit) => {
		if (flat) {
			setAttributes({
				[attributeKey]: {
					...attributes[attributeKey],
					unit: newUnit,
				},
			});
		} else {
			setAttributes({
				[attributeKey]: {
					...attributes[attributeKey],
					[activeSubKey]: {
						...attributes[attributeKey]?.[activeSubKey],
						unit: newUnit,
					},
				},
			});
		}
	};

	const flatValue = attributes[attributeKey]?.value ?? defaultValue;

	const handleFlatChange = (newValue) => {
		setAttributes({
			[attributeKey]: {
				...attributes[attributeKey],
				value: newValue,
			},
		});
	};

	const handleFlatReset = () => {
		setAttributes({
			[attributeKey]: {
				value: defaultValue,
				unit,
			},
		});
	};

	const resolvedMax = currentUnit === "characters" ? 500 : max;

	return (
		<div className="custom-range-control">
			<RangeHeader
				label={label}
				unit={currentUnit}
				showReset={showReset}
				showDevice={showDevice && !flat}
				onReset={flat ? handleFlatReset : handleReset}
				showUnit={showUnit}
				options={options}
				onUnitChange={handleUnitChange}
			/>

			<div className="input-range">
				<RangeControl
					max={resolvedMax}
					min={min}
					value={flat ? flatValue : value}
					onChange={
						flat ? handleFlatChange : (newValue) => handleChange(newValue)
					}
					step={step}
				/>
			</div>
		</div>
	);
}

export default CustomRangeControl;
