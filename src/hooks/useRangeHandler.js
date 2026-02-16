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
			const currentAttr = attributes?.[attributeKey];

			// ---------- SIMPLE NUMBER ATTRIBUTE ----------
			if (typeof currentAttr === "number") {
				setAttributes({ [attributeKey]: newValue });
				return;
			}

			// ---------- NESTED STRUCTURE ----------
			if (nestedKey) {
				setAttributes({
					[attributeKey]: {
						...currentAttr,
						[nestedKey]: {
							...(currentAttr?.[nestedKey] || {}),
							[activeSubKey]: newValue,
						},
					},
				});
				return;
			}

			// ---------- RESPONSIVE STRUCTURE ----------
			setAttributes({
				[attributeKey]: {
					...(currentAttr || {}),
					[activeSubKey]: newValue,
				},
			});
		},
		[attributes, setAttributes, attributeKey, nestedKey, activeSubKey],
	);

	// Reset only current device value (not all devices)
	const handleReset = useCallback(() => {
		const currentAttr = attributes?.[attributeKey];

		// simple number
		if (typeof currentAttr === "number") {
			setAttributes({ [attributeKey]: defaultValue });
			return;
		}

		// nested
		if (nestedKey) {
			setAttributes({
				[attributeKey]: {
					...currentAttr,
					[nestedKey]: {
						...(currentAttr?.[nestedKey] || {}),
						[activeSubKey]: defaultValue,
					},
				},
			});
			return;
		}

		// responsive
		setAttributes({
			[attributeKey]: {
				...(currentAttr || {}),
				[activeSubKey]: defaultValue,
			},
		});
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
