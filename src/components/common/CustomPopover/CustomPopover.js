import { Popover } from "@wordpress/components";
import { useRef, useState } from "@wordpress/element";
import { PopUpIcon } from "../../../smart-post-carousel/assets/icon";

function CustomPopover({ label, children }) {
	const [isOpen, setIsOpen] = useState(false);
	const buttonRef = useRef(null);

	const handleToggle = () => setIsOpen(!isOpen);

	return (
		<div className="custom-range-control">
			<div className="range-control">
				<div className="content">
					<div className="range-label">
						<p>{label}</p>
					</div>
					<div className="range-measure">
						<div
							onClick={handleToggle}
							ref={buttonRef}
							style={{ cursor: "pointer" }}
						>
							<PopUpIcon isActive={isOpen} placement="top-start" />
						</div>
					</div>
				</div>
			</div>

			{isOpen && (
				<Popover onClose={() => setIsOpen(false)} placement="top-start">
					<div style={{ padding: "20px", minWidth: "400px" }}>
						<h3 style={{ marginTop: 0, marginBottom: "16px" }}>{label}</h3>
						{children}
					</div>
				</Popover>
			)}
		</div>
	);
}

export default CustomPopover;
