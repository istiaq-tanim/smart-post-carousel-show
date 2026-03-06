import { stringCapitalize } from "../../../utils";
import { useAttributes } from "../../hooks/useAttributes";
import useMetaData from "../../hooks/useMetaData";
import MultipleSelect from "../common/MultiSelect/MultiSelect";

function QueryBuilder() {
	const { attributes, setAttributes } = useAttributes();
	const { multiplePostType } = attributes;

	const { allPostTypes } = useMetaData(attributes, "editSite");

	const postTypeValues = Object.values(allPostTypes);
	const updatePostTypeOptions = postTypeValues?.map((singlePost, index) => ({
		id: index + 1,
		label: singlePost === "attachment" ? "Media" : stringCapitalize(singlePost),
		value: singlePost,
	}));

	const defaultPostType = [
		{ id: 1, label: "Posts", value: "post" },
		{ id: 2, label: "Pages", value: "page" },
	];

	const onPostTypeChangeHandler = (e) => {
		setAttributes({
			multiplePostType: e,
			taxonomies: [
				{
					id: 1,
					type: "",
					value: [],
					operator: "IN",
					initialOpen: true,
				},
			],
			catTabCategoryType: "",
		});
	};

	return (
		<>
			<MultipleSelect
				label="Post Types"
				value={multiplePostType}
				attributes={multiplePostType}
				onInputChange={() => {}}
				attributesKey="multiplePostType"
				setAttributes={setAttributes}
				onChange={(e) => onPostTypeChangeHandler(e)}
				items={
					updatePostTypeOptions?.length > 0
						? updatePostTypeOptions
						: defaultPostType
				}
			/>
		</>
	);
}

export default QueryBuilder;
