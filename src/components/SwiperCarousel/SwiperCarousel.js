import { useRef, useEffect, useMemo } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/effect-flip";
import "swiper/css/effect-coverflow";
import {
	Autoplay,
	Navigation,
	Pagination,
	EffectFade,
	EffectCube,
	EffectFlip,
	EffectCoverflow,
	Keyboard,
	Mousewheel,
	FreeMode,
	Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PostCard from "../common/Postcard/PostCard";
import { useDeviceType } from "../../hooks/useDevice";
import { arrayChunk, CHUNKED_EFFECTS, EFFECT_MAP } from "../../../utils";
import SwiperNavigationButton from "./SwiperNavigationButton";
import { getRenderBullet } from "../../const";
import SwiperPaginationStyle from "./SwiperPaginationStyle";

const EFFECT_MODULES = {
	fade: EffectFade,
	cube: EffectCube,
	flip: EffectFlip,
	cover: EffectCoverflow,
};

const PAGINATION_TYPE_MAP = {
	dots: "bullets",
	lines: "bullets",
	numbers: "bullets",
	fraction: "fraction",
	progressbar: "progressbar",
};

export default function SwiperCarousel({ attributes, posts }) {
	const {
		columns,
		gap,
		autoPlay,
		delay,
		speed,
		direction,
		slideGroup,
		onHover,
		effect,
		adaptiveHeight,
		infiniteLoop,
		keyNavigation,
		mouseWheelControl,
		freeScroll,
		navigationArrow,
		paginationDots,
		arrowStyle,
		visibilityOnHover,
		paginationStyle,
		paginationWidth,
		paginationHeight,
		paginationDotGap,
		paginationVerticalPosition,
		paginationHorizontalPosition,
		dotNormalBackGroundNormalColor,
		dotNormalBackGroundActiveColor,
		dotNormalTextColor,
		dotActiveTextColor,
		paginationDotStyleType,
	} = attributes;

	// All References
	const swiperRef = useRef(null);
	const swiperNextButtonRef = useRef(null);
	const swiperPrevButtonRef = useRef(null);
	const swiperPaginationRef = useRef(null);
	const swiperScrollbarRef = useRef(null);

	// Device / Responsive Value
	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";
	const slidePerView = columns[normalizedDeviceType] || 1;
	const gapBetweenSlide = gap[normalizedDeviceType] || 8;
	const slideGroupNumber = slideGroup[normalizedDeviceType] || 1;
	const autoplayDelay = Number(delay) || 3000;
	const transitionSpeed = Number(speed) || 600;

	// Swiper Effect Related Flags
	const isChunkedEffect = CHUNKED_EFFECTS.includes(effect);
	const isEffectSlide = !Object.keys(EFFECT_MODULES).includes(effect);

	// Chunk posts for fade/cube/flip
	const allPosts = useMemo(() => {
		if (isChunkedEffect) {
			return arrayChunk(posts, slidePerView);
		}
		return posts;
	}, [posts, slidePerView, isChunkedEffect]);

	const swiperModules = useMemo(() => {
		const base = [
			Navigation,
			Pagination,
			Keyboard,
			Mousewheel,
			FreeMode,
			Autoplay,
		];
		if (paginationStyle === "progressbar") {
			base.push(Scrollbar);
		} else {
			base.push(Pagination);
		}
		if (EFFECT_MODULES[effect]) base.push(EFFECT_MODULES[effect]);
		return base;
	}, [effect, paginationStyle]);

	// Effect-specific props
	const effectProps = useMemo(() => {
		switch (effect) {
			case "cube":
				return {
					cubeEffect: {
						shadow: true,
						slideShadows: true,
						shadowOffset: 20,
						shadowScale: 0.94,
					},
				};
			case "cover":
				return {
					coverflowEffect: {
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: true,
					},
				};
			case "flip":
				return {
					flipEffect: { slideShadows: true },
				};
			case "fade":
				return {
					fadeEffect: { crossFade: true },
				};
			default:
				return {};
		}
	}, [effect]);

	// Swiper key (forces re-mount on config change)
	const swiperKey = [
		slidePerView,
		gapBetweenSlide,
		slideGroupNumber,
		effect,
		adaptiveHeight,
		keyNavigation,
		mouseWheelControl,
		freeScroll,
		navigationArrow,
		paginationDots,
		paginationStyle,
	].join("-");

	// Pagination config
	const paginationConfig = useMemo(() => {
		if (!paginationDots) return false;
		if (paginationStyle === "progressbar") return false;

		const type = PAGINATION_TYPE_MAP[paginationStyle] || "bullets";

		const base = {
			clickable: true,
			el: swiperPaginationRef.current,
			type,
		};

		if (type === "bullets") {
			base.renderBullet = getRenderBullet(paginationStyle);
			base.bulletClass = "sp-smart-post-carousel-pagination-bullet-base";
			base.bulletActiveClass = "swiper-pagination-bullet-active";
		}

		return base;
	}, [paginationDots, paginationStyle]);

	const scrollbarConfig = useMemo(() => {
		if (!paginationDots) return false;
		if (paginationStyle !== "progressbar") return false;
		return {
			el: ".sp-smart-post-carousel-swiper-scrollbar",
			draggable: true,
			hide: false,
			snapOnRelease: true,
		};
	}, [paginationDots, paginationStyle]);

	// On Hover AutoPlay start and Stop
	useEffect(() => {
		if (swiperRef.current?.autoplay) {
			swiperRef.current.params.autoplay.pauseOnMouseEnter = onHover;
		}
	}, [onHover]);

	useEffect(() => {
		const swiper = swiperRef.current;
		if (!swiper || !paginationDots) return;

		if (paginationStyle === "progressbar") {
			if (!swiperScrollbarRef.current) return;
			if (!swiper.scrollbar) return;
			swiper.params.scrollbar.el = swiperScrollbarRef.current;
			swiper.scrollbar.init();
			swiper.scrollbar.updateSize();
			swiper.scrollbar.setTranslate();
		} else {
			if (!swiperPaginationRef.current) return;
			swiper.params.pagination.el = swiperPaginationRef.current;
			swiper.pagination.init();
			swiper.pagination.render();
			swiper.pagination.update();
		}
	}, [paginationDots, paginationStyle]);

	// Render Slides Based on Swiper Effect
	const renderSlides = () => {
		if (isChunkedEffect) {
			return allPosts.map((chunk, i) => (
				<SwiperSlide key={i}>
					<div style={{ display: "flex", gap: gapBetweenSlide }}>
						{chunk.map((post) => (
							<div key={post.id} style={{ flex: 1, minWidth: 0 }}>
								<PostCard post={post} attributes={attributes} />
							</div>
						))}
					</div>
				</SwiperSlide>
			));
		}

		return posts.map((post) => (
			<SwiperSlide key={post.id}>
				<PostCard post={post} attributes={attributes} />
			</SwiperSlide>
		));
	};

	return (
		<div
			className="sp-smart-post-carousel"
			style={{
				"--paginationDotWidth": `${
					paginationWidth[normalizedDeviceType] ?? 12
				}px`,
				"--paginationDotHeight": `${
					paginationHeight[normalizedDeviceType] ?? 12
				}px`,
				"--paginationDotGap": `${
					paginationDotGap[normalizedDeviceType] ?? 8
				}px`,
				"--paginationVerticalPosition": `${
					paginationVerticalPosition[normalizedDeviceType] ?? -36
				}px`,
				"--paginationHorizontalPosition": `${
					paginationHorizontalPosition[normalizedDeviceType] ?? 50
				}%`,
				"--paginationBackGroundInActiveColor": `${dotNormalBackGroundNormalColor}`,
				"--paginationBackGroundActiveColor": `${dotNormalBackGroundActiveColor}`,
				"--paginationTextInActiveColor": `${dotNormalTextColor}`,
				"--paginationTextActiveColor": `${dotActiveTextColor}`,
			}}
		>
			<Swiper
				key={swiperKey}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;

					setTimeout(() => {
						if (
							paginationDots &&
							paginationStyle === "progressbar" &&
							swiperScrollbarRef.current &&
							swiper.scrollbar
						) {
							swiper.params.scrollbar.el = swiperScrollbarRef.current;
							swiper.scrollbar.init();
							swiper.scrollbar.updateSize();
							swiper.scrollbar.setTranslate();
							swiper.update();
						}
					}, 0);
				}}
				modules={swiperModules}
				autoHeight={adaptiveHeight || false}
				slidesPerView={isChunkedEffect ? 1 : slidePerView}
				spaceBetween={effect === "cube" ? 0 : gapBetweenSlide}
				navigation={{
					nextEl: swiperNextButtonRef.current,
					prevEl: swiperPrevButtonRef.current,
					enabled: true,
				}}
				pagination={paginationConfig}
				scrollbar={scrollbarConfig}
				slidesPerGroup={freeScroll ? 1 : isEffectSlide ? slideGroupNumber : 1}
				autoplay={
					autoPlay
						? {
								delay: autoplayDelay,
								disableOnInteraction: false,
								pauseOnMouseEnter: onHover,
								reverseDirection: direction === "left",
						  }
						: false
				}
				loop={isEffectSlide && infiniteLoop && slideGroupNumber <= 1}
				speed={transitionSpeed}
				effect={EFFECT_MAP[effect] || "slide"}
				{...effectProps}
				keyboard={
					keyNavigation ? { enabled: true, onlyInViewport: true } : false
				}
				mousewheel={
					mouseWheelControl
						? {
								forceToAxis: false,
								sensitivity: 1,
								releaseOnEdges: true,
								thresholdDelta: 50,
						  }
						: false
				}
				freeMode={
					freeScroll
						? {
								enabled: true,
								sticky: true,
								momentum: true,
								momentumRatio: 0.25,
								momentumVelocityRatio: 0.5,
						  }
						: false
				}
			>
				{renderSlides()}
			</Swiper>

			{navigationArrow && (
				<SwiperNavigationButton
					iconStyle={arrowStyle}
					visibilityOnHover={visibilityOnHover}
					swiperNextButtonRef={swiperNextButtonRef}
					swiperPrevButtonRef={swiperPrevButtonRef}
				/>
			)}

			{paginationDots && paginationStyle !== "progressbar" && (
				<SwiperPaginationStyle
					paginationStyle={paginationStyle}
					swiperPaginationRef={swiperPaginationRef}
				/>
			)}

			{paginationDots && paginationStyle === "progressbar" && (
				<div
					ref={swiperScrollbarRef}
					className="sp-smart-post-carousel-swiper-scrollbar"
				/>
			)}
		</div>
	);
}
