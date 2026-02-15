import { ResetIcon } from "../../../smart-post-carousel/assets/icon";
import DeviceDropdown from "./DeviceDropDown";

function RangeHeader({ label, unit, showReset, showDevice, onReset, showUnit }) {
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
						{
							showUnit && (<div className="pixel">
								<p>{unit}</p>
							</div>)
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default RangeHeader;
