import { useEffect, useState } from "@wordpress/element";

function useApi(queryParams = { posts_per_page: 5 }) {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const formData = new FormData();
		formData.append("action", "sp_get_posts");
		formData.append("nonce", sp_smart_post_block_localize.nonce);
		formData.append("queryData", JSON.stringify(queryParams));

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
	}, [JSON.stringify(queryParams)]);

	return { posts, loading };
}

export default useApi;
