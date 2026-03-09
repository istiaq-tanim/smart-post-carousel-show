import { useEffect, useState } from "@wordpress/element";

function useApi(attributes) {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const { numberOfSlides, postType } = attributes;

	const dependencies = {
		posts_per_page: numberOfSlides,
	};

	const queryData = {
		...dependencies,
	};

	useEffect(() => {
		const formData = new FormData();
		formData.append("action", "sp_get_posts");
		formData.append("nonce", sp_smart_post_block_localize.nonce);
		formData.append("queryData", JSON.stringify(queryData));

		fetch(sp_smart_post_block_localize.ajax_url, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.success) {
					setPosts(res.data.posts);
				}
			})
			.catch((error) => {
				console.error("Error fetching posts:", error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [JSON.stringify(queryData)]);

	return { posts, loading };
}

export default useApi;
