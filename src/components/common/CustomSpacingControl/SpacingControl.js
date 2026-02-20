import { useRef } from "react";
import { useDeviceType } from "../../../hooks/useDevice";
import {
	Link,
	Unlink,
	ResetIcon,
} from "../../../smart-post-carousel/assets/icon";
import DeviceDropdown from "../CustomRangeControl/DeviceDropDown";
import NumberControl from "./NumberControl";
import "./editor.scss";
import UnitDropdown from "../UnitDropDown/UnitDropDown";

function SpacingControl({
	label,
	values = {
		desktop: { top: 0, right: 0, bottom: 0, left: 0, linked: true },
		tablet: { top: 0, right: 0, bottom: 0, left: 0, linked: true },
		mobile: { top: 0, right: 0, bottom: 0, left: 0, linked: true },
	},
	showLabels = false,
	labels = {},
	onChange = () => {},
	step = 4,
	showUnit,
	options,
}) {
	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";
	const currentValues = values[normalizedDeviceType] || {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		linked: true,
	};

	const fields = Object.keys(currentValues).filter(
		(key) => key !== "linked" && key !== "type",
	);

	const initialValues = useRef(values);

	const handleValueChange = (field, value) => {
		const updateDeviceValue = currentValues.linked
			? {
					...currentValues,
					...fields.reduce((acc, key) => ({ ...acc, [key]: value }), {}),
			  }
			: { ...currentValues, [field]: value };

		onChange({ ...values, [normalizedDeviceType]: updateDeviceValue });
	};

	const handleReset = () => {
		const deviceDefaultValues = initialValues.current[normalizedDeviceType] || {
			linked: true,
			...fields.reduce((acc, key) => ({ ...acc, [key]: 0 }), {}),
		};
		onChange({ ...values, [normalizedDeviceType]: deviceDefaultValues });
	};

	const handleLinkToggle = () => {
		onChange({
			...values,
			[normalizedDeviceType]: {
				...currentValues,
				linked: !currentValues.linked,
			},
		});
	};

	const handleUnitChange = (type) => {
		onChange({
			...values,
			[normalizedDeviceType]: {
				...currentValues,
				type,
			},
		});
	};
	return (
		<div className="custom-range-control">
			<div className="range-control">
				<div className="content">
					<div className="range-label">
						<span>{label}</span>
						<div className="desktop">
							<DeviceDropdown></DeviceDropdown>
						</div>
					</div>
					<div className="range-measure">
						<ResetIcon
							style={{ cursor: "pointer" }}
							onClick={handleReset}
						></ResetIcon>

						{showUnit && (
							<UnitDropdown
								value={currentValues.type || "outset"}
								options={options}
								onChange={handleUnitChange}
							/>
						)}
					</div>
				</div>
			</div>
			<div className="control-input-group">
				{fields.map((field) => (
					<div className="spacing-input-wrap" key={field}>
						<NumberControl
							value={currentValues[field] ?? 0}
							step={step}
							min={0}
							onChange={(val) => handleValueChange(field, val)}
						/>
						{showLabels && (
							<span className="spacing-label">{labels[field] || field}</span>
						)}
					</div>
				))}

				<div
					style={{
						visibility: showLabels ? "hidden" : "visible",
						flexShrink: 0,
						width: showLabels ? 0 : "auto",
						overflow: "hidden",
					}}
				>
					<button
						onClick={handleLinkToggle}
						className={`link-btn ${currentValues.linked ? "" : "is-unlinked"}`}
					>
						{currentValues.linked ? <Link /> : <Unlink />}
					</button>
				</div>
			</div>
		</div>
	);
}

export default SpacingControl;
