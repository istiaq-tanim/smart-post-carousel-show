import { useRef, useEffect, useMemo } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PostCard from "../common/Postcard/PostCard";
import { useDeviceType } from "../../hooks/useDevice";
import { arrayChunk, CHUNKED_EFFECTS, EFFECT_MAP } from "../../../utils";
import SwiperNavigationButton from "./SwiperNavigationButton";

const EFFECT_MODULES = {
	fade: EffectFade,
	cube: EffectCube,
	flip: EffectFlip,
	cover: EffectCoverflow,
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
		iconSize,
	} = attributes;

	const swiperRef = useRef(null);
	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";

	const slidePerView = columns[normalizedDeviceType] || 1;
	const gapBetweenSlide = gap[normalizedDeviceType] || 8;
	const slideGroupNumber = slideGroup[normalizedDeviceType] || 1;

	const autoplayDelay = Number(delay) || 3000;
	const transitionSpeed = Number(speed) || 600;

	const isChunkedEffect = CHUNKED_EFFECTS.includes(effect);
	const isEffectSlide = !Object.keys(EFFECT_MODULES).includes(effect);

	const swiperNextButtonRef = useRef(null);
	const swiperPrevButtonRef = useRef(null);

	// Chunk posts for fade/cube/flip
	const allPosts = useMemo(() => {
		if (isChunkedEffect) {
			return arrayChunk(posts, slidePerView);
		}
		return posts;
	}, [posts, slidePerView, isChunkedEffect]);

	// Build modules based on effect and autoplay
	const swiperModules = useMemo(() => {
		const base = [
			Navigation,
			Pagination,
			Keyboard,
			Mousewheel,
			FreeMode,
			Autoplay,
		];
		if (EFFECT_MODULES[effect]) base.push(EFFECT_MODULES[effect]);
		return base;
	}, [autoPlay, effect]);

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

	const swiperKey = `${slidePerView}-${gapBetweenSlide}-${slideGroupNumber}-${effect}-${adaptiveHeight}-${keyNavigation}-${mouseWheelControl}-${freeScroll}-${navigationArrow}-${paginationDots}`;

	useEffect(() => {
		if (swiperRef.current?.autoplay) {
			swiperRef.current.params.autoplay.pauseOnMouseEnter = onHover;
		}
	}, [onHover]);

	useEffect(() => {
		if (!swiperRef.current) return;
		if (!swiperRef.current.autoplay) return;
		if (autoPlay) {
			swiperRef.current.autoplay.start();
		} else {
			swiperRef.current.autoplay.stop();
		}
	}, [autoPlay]);

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
		<div className="sp-smart-post-carousel">
			<Swiper
				key={swiperKey}
				onSwiper={(swiper) => (swiperRef.current = swiper)}
				modules={swiperModules}
				autoHeight={adaptiveHeight || false}
				slidesPerView={
					isChunkedEffect ? 1 : effect === "cover" ? slidePerView : slidePerView
				}
				spaceBetween={effect === "cube" ? 0 : gapBetweenSlide}
				navigation={{
					nextEl: swiperNextButtonRef.current,
					prevEl: swiperPrevButtonRef.current,
					enabled: true,
				}}
				pagination={paginationDots ? { clickable: true } : false}
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
					keyNavigation
						? {
								enabled: true,
								onlyInViewport: true,
						  }
						: false
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
				></SwiperNavigationButton>
			)}
		</div>
	);
}
