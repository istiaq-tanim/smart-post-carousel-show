import { useEffect, useMemo, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cube";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
	Autoplay,
	EffectCoverflow,
	EffectCube,
	EffectFade,
	EffectFlip,
	FreeMode,
	Keyboard,
	Mousewheel,
	Navigation,
	Pagination,
	Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { arrayChunk, CHUNKED_EFFECTS, EFFECT_MAP } from "../../../utils";
import { getRenderBullet } from "../../const";
import { useDeviceType } from "../../hooks/useDevice";
import PostCard from "../common/Postcard/PostCard";
import SwiperNavigationButton from "./SwiperNavigationButton";
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
		partialVisibility,
		cardBackGroundStyles,
		cardBorderStyle,
		cardHoverBorderStyle,
		cardBorderWidthNormal,
		cardBorderWidthHover,
		cardBorderColorNormal,
		cardBorderColorHover,
		cardBorderRadiusNormal,
		cardBorderRadiusHover,
		cardPadding,
		numberOfSlides,
	} = attributes;

	const swiperRef = useRef(null);
	const swiperPaginationRef = useRef(null);
	const swiperScrollbarRef = useRef(null);

	const [isPrevDisabled, setIsPrevDisabled] = useState(true);
	const [isNextDisabled, setIsNextDisabled] = useState(false);

	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";
	const slidePerView = columns[normalizedDeviceType] || 1;
	const gapBetweenSlide = gap[normalizedDeviceType] || 8;
	const slideGroupNumber = slideGroup[normalizedDeviceType] || 1;
	const autoplayDelay = Number(delay) || 3000;
	const transitionSpeed = Number(speed) || 400;

	const isChunkedEffect = CHUNKED_EFFECTS.includes(effect);
	const isEffectSlide = !Object.keys(EFFECT_MODULES).includes(effect);

	const shouldApplyPartial = partialVisibility && isEffectSlide;

	const allPosts = useMemo(() => {
		if (isChunkedEffect) return arrayChunk(posts, slidePerView);
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
		if (paginationStyle === "progressbar") base.push(Scrollbar);
		else base.push(Pagination);
		if (EFFECT_MODULES[effect]) base.push(EFFECT_MODULES[effect]);
		return base;
	}, [effect, paginationStyle]);

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
				return { flipEffect: { slideShadows: true } };
			case "fade":
				return { fadeEffect: { crossFade: true } };
			default:
				return {};
		}
	}, [effect]);

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
		onHover,
		posts.length,
		attributes.postType,
		JSON.stringify(attributes.multiplePostType),
		partialVisibility,
	].join("-");

	const paginationConfig = useMemo(() => {
		if (!paginationDots) return false;
		if (paginationStyle === "progressbar") return false;

		const type = PAGINATION_TYPE_MAP[paginationStyle] || "bullets";
		const base = {
			clickable: true,
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
			dragSize: "auto",
		};
	}, [paginationDots, paginationStyle]);

	const updateNavButtons = (swiper) => {
		if (!swiper) return;
		const isLoop = swiper.params.loop;
		setIsPrevDisabled(swiper.isBeginning && !isLoop);
		setIsNextDisabled(swiper.isEnd && !isLoop);
	};

	const initPagination = (swiper) => {
		if (!swiper || !paginationDots) return;

		if (paginationStyle === "progressbar") {
			if (!swiperScrollbarRef.current || !swiper.scrollbar) return;
			swiper.params.scrollbar.el = swiperScrollbarRef.current;
			swiper.scrollbar.init();
			swiper.scrollbar.updateSize();
			swiper.scrollbar.setTranslate();
		} else {
			if (!swiperPaginationRef.current) return;

			if (effect === "cover") {
				swiper.params.slidesPerGroup = slidePerView;
			}

			swiper.pagination.destroy();
			swiper.params.pagination.el = swiperPaginationRef.current;
			swiper.pagination.init();
			swiper.pagination.render();
			swiper.pagination.update();
		}
	};

	useEffect(() => {
		const swiper = swiperRef.current;
		if (!swiper) return;
		const timer = setTimeout(() => {
			swiper.update();
			updateNavButtons(swiper);
			initPagination(swiper);
		}, 150);
		return () => clearTimeout(timer);
	}, [swiperKey]);

	useEffect(() => {
		const swiper = swiperRef.current;
		if (!swiper) return;
		const timer = setTimeout(() => {
			initPagination(swiper);
		}, 150);
		return () => clearTimeout(timer);
	}, [paginationDots, paginationStyle]);

	useEffect(() => {
		const swiper = swiperRef.current;
		if (!swiper?.el || !autoPlay) return;

		const el = swiper.el;
		const handleMouseEnter = () => {
			if (onHover) swiper.autoplay?.pause();
		};
		const handleMouseLeave = () => {
			if (onHover) swiper.autoplay?.resume();
		};

		el.addEventListener("mouseenter", handleMouseEnter);
		el.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			el.removeEventListener("mouseenter", handleMouseEnter);
			el.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [onHover, autoPlay, swiperKey]);

	const handlePrev = () => {
		if (!isPrevDisabled) swiperRef.current?.slidePrev();
	};
	const handleNext = () => {
		if (!isNextDisabled) swiperRef.current?.slideNext();
	};

	const bgType = cardBackGroundStyles?.type || "transparent";
	const hoverBgType = cardBackGroundStyles?.hoverType || "transparent";

	const normalBg =
		bgType === "gradient"
			? cardBackGroundStyles?.gradientBackground
			: bgType === "solid"
			? cardBackGroundStyles?.solidBackground
			: null;

	const hoverBg =
		hoverBgType === "gradient"
			? cardBackGroundStyles?.hoverGradientBackground
			: hoverBgType === "solid"
			? cardBackGroundStyles?.hoverSolidBackground
			: null;

	const renderSlides = () => {
		if (isChunkedEffect) {
			return allPosts.map((chunk, i) => (
				<SwiperSlide key={i}>
					<div style={{ display: "flex", gap: gapBetweenSlide }}>
						{chunk.map((post) => (
							<div key={post.post_id} style={{ flex: 1, minWidth: 0 }}>
								<PostCard post={post} attributes={attributes} />
							</div>
						))}
					</div>
				</SwiperSlide>
			));
		}
		return posts.map((post, index) => (
			<SwiperSlide key={post.post_id}>
				<PostCard post={post} attributes={attributes} index={index} />
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

				...(normalBg && { "--container-bg": normalBg }),
				...(hoverBg && { "--container-hover-bg": hoverBg }),
				"--container-border-style": cardBorderStyle || "none",
				"--container-hover-border-style":
					cardHoverBorderStyle === "none"
						? cardBorderStyle
						: cardHoverBorderStyle,
				"--container-border-size": `${
					cardBorderWidthNormal[normalizedDeviceType] ?? 1
				}px`,
				"--container-hover-border-size": `${
					cardBorderWidthHover[normalizedDeviceType] ?? 1
				}px`,
				"--container-border-color": cardBorderColorNormal || "#4e6e3e",
				"--container-hover-border-color": `${cardBorderColorHover}` || "#000",
				"--container-border-radius": `${
					cardBorderRadiusNormal?.[normalizedDeviceType] ?? 0
				}px`,
				"--container-hover-border-radius": `${
					cardBorderRadiusHover?.[normalizedDeviceType] ?? 0
				}px`,
				"--container-padding": `${
					cardPadding[normalizedDeviceType].top ?? 0
				}px ${cardPadding[normalizedDeviceType].right ?? 0}px ${
					cardPadding[normalizedDeviceType].bottom ?? 0
				}px ${cardPadding[normalizedDeviceType].left ?? 0}px`,
			}}
		>
			{navigationArrow && slidePerView < numberOfSlides && (
				<SwiperNavigationButton
					iconStyle={arrowStyle}
					visibilityOnHover={visibilityOnHover}
					onPrev={handlePrev}
					onNext={handleNext}
					isPrevDisabled={isPrevDisabled}
					isNextDisabled={isNextDisabled}
				/>
			)}

			<Swiper
				key={swiperKey}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
					setTimeout(() => {
						updateNavButtons(swiper);
						initPagination(swiper);
					}, 0);
				}}
				navigation={false}
				onAfterInit={(swiper) => updateNavButtons(swiper)}
				onSlideChange={(swiper) => updateNavButtons(swiper)}
				onReachBeginning={(swiper) => updateNavButtons(swiper)}
				onReachEnd={(swiper) => updateNavButtons(swiper)}
				onUpdate={(swiper) => updateNavButtons(swiper)}
				onResize={(swiper) => updateNavButtons(swiper)}
				modules={swiperModules}
				autoHeight={adaptiveHeight || false}
				slidesPerView={
					isChunkedEffect
						? 1
						: shouldApplyPartial
						? slidePerView + 0.2
						: slidePerView
				}
				centeredSlides={shouldApplyPartial}
				spaceBetween={effect === "cube" ? 0 : gapBetweenSlide}
				pagination={paginationConfig}
				scrollbar={scrollbarConfig}
				slidesPerGroup={
					freeScroll
						? 1
						: effect === "cover"
						? slidePerView
						: isEffectSlide
						? slideGroupNumber
						: 1
				}
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
