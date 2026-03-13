import { __ } from "@wordpress/i18n";
import useAllPost from "../../hooks/useAllPost";
import useMetaData from "../../hooks/useMetaData";
import CustomToggle from "../common/CustomToggle/CustomToggle";
import MultipleSelect from "../common/MultiSelect/MultiSelect";

function CommonQueryBuilder({ attributes, setAttributes }) {
	const { authorList, allTaxonomies } = useMetaData(attributes, "editSite");
	const { posts } = useAllPost(attributes);
	const {
		excludeAuthor,
		excludeTerm,
		includeOnlyPost,
		excludePost,
		excludeStickyPosts,
		excludeCurrentPosts,
		excludeProtectedPosts,
		excludePostWithoutImagePosts,
	} = attributes;

	let allTerms = [];
	allTaxonomies.forEach(
		(item) => (allTerms = [...allTerms, ...item.terms_items]),
	);

	return (
		<div>
			<MultipleSelect
				label="Include Only Posts"
				attributesKey="includeOnlyPost"
				attributes={includeOnlyPost.map((p) => p.value)}
				items={posts}
				setAttributes={setAttributes}
				onChange={(selected) =>
					setAttributes({
						includeOnlyPost: selected
							? selected.map((s) => ({
									label: s.label,
									value: s.value,
							  }))
							: [],
					})
				}
				value={posts.filter((o) =>
					includeOnlyPost.some((p) => p.value === o.value),
				)}
			/>

			{/* Exclude Posts */}
			<MultipleSelect
				label="Exclude Posts"
				attributesKey="excludePost"
				attributes={excludePost.map((p) => p.value)}
				items={posts}
				setAttributes={setAttributes}
				onChange={(selected) =>
					setAttributes({
						excludePost: selected
							? selected.map((s) => ({
									label: s.label,
									value: s.value,
							  }))
							: [],
					})
				}
				value={posts.filter((o) =>
					excludePost.some((p) => p.value === o.value),
				)}
			/>
			{/* Multi Select for Exclude AUthor */}
			<MultipleSelect
				label="Exclude Term"
				attributesKey="excludeTerm"
				attributes={excludeTerm.map((t) => t.value)}
				items={allTerms}
				setAttributes={setAttributes}
				onChange={(selected) =>
					setAttributes({
						excludeTerm: selected
							? selected.map((s) => ({
									label: s.label,
									value: s.value,
							  }))
							: [],
					})
				}
			/>
			{/* Multi Select for Exclude Author */}
			<MultipleSelect
				label="Exclude Author"
				attributesKey="excludeAuthor"
				attributes={excludeAuthor.map((a) => a.value)}
				items={authorList}
				setAttributes={setAttributes}
				objectData={true}
			/>

			{/* Toggle Handler For Sticky Posts */}

			<CustomToggle
				label={__("Exclude Sticky Posts", "smart-post-carousel")}
				value={excludeStickyPosts}
				attributesKey="excludeStickyPosts"
				setAttributes={setAttributes}
			/>
			{/* Toggle Handler For Current Posts */}
			<CustomToggle
				label={__("Exclude Current Posts", "smart-post-carousel")}
				value={excludeCurrentPosts}
				attributesKey="excludeCurrentPosts"
				setAttributes={setAttributes}
			/>

			{/* Toggle Handler For Current Posts */}
			<CustomToggle
				label={__("Exclude Password Protect Posts", "smart-post-carousel")}
				value={excludeProtectedPosts}
				attributesKey="excludeProtectedPosts"
				setAttributes={setAttributes}
			/>
			{/* Toggle Handler For Without Image */}
			<CustomToggle
				label={__("Exclude Posts without Image", "smart-post-carousel")}
				value={excludePostWithoutImagePosts}
				attributesKey="excludePostWithoutImagePosts"
				setAttributes={setAttributes}
			/>
		</div>
	);
}

export default CommonQueryBuilder;
