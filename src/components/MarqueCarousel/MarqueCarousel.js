import Marquee from "react-easy-marquee";
import PostCard from "../common/Postcard/PostCard";

export default function MarqueeCarousel({ attributes, posts }) {
	const { speed, direction } = attributes;

	if (!posts || posts.length === 0) {
		return (
			<div className="carousel-empty">
				<p>No posts available</p>
			</div>
		);
	}
	return (
		<div className="sp-smart-post-carousel sp-smart-post-block-wrapper">
			<Marquee duration={speed} reverse={direction === "left"} height={350}>
				<div style={{ display: "flex" }}>
					{posts.map((post, idx) => (
						<div key={idx} style={{ marginRight: "8px" }}>
							<PostCard post={post} attributes={attributes} />
						</div>
					))}
				</div>
			</Marquee>
		</div>
	);
}
