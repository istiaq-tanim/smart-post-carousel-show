import { useState, useRef } from "@wordpress/element";
import { ColorPicker, Popover } from "@wordpress/components";
import Circle, { ResetIcon } from "../../../smart-post-carousel/assets/icon";
import "./editor.scss";
function CustomColorPicker({
	label,
	value,
	onChange,
	defaultValue = "#f05e31",
}) {
	const [isOpen, setIsOpen] = useState(false);
	const anchorRef = useRef(null);

	const handleColorChange = (value) => {
		onChange(value.hex);
	};

	const handleReset = () => {
		onChange(defaultValue);
		setIsOpen(false);
	};

	return (
		<div className="custom-color-picker-control">
			<div className="color-picker-control">
				<div className="content">
					<div className="range-label">
						<span>{label}</span>
					</div>
					<div className="range-measure">
						<div>
							<ResetIcon
								style={{ cursor: "pointer" }}
								onClick={handleReset}
							></ResetIcon>
							<div className="color">
								<div
									onClick={() => {
										setIsOpen(!isOpen);
									}}
									ref={anchorRef}
									style={{ cursor: "pointer" }}
								>
									<Circle fill={value} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isOpen && anchorRef.current && (
				<Popover
					placement="left-end"
					onClose={() => setIsOpen(false)}
					className="color-popover"
					usePortal={false}
				>
					<ColorPicker
						color={value}
						onChangeComplete={handleColorChange}
						enableAlpha
					/>
				</Popover>
			)}
		</div>
	);
}

export default CustomColorPicker;
