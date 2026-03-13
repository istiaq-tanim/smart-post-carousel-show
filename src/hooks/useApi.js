import { useEffect, useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

function useApi(attributes) {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const currentPostId = useSelect(
		(select) => select("core/editor")?.getCurrentPostId() ?? 0,
	);

	const {
		numberOfSlides,
		postType,
		multiplePostType,
		quickQuery,
		offset,
		excludeAuthor,
		excludeTerm,
		includeOnlyPost,
		excludePost,
		excludeStickyPosts,
		excludeCurrentPosts,
		excludeProtectedPosts,
		excludePostWithoutImagePosts,
	} = attributes;

	useEffect(() => {
		setLoading(true);

		const queryData = {
			posts_per_page: numberOfSlides,
			postType: postType,
			multiplePostType: multiplePostType,
			quickQuery: quickQuery,
			offset: offset,
			excludeAuthor: excludeAuthor,
			excludeTerm: excludeTerm,
			includeOnlyPost: includeOnlyPost.map((p) => p.value),
			excludePost: excludePost,
			excludeStickyPosts,
			excludeCurrentPosts,
			postId: currentPostId,
			excludeProtectedPosts,
			excludePostWithoutImagePosts,
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
				if (res.success) setPosts(res.data.posts);
			})
			.catch((error) => console.error("Error:", error))
			.finally(() => setLoading(false));
	}, [
		numberOfSlides,
		postType,
		JSON.stringify(multiplePostType),
		quickQuery,
		offset,
		JSON.stringify(excludeAuthor),
		JSON.stringify(excludeTerm),
		JSON.stringify(includeOnlyPost),
		JSON.stringify(excludePost),
		excludeStickyPosts,
		excludeCurrentPosts,
		currentPostId,
		excludeProtectedPosts,
		excludePostWithoutImagePosts,
	]);

	return { posts, loading };
}

export default useApi;
