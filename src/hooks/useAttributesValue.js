import { useMemo, useCallback } from "@wordpress/element";

export const useAttributeValue = ({
	attributes,
	setAttributes,
	attributeKey,
	deviceType,
	nestedKey = null,
	defaultValue = 0,
}) => {
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";
	const isResponsive = deviceType !== undefined;

	// Get current value
	const value = useMemo(() => {
		if (!isResponsive) {
			return attributes?.[attributeKey] ?? defaultValue;
		}

		if (nestedKey) {
			return (
				attributes?.[attributeKey]?.[nestedKey]?.[normalizedDeviceType] ??
				defaultValue
			);
		}

		return attributes?.[attributeKey]?.[normalizedDeviceType] ?? defaultValue;
	}, [
		attributes,
		attributeKey,
		nestedKey,
		normalizedDeviceType,
		defaultValue,
		isResponsive,
	]);

	// Update value
	const setValue = useCallback(
		(newValue) => {
			if (!isResponsive) {
				setAttributes({ [attributeKey]: newValue });
				return;
			}

			if (nestedKey) {
				setAttributes({
					[attributeKey]: {
						...attributes[attributeKey],
						[nestedKey]: {
							...attributes[attributeKey]?.[nestedKey],
							[normalizedDeviceType]: newValue,
						},
					},
				});
				return;
			}

			setAttributes({
				[attributeKey]: {
					...attributes[attributeKey],
					[normalizedDeviceType]: newValue,
				},
			});
		},
		[
			attributes,
			setAttributes,
			attributeKey,
			nestedKey,
			normalizedDeviceType,
			isResponsive,
		],
	);

	// Reset value
	const resetValue = useCallback(() => {
		setValue(defaultValue);
	}, [setValue, defaultValue]);

	return { value, setValue, resetValue };
};
