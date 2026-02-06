import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SwiperCarousel({ attributes, posts }) {
	const { slidesPerView, spaceBetween, autoplay } = attributes;

	return (
		<Swiper
			key={`${slidesPerView}-${spaceBetween}-${autoplay}`}
			modules={[Navigation, Pagination, Autoplay]}
			slidesPerView={2}
			spaceBetween={5}
			navigation
			pagination={{ clickable: true }}
			autoplay={{
				delay: 3000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			}}
		>
			{posts.map((post) => {
				const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
				return (
					<SwiperSlide key={post.id}>
						<article className="carousel-item">
							{image && <img src={image} alt={post.title.rendered} />}
							<h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
							<div
								dangerouslySetInnerHTML={{
									__html: post.excerpt.rendered,
								}}
							/>
						</article>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
}
