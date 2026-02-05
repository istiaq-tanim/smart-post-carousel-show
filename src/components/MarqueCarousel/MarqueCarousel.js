import Marquee from "react-fast-marquee";

export default function MarqueeCarousel({ attributes, posts }) {
	const { speed = 50, direction = "left", pauseOnHover = true } = attributes;
	console.log(posts);

	return (
		<Marquee speed={speed} direction={direction} pauseOnHover={pauseOnHover}>
			{posts.map((post) => (
				<div key={post.id} className="marquee-item">
					{post.featured_media && (
						<img
							src={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
							alt={post.title.rendered}
						/>
					)}
					<h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
				</div>
			))}
		</Marquee>
	);
}
