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
		const attribute = attributes?.[attributeKey];

		// ---------- NESTED ----------
		if (nestedKey) {
			const nested = attribute?.[nestedKey];

			// nested responsive object
			if (typeof nested === "object" && nested !== null) {
				return nested[activeSubKey] ?? defaultValue;
			}

			// nested single value
			if (nested !== undefined) {
				return nested;
			}

			return defaultValue;
		}

		// ---------- RESPONSIVE ----------
		if (typeof attribute === "object" && attribute !== null) {
			return attribute[activeSubKey] ?? defaultValue;
		}

		// ---------- NORMAL ----------
		if (typeof attribute === "number") {
			return attribute;
		}

		return defaultValue;
	}, [attributes, attributeKey, nestedKey, activeSubKey, defaultValue]);

	return { value, activeSubKey };
};
