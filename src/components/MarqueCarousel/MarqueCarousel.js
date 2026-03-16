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

	const animationDuration = `${Math.round(3000 / speed)}s`;

	return (
		<div className="sp-smart-post-carousel-marquee-wrapper">
			<div
				className="sp-smart-post-carousel-marquee-track"
				style={{
					"--duration": animationDuration,
					"--direction": direction === "right" ? "normal" : "reverse",
				}}
			>
				{[...posts, ...posts].map((post, idx) => (
					<div key={idx} className="sp-smart-post-carousel-marquee-item">
						<PostCard post={post} attributes={attributes} />
					</div>
				))}
			</div>
		</div>
	);
}
