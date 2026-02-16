import Marquee from "react-easy-marquee";
import PostCard from "../common/Postcard/PostCard";

export default function MarqueeCarousel({ attributes, posts }) {
	const { speed = 50, pauseOnHover = true } = attributes;

	if (!posts || posts.length === 0) {
		return (
			<div className="carousel-empty">
				<p>No posts available</p>
			</div>
		);
	}
	return (
		<div className="sp-smart-post-carousel sp-smart-post-block-wrapper">
			<Marquee
				speed={speed}
				pauseOnHover={pauseOnHover}
				reverse={true}
				gradient={false}
				height={350}
			>
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
