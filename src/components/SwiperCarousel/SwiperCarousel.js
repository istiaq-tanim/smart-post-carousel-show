import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PostCard from "../common/Postcard/PostCard";

export default function SwiperCarousel({ attributes, posts }) {
	const { slidesPerView = 2, spaceBetween = 8, autoplay = true } = attributes;

	return (
		<Swiper
			key={`${slidesPerView}-${spaceBetween}-${autoplay}`}
			modules={[Navigation, Pagination, Autoplay]}
			slidesPerView={5}
			spaceBetween={16}
			navigation
			pagination={{ clickable: true }}
			autoplay={{
				delay: 3000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			}}
			loop={true}
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
