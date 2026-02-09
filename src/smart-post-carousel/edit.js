import { useBlockProps } from "@wordpress/block-editor";
import { AttributesProvider, PanelProvider } from "../context";
import Inspector from "../components/Inspector/Inspector";
import CarouselRenderer from "../components/Renderer/CarouselRenderer";
import "./editor.scss";
import useApi from "../hooks/useApi";

export default function Edit({ attributes, setAttributes }) {
	//using Custom Hooks to Fetching posts

	const { posts, loading } = useApi();

	const renderContent = () => {
		if (loading) {
			return <p>Loading posts...</p>;
		}
		if (!posts && posts.length === 0) {
			return <p>No posts found.</p>;
		}

		return (
			// Use Shared Renderer for Swiper and Marquee Carousel
			<CarouselRenderer
				carouselStyle={attributes.carouselStyle}
				attributes={attributes}
				posts={posts}
			></CarouselRenderer>
		);
	};

	return (
		<AttributesProvider attributes={attributes} setAttributes={setAttributes}>
			<PanelProvider>
				<Inspector attributes={attributes} setAttributes={setAttributes} />
			</PanelProvider>
			<div {...useBlockProps()}>{renderContent()}</div>
		</AttributesProvider>
	);
}
