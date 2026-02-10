import { useSelect } from "@wordpress/data";
export const useDeviceType = () => {
	const { deviceType } = useSelect((select) => {
		const coreEditor = select("core/editor");
		if (!coreEditor?.getDeviceType) {
			return { deviceType: "Desktop" };
		}
		return { deviceType: coreEditor.getDeviceType() };
	}, []);
	return deviceType || "Desktop";
};
