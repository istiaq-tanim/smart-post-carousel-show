import { useEffect, useState } from "@wordpress/element";

function useApi(attributes) {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const { numberOfSlides, postType, multiplePostType, quickQuery } = attributes;

	useEffect(() => {
		setLoading(true);

		const queryData = {
			posts_per_page: numberOfSlides,
			postType: postType,
			multiplePostType: multiplePostType,
			quickQuery,
		};

		const formData = new FormData();
		formData.append("action", "sp_query_content");
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
			.catch((error) => console.error("Error:", error))
			.finally(() => setLoading(false));

		// Dependencies — watch each value individually, not as stringified object
	}, [numberOfSlides, postType, JSON.stringify(multiplePostType), quickQuery]);

	return { posts, loading };
}

export default useApi;
