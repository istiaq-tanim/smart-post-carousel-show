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

function SpacingControl({
	label,
	values = {
		desktop: { top: 0, right: 0, bottom: 0, left: 0, linked: true },
		tablet: { top: 0, right: 0, bottom: 0, left: 0, linked: true },
		mobile: { top: 0, right: 0, bottom: 0, left: 0, linked: true },
	},
	showLabels = false,
	labels = {
		top: "Top",
		right: "Right",
		bottom: "Bottom",
		left: "Left",
	},
	onChange = () => {},
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

	const initialValues = useRef(values);

	const handleValueChange = (position, value) => {
		const updateDeviceValue = currentValues.linked
			? {
					...currentValues,
					top: value,
					right: value,
					bottom: value,
					left: value,
			  }
			: { ...currentValues, [position]: value };

		onChange({
			...values,
			[normalizedDeviceType]: updateDeviceValue,
		});
	};

	const handleReset = () => {
		const deviceDefaultValues = initialValues.current[normalizedDeviceType] || {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			linked: true,
		};
		onChange({
			...values,
			[normalizedDeviceType]: deviceDefaultValues,
		});
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
						<div>
							<ResetIcon
								style={{ cursor: "pointer" }}
								onClick={handleReset}
							></ResetIcon>
							<div className="pixel">
								<p>px</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="control-input-group">
				<div className="spacing-input-wrap">
					<NumberControl
						value={currentValues.top}
						step={4}
						min={0}
						onChange={(val) => {
							handleValueChange("top", val);
						}}
					></NumberControl>

					{showLabels && <span className="spacing-label">{labels.top}</span>}
				</div>
				<div className="spacing-input-wrap">
					<NumberControl
						value={currentValues.right}
						step={4}
						onChange={(val) => {
							handleValueChange("right", val);
						}}
						min={0}
					></NumberControl>
					{showLabels && <span className="spacing-label">{labels.right}</span>}
				</div>
				<div className="spacing-input-wrap">
					<NumberControl
						value={currentValues.bottom}
						min={0}
						step={4}
						onChange={(val) => {
							handleValueChange("bottom", val);
						}}
					></NumberControl>
					{showLabels && <span className="spacing-label">{labels.bottom}</span>}
				</div>
				<div className="spacing-input-wrap">
					<NumberControl
						value={currentValues.left}
						min={0}
						step={4}
						onChange={(val) => {
							handleValueChange("left", val);
						}}
					></NumberControl>
					{showLabels && <span className="spacing-label">{labels.left}</span>}
				</div>

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
						className={`link-btn ${currentValues.linked ? "" : "is-unlinked "}`}
					>
						{currentValues.linked ? <Link /> : <Unlink />}
					</button>
				</div>
			</div>
		</div>
	);
}

export default SpacingControl;
