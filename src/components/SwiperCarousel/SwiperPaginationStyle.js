const STYLE_CLASS_MAP = {
	dots: "sp-smart-post-carousel-pagination-style--dots",
	lines: "sp-smart-post-carousel-pagination-style--lines",
	numbers: "sp-smart-post-carousel-pagination-style--numbers",
	fraction: "sp-smart-post-carousel-pagination-style--fraction",
	progressbar: "sp-smart-post-carousel-pagination-style--progressbar",
};

export default function SwiperPaginationStyle({
	paginationStyle = "dots",
	swiperPaginationRef,
}) {
	const styleClass = STYLE_CLASS_MAP[paginationStyle] || STYLE_CLASS_MAP.dots;

	return (
		<div
			ref={swiperPaginationRef}
			className={`sp-smart-post-carousel-swiper-pagination ${styleClass}`}
		/>
	);
}
