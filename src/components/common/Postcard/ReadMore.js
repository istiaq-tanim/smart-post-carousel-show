import { buttonIcons } from "../../../const";
import { useAttributes } from "../../../hooks/useAttributes";
import { useDeviceType } from "../../../hooks/useDevice";

function ReadMore() {
	const { attributes } = useAttributes();
	const {
		buttonStyle,
		buttonText,
		buttonTypo,
		iconVisibility,
		iconGap,
		buttonTextColor,
		buttonBackGroundStyles,
		buttonBorderStyle,
		buttonHoverBorderStyle,
		buttonBorderWidthNormal,
		buttonBorderWidthHover,
		buttonBorderColorHover,
		buttonBorderColorNormal,
		buttonBorderRadiusNormal,
		buttonBorderRadiusHover,
		buttonPadding,
		buttonMargin,
		buttonType,
	} = attributes;
	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";

	const tagName = buttonTypo?.tags || "a";
	const Tag = tagName;

	const iconObj = buttonIcons.find((b) => b.value === buttonStyle);
	const Icon = iconObj?.icon;

	const showIcon = iconVisibility !== "none" && Icon;

	const normalColor = buttonTextColor?.normal ?? color ?? "inherit";
	const hoverColor = buttonTextColor?.hover || normalColor;

	const bgType = buttonBackGroundStyles?.type || "transparent";
	const hoverBgType = buttonBackGroundStyles?.hoverType || "transparent";

	const normalBg =
		bgType === "gradient"
			? buttonBackGroundStyles?.gradientBackground
			: bgType === "solid"
			? buttonBackGroundStyles?.solidBackground
			: null;

	const hoverBg =
		hoverBgType === "gradient"
			? buttonBackGroundStyles?.hoverGradientBackground
			: hoverBgType === "solid"
			? buttonBackGroundStyles?.hoverSolidBackground
			: null;

	return (
		<div
			className="sp-smart-post-carousel-read-more-button"
			style={{
				"--button-font-family": buttonTypo?.family ?? "inherit",
				"--button-font-weight": buttonTypo?.weight ?? 400,
				"--button-line-height": buttonTypo?.height ?? 1.5,
				"--button-letter-spacing": `${buttonTypo?.spacing ?? 0}px`,
				"--button-font-size": `${buttonTypo?.fontSize ?? 12}px`,
				"--iconGap": `${iconGap[normalizedDeviceType] ?? 4}px`,
				"--button-normal-color": normalColor,
				"--button-hover-color": hoverColor,
				"--button-margin": `${buttonMargin[normalizedDeviceType].top ?? 0}px ${
					buttonMargin[normalizedDeviceType].right ?? 0
				}px ${buttonMargin[normalizedDeviceType].bottom ?? 0}px ${
					buttonMargin[normalizedDeviceType].left ?? 0
				}px`,

				...(buttonType === "button" && {
					...(normalBg && { "--button-bg": normalBg }),
					...(hoverBg && { "--button-hover-bg": hoverBg }),
					"--button-border": buttonBorderStyle || "none",
					"--button-hover-border":
						buttonHoverBorderStyle === "none"
							? buttonBorderStyle
							: buttonHoverBorderStyle,
					"--button-border-size": `${
						buttonBorderWidthNormal[normalizedDeviceType] ?? 1
					}px`,
					"--button-hover-border-size": `${
						buttonBorderWidthHover[normalizedDeviceType] ?? 1
					}px`,
					"--button-border-color": buttonBorderColorNormal || "#4e6e3e",
					"--button-hover-border-color":
						`${buttonBorderColorHover || buttonBorderColorNormal}` || "#000",
					"--button-border-radius": `${
						buttonBorderRadiusNormal?.[normalizedDeviceType] ?? 0
					}px`,
					"--button-hover-border-radius": `${
						buttonBorderRadiusHover?.[normalizedDeviceType] ?? 0
					}px`,
					"--button-padding": `${
						buttonPadding[normalizedDeviceType].top ?? 0
					}px ${buttonPadding[normalizedDeviceType].right ?? 0}px ${
						buttonPadding[normalizedDeviceType].bottom ?? 0
					}px ${buttonPadding[normalizedDeviceType].left ?? 0}px`,
				}),
			}}
		>
			<span
				className={`sp-smart-post-carousel-read-more-btn-link 
                          ${buttonType === "button" ? "is-button" : ""} 
                          ${iconVisibility === "hover" ? "icon-hover" : ""}`}
			>
				<Tag>{buttonText}</Tag>
				{showIcon && (
					<span className="read-more-icon">
						<Icon />
					</span>
				)}
			</span>
		</div>
	);
}

export default ReadMore;
