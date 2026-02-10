import { Dropdown } from "@wordpress/components";
import { useRef } from "react";
import { dispatch } from "@wordpress/data";

import { useDeviceType } from "../../../hooks/useDevice";
import {
	MobileIcon,
	TabIcon,
	TelevisionIcon,
} from "../../../smart-post-carousel/assets/icon";

function DeviceDropdown() {
	const closeRef = useRef(null);
	const timeoutRef = useRef(null);

	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";

	const handleMouseEnter = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => {
			closeRef.current?.();
		}, 300);
	};

	const changeDevice = (device) => {
		const canvas = document.getElementsByClassName(
			"edit-site-visual-editor__editor-canvas",
		);

		const store = canvas.length > 0 ? "core/edit-site" : "core/edit-post";
		dispatch(store).__experimentalSetPreviewDeviceType(device);
	};

	const getCurrentIcon = () => {
		switch (normalizedDeviceType) {
			case "mobile":
				return <MobileIcon />;
			case "tablet":
				return <TabIcon />;
			default:
				return <TelevisionIcon />;
		}
	};

	const getColor = (device) =>
		normalizedDeviceType === device ? "#8e56e9ff" : "#8C8F94";

	return (
		<Dropdown
			popoverProps={{ placement: "bottom-center" }}
			renderToggle={({ isOpen, onToggle }) => (
				<div
					className="device-toggle"
					style={{ cursor: "pointer" }}
					onMouseEnter={() => {
						handleMouseEnter();
						if (!isOpen) onToggle();
					}}
					onMouseLeave={handleMouseLeave}
				>
					{getCurrentIcon()}
				</div>
			)}
			renderContent={({ onClose }) => {
				closeRef.current = onClose;

				return (
					<div
						className="device-buttons"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<div
							onClick={() => {
								changeDevice("Desktop");
								onClose();
							}}
						>
							<TelevisionIcon color={getColor("desktop")} />
						</div>

						<div
							onClick={() => {
								changeDevice("Tablet");
								onClose();
							}}
						>
							<TabIcon color={getColor("tablet")} />
						</div>

						<div
							onClick={() => {
								changeDevice("Mobile");
								onClose();
							}}
						>
							<MobileIcon color={getColor("mobile")} />
						</div>
					</div>
				);
			}}
		/>
	);
}

export default DeviceDropdown;
