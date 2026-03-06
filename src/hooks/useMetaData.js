import { useState, useEffect } from "@wordpress/element";

export const useMetaData = (attributes, setAttributes) => {
	const { postType, multiplePostType } = attributes;

	const [metaData, setMetaData] = useState({
		authors: [],
		authorList: [],
		allTaxonomies: [],
		postCount: 0,
		imageSizes: [],
		allPostTypes: {},
		allMetaKeys: [],
	});

	const queryData = {
		postType,
		multiplePostType,
	};

	const fetchMetaData = async () => {
		try {
			const data = new FormData();
			data.append("nonce", sp_smart_post_block_localize.nonce);
			data.append("action", "sp_meta_data_query");
			data.append("metaQueryData", JSON.stringify(queryData));

			const response = await fetch(sp_smart_post_block_localize.ajax_url, {
				method: "POST",
				body: data,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			const apiData = result?.data ?? result;

			const {
				taxonomies = [],
				authors = [],
				author_list = [],
				post_count = 0,
				image_sizes = [],
				all_post_type_list = {},
				all_meta_field_list = [],
			} = apiData;

			setMetaData({
				authors: authors,
				authorList: author_list,
				allTaxonomies: taxonomies,
				postCount: post_count,
				imageSizes: image_sizes,
				allPostTypes: all_post_type_list,
				allMetaKeys: all_meta_field_list,
			});
		} catch (error) {
			console.log("Error fetching metadata:", error.message);
		}
	};

	useEffect(() => {
		fetchMetaData();
	}, [JSON.stringify(queryData)]);

	return metaData;
};

export default useMetaData;
