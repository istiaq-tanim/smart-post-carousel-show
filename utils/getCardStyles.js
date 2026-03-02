const getSpacing = (obj, device) =>
	`${obj?.[device]?.top ?? 0}px ${obj?.[device]?.right ?? 0}px ${
		obj?.[device]?.bottom ?? 0
	}px ${obj?.[device]?.left ?? 0}px`;

const getBoxShadow = (shadow, device, color) => {
	const s = shadow?.[device];
	if (!s) return undefined;
	return `${s.type === "inset" ? "inset " : ""}${s.xOffset ?? 0}px ${
		s.yOffset ?? 0
	}px ${s.blur ?? 0}px ${s.spread ?? 0}px ${color ?? "transparent"}`.trim();
};

const getBg = (styles, type, gradientKey, solidKey) => {
	const bgType = styles?.[type] || "transparent";
	if (bgType === "gradient") return styles?.[gradientKey];
	if (bgType === "solid") return styles?.[solidKey];
	return null;
};

export const getCardStyles = (attributes, normalizedDeviceType) => {
	const {
		height,
		equalHeight,
		contentBackGroundStyles,
		contentBorderStyle,
		contentHoverBorderStyle,
		contentBorderWidthNormal,
		contentBorderWidthHover,
		contentBorderColorNormal,
		contentBorderColorHover,
		contentBorderRadiusNormal,
		contentBorderRadiusHover,
		contentPadding,
		contentInnerPadding,
		contentMargin,
		contentBoxShadow,
		contentBoxShadowColor,
		showContentBoxShadow,
	} = attributes;

	const normalBg = getBg(
		contentBackGroundStyles,
		"type",
		"gradientBackground",
		"solidBackground",
	);
	const hoverBg = getBg(
		contentBackGroundStyles,
		"hoverType",
		"hoverGradientBackground",
		"hoverSolidBackground",
	);
	const boxShadow = showContentBoxShadow
		? getBoxShadow(
				contentBoxShadow,
				normalizedDeviceType,
				contentBoxShadowColor,
		  )
		: undefined;

	return {
		// Height
		"--cardHeight": equalHeight
			? `${height?.[normalizedDeviceType]}px`
			: undefined,

		// Background
		...(normalBg && { "--card-bg": normalBg }),
		...(hoverBg && { "--card-hover-bg": hoverBg }),

		// Border
		"--card-border": contentBorderStyle || "none",
		"--card-hover-border": contentHoverBorderStyle || "none",
		"--card-border-width": `${
			contentBorderWidthNormal?.[normalizedDeviceType] || 1
		}px`,
		"--card-hover-border-width": `${
			contentBorderWidthHover?.[normalizedDeviceType] || 1
		}px`,
		"--card-border-color": contentBorderColorNormal || "#000",
		"--card-hover-border-color": contentBorderColorHover || "#000",
		"--card-border-radius": `${
			contentBorderRadiusNormal?.[normalizedDeviceType] ?? 0
		}px`,
		"--card-hover-border-radius": `${
			contentBorderRadiusHover?.[normalizedDeviceType] ?? 0
		}px`,

		// Spacing
		"--card-padding": getSpacing(contentPadding, normalizedDeviceType),
		"--card-innerPadding": getSpacing(
			contentInnerPadding,
			normalizedDeviceType,
		),
		"--card-Margin": getSpacing(contentMargin, normalizedDeviceType),

		// Box Shadow
		...(boxShadow && { "--contentBoxShadow": boxShadow }),
	};
};
