const gradientMap = {
	"warm-sunset":
		"linear-gradient(2deg, rgba(244, 66, 70, 0.4) 33.02%, rgba(221, 36, 118, 0.4) 98.51%)",
	"ocean-breeze":
		"linear-gradient(1deg, rgba(43, 88, 118, 0.4) 0.5%, rgba(78, 67, 118, 0.4) 99.51%)",
	"royal-gold":
		"linear-gradient(1deg, rgba(255, 215, 0, 0.4) 0.5%, rgba(184, 134, 11, 0.4) 99.51%)",
	"cool-blues":
		"linear-gradient(1deg, rgba(30, 60, 114, 0.4) 0.5%, rgba(42, 82, 152, 0.4) 99.51%)",
	"soft-pastel":
		"linear-gradient(1deg, rgba(252, 227, 138, 0.4) 0.5%, rgba(243, 129, 129, 0.4) 99.51%)",
	"elegant-purple":
		"linear-gradient(180deg, rgba(65, 41, 90, 0.4) 0%, rgba(47, 7, 67, 0.4) 100%)",
	"energetic-orange":
		"linear-gradient(180deg, rgba(255, 81, 47, 0.4) 0%, rgba(240, 152, 25, 0.4) 100%)",
};

const MULTI_SOLID_COLORS = [
	"rgba(255, 107, 107, 0.6)",
	"rgba(78, 205, 196, 0.6)",
	"rgba(69, 183, 209, 0.6)",
	"rgba(150, 206, 180, 0.6)",
	"rgba(255, 180, 162, 0.6)",
	"rgba(188, 144, 212, 0.6)",
];

const MULTI_GRADIENT_COLORS = [
	"linear-gradient(135deg, rgba(255,107,107,0.6), rgba(255,173,0,0.6))",
	"linear-gradient(135deg, rgba(78,205,196,0.6), rgba(69,183,209,0.6))",
	"linear-gradient(135deg, rgba(150,206,180,0.6), rgba(78,205,196,0.6))",
	"linear-gradient(135deg, rgba(188,144,212,0.6), rgba(255,107,107,0.6))",
	"linear-gradient(135deg, rgba(255,180,162,0.6), rgba(255,107,107,0.6))",
	"linear-gradient(135deg, rgba(69,183,209,0.6), rgba(150,206,180,0.6))",
];

export const getOverLayStyle = (overlayType, index, imageBackGroundStyles) => {
	const result = {};

	if (!overlayType || overlayType === "no-overlay") {
		return result;
	}

	if (overlayType === "custom") {
		const bgType = imageBackGroundStyles?.type || "transparent";
		const hoverBgType = imageBackGroundStyles?.hoverType || "transparent";

		const normalBg =
			bgType === "gradient"
				? imageBackGroundStyles?.gradientBackground
				: bgType === "solid"
				? imageBackGroundStyles?.solidBackground
				: null;

		const hoverBg =
			hoverBgType === "gradient"
				? imageBackGroundStyles?.hoverGradientBackground
				: hoverBgType === "solid"
				? imageBackGroundStyles?.hoverSolidBackground
				: null;

		return {
			...(normalBg && { "--card-overlay": normalBg }),
			...(hoverBg && { "--card-overlay-hover": hoverBg }),
		};
	}

	if (overlayType === "multi-solid") {
		const color = MULTI_SOLID_COLORS[index % MULTI_SOLID_COLORS.length];
		return { ...result, "--card-overlay": color };
	}

	if (overlayType === "multi-gradient") {
		const gradient =
			MULTI_GRADIENT_COLORS[index % MULTI_GRADIENT_COLORS.length];
		return { ...result, "--card-overlay": gradient };
	}

	const gradient = gradientMap[overlayType];
	return gradient ? { ...result, "--card-overlay": gradient } : result;
};
