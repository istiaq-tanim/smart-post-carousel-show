import { useMemo } from "@wordpress/element";

export const useRangeValue = ({
	attributes,
	attributeKey,
	nestedKey,
	deviceType,
	defaultValue,
}) => {
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";
	const activeSubKey = normalizedDeviceType;

	const value = useMemo(() => {
		if (nestedKey && activeSubKey) {
			return (
				attributes?.[attributeKey]?.[nestedKey]?.[activeSubKey] ?? defaultValue
			);
		}
		if (activeSubKey) {
			return attributes?.[attributeKey]?.[activeSubKey] ?? defaultValue;
		}

		return attributes?.[attributeKey] ?? defaultValue;
	}, [attributes, attributeKey, nestedKey, activeSubKey, defaultValue]);

	return { value, activeSubKey };
};
