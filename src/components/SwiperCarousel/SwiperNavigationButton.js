import { arrowIcons } from "../../const";

function SwiperNavigationButton({
	iconStyle,
	swiperNextButtonRef,
	swiperPrevButtonRef,
	visibilityOnHover,
}) {
	const Icon = arrowIcons[iconStyle];

	return (
		<div
			className={`sp-smart-post-carousel-swiper-nav-arrow ${
				visibilityOnHover ? "visible-on-hover" : ""
			}`}
		>
			<span
				className="sp-smart-post-carousel-swiper-nav-arrow-btn prev-btn"
				ref={swiperPrevButtonRef}
			>
				<Icon />
			</span>

			<span
				className="sp-smart-post-carousel-swiper-nav-arrow-btn next-btn"
				ref={swiperNextButtonRef}
			>
				<Icon />
			</span>
		</div>
	);
}

export default SwiperNavigationButton;
