import { useBlockProps } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import "./editor.scss";
import { AttributesProvider, PanelProvider } from "../context";
import Inspector from "../components/Inspector/Inspector";
import MarqueeCarousel from "../components/MarqueCarousel/MarqueCarousel";
import SwiperCarousel from "../components/SwiperCarousel/SwiperCarousel";

export default function Edit({ attributes, setAttributes }) {
	const posts = useSelect((select) =>
		select("core").getEntityRecords(
			"postType",
			"post",
			{
				per_page: 10,
				_embed: ["author", "wp:term", "wp:featuredmedia"],
			},
			[],
		),
	);

	let content;

	if (!posts) {
		content = <p>Loading posts...</p>;
	} else if (posts.length === 0) {
		content = <p>No posts found.</p>;
	} else if (posts.length > 0 && attributes.carouselStyle === "standard") {
		content = (
			<div className="smart-post-carousel-swiper">
				<SwiperCarousel attributes={attributes} posts={posts} />
			</div>
		);
	} else if (posts.length > 0 && attributes.carouselStyle === "ticker") {
		content = <MarqueeCarousel attributes={attributes} posts={posts} />;
	}

	return (
		<AttributesProvider attributes={attributes} setAttributes={setAttributes}>
			<PanelProvider>
				<Inspector attributes={attributes} setAttributes={setAttributes} />
			</PanelProvider>

			{/* useBlockProps MUST be on a rendered DOM element */}
			<div {...useBlockProps()}>{content}</div>
		</AttributesProvider>
	);
}
