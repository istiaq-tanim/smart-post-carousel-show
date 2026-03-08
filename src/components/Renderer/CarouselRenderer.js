import MarqueeCarousel from "../MarqueCarousel/MarqueCarousel";
import SwiperCarousel from "../SwiperCarousel/SwiperCarousel";

function CarouselRenderer({ carouselStyle, posts, attributes }) {
	const carouselComponents = {
		standard: SwiperCarousel,
		ticker: MarqueeCarousel,
	};

	console.log(attributes.taxonomyBorderWidthNormal, "hello")

	const CarouselComponent = carouselComponents[carouselStyle];

	if (!CarouselComponent) {
		return null;
	}

	return <CarouselComponent attributes={attributes} posts={posts} />;
}

export default CarouselRenderer;
