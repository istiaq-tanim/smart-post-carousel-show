import { arrowIcons } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import { useDeviceType } from "../../hooks/useDevice";

function SwiperNavigationButton({
	iconStyle,
	swiperNextButtonRef,
	swiperPrevButtonRef,
	visibilityOnHover,
}) {
	const { attributes } = useAttributes();
	const Icon = arrowIcons[iconStyle];

	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";

	const {
		iconSize,
		iconWidth,
		iconHeight,
		spaceBetweenArrow,
		verticalPosition,
		horizontalPosition,
		iconBackGroundColor,
		iconBackGroundHoverColor,
		iconColor,
		iconHoverColor,
		borderStyle,
		borderWidth,
		borderColor,
	} = attributes;

	const hasBorder = borderStyle !== "none";

	return (
		<div
			className={`sp-smart-post-carousel-swiper-nav-arrow ${
				visibilityOnHover ? "visible-on-hover" : ""
			}`}
			style={{
				"--iconBackGroundHeight": `${iconHeight[normalizedDeviceType]}px`,
				"--iconBackGroundWidth": `${iconWidth[normalizedDeviceType]}px`,
				"--spaceBetweenArrows": `${spaceBetweenArrow[normalizedDeviceType]}%`,
				"--spaceBetweenArrows": `${spaceBetweenArrow[normalizedDeviceType]}%`,
				"--verticalPosition": `${verticalPosition[normalizedDeviceType]}%`,
				"--horizontalPosition": `${horizontalPosition[normalizedDeviceType]}px`,
				"--iconBackGroundColor": iconBackGroundColor,
				"--iconBackGroundHoverColor": iconBackGroundHoverColor,
				"--iconColor": iconColor,
				"--iconHoverColor": iconHoverColor,
				...(hasBorder && { "--borderStyle": borderStyle }),
				...(hasBorder && { "--borderWidth": borderWidth }),
				...(hasBorder && { "--borderColor": borderColor }),
			}}
		>
			<span
				className={`sp-smart-post-carousel-swiper-nav-arrow-btn prev-btn ${
					hasBorder ? "has-border" : ""
				}`}
				ref={swiperPrevButtonRef}
				style={{ fontSize: `${iconSize[normalizedDeviceType]}px` }}
			>
				<Icon />
			</span>

			<span
				className="sp-smart-post-carousel-swiper-nav-arrow-btn next-btn"
				ref={swiperNextButtonRef}
				style={{ fontSize: `${iconSize[normalizedDeviceType]}px` }}
			>
				<Icon />
			</span>
		</div>
	);
}

export default SwiperNavigationButton;
