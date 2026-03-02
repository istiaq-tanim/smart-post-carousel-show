import { ResetIcon } from "../../../smart-post-carousel/assets/icon";
import UnitDropdown from "../UnitDropDown/UnitDropDown";
import DeviceDropdown from "./DeviceDropDown";

function RangeHeader({
	label,
	showReset,
	showDevice,
	onReset,
	showUnit,
	unit,
	options,
	onUnitChange,
}) {
	return (
		<div className="range-control">
			<div className="content">
				<div className="range-label">
					<span>{label}</span>
					{showDevice && (
						<div className="desktop">
							<DeviceDropdown />
						</div>
					)}
				</div>
				<div className="range-measure">
					<div>
						{showReset && (
							<ResetIcon style={{ cursor: "pointer" }} onClick={onReset} />
						)}
						{showUnit && (
							<UnitDropdown
								value={unit}
								options={options}
								onChange={onUnitChange}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default RangeHeader;
