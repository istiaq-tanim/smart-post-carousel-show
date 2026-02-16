import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PostCard from "../common/Postcard/PostCard";
import { useDeviceType } from "../../hooks/useDevice";

export default function SwiperCarousel({ attributes, posts }) {
	const { columns, gap, autoPlay, delay, speed, direction } = attributes;
	const deviceType = useDeviceType();
	const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";

	const slidePerView = columns[normalizedDeviceType];
	const gapBetweenSlide = gap[normalizedDeviceType];

	const autoplayDelay = Number(delay) || 3000;
	const transitionSpeed = Number(speed) || 600;

	return (
		<Swiper
			modules={
				autoPlay ? [Navigation, Pagination, Autoplay] : [Navigation, Pagination]
			}
			slidesPerView={slidePerView}
			spaceBetween={gapBetweenSlide}
			navigation
			pagination={{ clickable: true }}
			autoplay={
				autoPlay
					? {
							delay: autoplayDelay,
							disableOnInteraction: false,
							pauseOnMouseEnter: true,
							reverseDirection: direction === "left" ? true : false,
					  }
					: false
			}
			loop={true}
			speed={transitionSpeed}
		>
			{posts.map((post) => {
				return (
					<SwiperSlide key={post.id}>
						<PostCard post={post} attributes={attributes}></PostCard>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
}
