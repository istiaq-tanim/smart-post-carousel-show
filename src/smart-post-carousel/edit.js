import { useBlockProps } from "@wordpress/block-editor";
import Inspector from "../components/Inspector/Inspector";
import CarouselRenderer from "../components/Renderer/CarouselRenderer";
import { AttributesProvider, PanelProvider } from "../context";
import useApi from "../hooks/useApi";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	//using Custom Hooks to Fetching posts

	const { numberOfSlides } = attributes;

	const blockProps = useBlockProps();
	const { posts, loading } = useApi({ posts_per_page: numberOfSlides });

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

				{renderContent()}
			</AttributesProvider>
		</div>
	);
}
