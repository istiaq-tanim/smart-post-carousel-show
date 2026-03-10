import useAllPost from "../../hooks/useAllPost";
import useMetaData from "../../hooks/useMetaData";
import MultipleSelect from "../common/MultiSelect/MultiSelect";

function CommonQueryBuilder({ attributes, setAttributes }) {
	const { authorList, allTaxonomies } = useMetaData(attributes, "editSite");
	const { posts } = useAllPost(attributes);
	const { excludeAuthor, excludeTerm, includeOnlyPost, excludePost } =
		attributes;

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
		</div>
	);
}

export default CommonQueryBuilder;
