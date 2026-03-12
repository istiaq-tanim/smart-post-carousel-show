const IMAGE_SIZE_MAP = {
	thumbnail: { width: "100%", height: "150px" },
	medium: { width: "100%", height: "300px" },
	medium_large: { width: "100%", height: "768px" },
	large: { width: "100%", height: "1024px" },
	"1536x1536": { width: "100%", height: "1536px" },
	"2048x2048": { width: "100%", height: "2048px" },
};

export const getImageStyles = (
	imageSize,
	imageWidth,
	imageHeight,
	device = "desktop",
) => {
	if (imageSize === "custom") {
		return {
			"--card-image-width": `${imageWidth?.[device] ?? 100}%`,
			"--card-image-height": `${imageHeight?.[device] ?? 245}px`,
		};
	}

	if (imageSize === "original") {
		return {
			"--card-image-width": "100%",
			"--card-image-height": "auto",
		};
	}

	const sizeConfig = IMAGE_SIZE_MAP[imageSize];
	return sizeConfig
		? {
				"--card-image-width": sizeConfig.width,
				"--card-image-height": sizeConfig.height,
		  }
		: {
				"--card-image-width": "100%",
				"--card-image-height": "245px",
		  };
};
