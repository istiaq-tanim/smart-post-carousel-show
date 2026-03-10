import { __ } from "@wordpress/i18n";
import { stringCapitalize } from "../../../utils";
import { quickQueryOptions } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import useMetaData from "../../hooks/useMetaData";
import CustomSelection from "../common/CustomSelection/CustomSelection";
import MultipleSelect from "../common/MultiSelect/MultiSelect";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import { TextControl } from "@wordpress/components";

function DefaultQueryBuilder() {
	const { attributes, setAttributes } = useAttributes();
	const { multiplePostType, noPostLabel } = attributes;

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

			<CustomSelection
				label={__("Quick Query", "smart-post-carousel")}
				options={quickQueryOptions}
				attributeKey="quickQuery"
				inline={false}
			/>

			<CustomRangeControl
				label={__("Offset", "smart-post-carousel")}
				attributeKey="offset"
				min={0}
				max={100}
				defaultValue={0}
				showUnit={false}
				step={1}
			></CustomRangeControl>

			<TextControl
				label="No Result Found Label"
				value={noPostLabel}
				onChange={(value) => setAttributes({ noPostLabel: value })}
				placeholder="No post found"
			/>
		</>
	);
}

export default DefaultQueryBuilder;
