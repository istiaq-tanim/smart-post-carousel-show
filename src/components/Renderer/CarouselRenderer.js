import SwiperCarousel from "../SwiperCarousel/SwiperCarousel";
import MarqueeCarousel from "../MarqueCarousel/MarqueCarousel";

function CarouselRenderer({ carouselStyle, posts, attributes }) {
	const carouselComponents = {
		standard: SwiperCarousel,
		ticker: MarqueeCarousel,
	};

	const CarouselComponent = carouselComponents[carouselStyle];

	if (!CarouselComponent) {
		return null;
	}

	return <CarouselComponent attributes={attributes} posts={posts} />;
}

export default CarouselRenderer;
