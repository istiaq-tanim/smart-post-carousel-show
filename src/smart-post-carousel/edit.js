import { useBlockProps } from "@wordpress/block-editor";
import Inspector from "../components/Inspector/Inspector";
import CarouselRenderer from "../components/Renderer/CarouselRenderer";
import { AttributesProvider, PanelProvider } from "../context";
import useApi from "../hooks/useApi";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { hideOnDesktop, hideOnTablet, hideOnMobile } = attributes;
	const blockProps = useBlockProps();
	const { posts, loading } = useApi(attributes);

	const renderContent = () => {
		if (loading) {
			return <p>Loading posts...</p>;
		}
		if (!posts || posts.length === 0) {
			return <p>No posts found.</p>;
		}

		return (
			// Uses Shared Renderer for Swiper and Marquee Carousel
			<CarouselRenderer
				carouselStyle={attributes.carouselStyle}
				attributes={attributes}
				posts={posts}
			></CarouselRenderer>
		);
	};

	return (
		<div {...blockProps}>
			<AttributesProvider attributes={attributes} setAttributes={setAttributes}>
				<PanelProvider>
					<Inspector attributes={attributes} setAttributes={setAttributes} />
				</PanelProvider>

				<div
					className={[
						"sp-carousel-content-wrapper",
						hideOnDesktop ? "hide-desktop" : "",
						hideOnTablet ? "hide-tablet" : "",
						hideOnMobile ? "hide-mobile" : "",
					]
						.filter(Boolean)
						.join(" ")}
				>
					{renderContent()}
				</div>
			</AttributesProvider>
		</div>
	);
}
