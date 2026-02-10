import { useCallback } from "@wordpress/element";

export const useRangeHandler = ({
	attributes,
	setAttributes,
	attributeKey,
	nestedKey,
	activeSubKey,
	defaultValue,
}) => {
	const handleChange = useCallback(
		(newValue) => {
			// Nested object structure
			if (nestedKey && activeSubKey) {
				setAttributes({
					[attributeKey]: {
						...attributes[attributeKey],
						[nestedKey]: {
							...attributes[attributeKey]?.[nestedKey],
							[activeSubKey]: newValue,
						},
					},
				});
				return;
			}

			// Device-specific structure
			if (activeSubKey) {
				setAttributes({
					[attributeKey]: {
						...attributes[attributeKey],
						[activeSubKey]: newValue,
					},
				});
				return;
			}

			// Simple structure
			setAttributes({ [attributeKey]: newValue });
		},
		[attributes, setAttributes, attributeKey, nestedKey, activeSubKey],
	);

	// Reset only current device value (not all devices)
	const handleReset = useCallback(() => {
		// For nested structure
		if (nestedKey && activeSubKey) {
			setAttributes({
				[attributeKey]: {
					...attributes[attributeKey],
					[nestedKey]: {
						...attributes[attributeKey]?.[nestedKey],
						[activeSubKey]: defaultValue,
					},
				},
			});
			return;
		}

		// For device-specific structure
		if (activeSubKey) {
			setAttributes({
				[attributeKey]: {
					...attributes[attributeKey],
					[activeSubKey]: defaultValue,
				},
			});
			return;
		}

		// For simple structure
		setAttributes({ [attributeKey]: defaultValue });
	}, [
		attributes,
		setAttributes,
		attributeKey,
		nestedKey,
		activeSubKey,
		defaultValue,
	]);

	return { handleChange, handleReset };
};
