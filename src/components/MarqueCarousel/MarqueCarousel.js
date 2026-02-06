import Marquee from "react-easy-marquee";
import "./marqueeCarousel.scss";

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
				height={250}
			>
				<div style={{ display: "flex" }}>
					{posts.map((post) => {
						const image =
							post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
							"http://localhost:10038/wp-content/plugins/smart-post-show-pro/public/assets/img/placeholder.png";

						return (
							<article key={post.id} className="carousel-item">
								{image ? (
									<img src={image} alt={post.title.rendered} />
								) : (
									<div className="carousel-item-placeholder">No Image</div>
								)}

								<h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

								{post.excerpt?.rendered && (
									<div
										className="carousel-excerpt"
										dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
									/>
								)}
							</article>
						);
					})}
				</div>
			</Marquee>
		</div>
	);
}
