import { SOCIAL_PLATFORMS } from "../../../const/SocialPlatForm";

const SocialIcon = ({ value, type = "original" }) => {
	const platform = SOCIAL_PLATFORMS.find((p) => p.value === value);
	if (!platform) return null;

	const isCustom = type === "custom";

	return (
		<span
			sty
			className={`sp-smart-post-carousel-social-icon ${
				isCustom ? "custom-color" : ""
			}`}
			data-platform={value}
			aria-label={platform.label}
			role="img"
			title={platform.label}
			style={
				!isCustom
					? {
							backgroundColor: platform.color,
							color: "#fff",
					  }
					: {}
			}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				aria-hidden="true"
				focusable="false"
			>
				<path d={platform.icon} fill="currentColor" />
			</svg>
		</span>
	);
};

export default SocialIcon;
