import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SwiperCarousel({ attributes, posts }) {
	const { slidesPerView = 3, spaceBetween = 20, autoplay = true } = attributes;
	console.log(posts);

	return (
		<Swiper
			modules={[Navigation, Pagination, Autoplay]}
			spaceBetween={spaceBetween}
			slidesPerView={slidesPerView}
			navigation
			pagination={{ clickable: true }}
			autoplay={autoplay ? { delay: 3000 } : false}
		>
			{posts.map((post) => {
				const featuredImage = post._embedded?.["wp:term"]?.[0]?.source_url;

				return (
					<SwiperSlide key={post.id}>
						<div className="carousel-item">
							{featuredImage && (
								<img src={featuredImage} alt={post.title.rendered} />
							)}
							<h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
							<div
								dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
							/>
						</div>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
}
