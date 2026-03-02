import { TextControl } from "@wordpress/components";
import { useAttributes } from "../../hooks/useAttributes";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";

function General() {
	const { attributes, setAttributes } = useAttributes();
	return (
		<>
			<CustomToggleGroupControl
				attributes={attributes}
				label="Excerpt Type"
				attributesKey="excerptType"
				setAttributes={setAttributes}
				items={[
					{ label: "Full", value: "full" },
					{ label: "Limited", value: "limited" },
				]}
			></CustomToggleGroupControl>

			{attributes.excerptType === "limited" && (
				<>
					<CustomRangeControl
						label="Length"
						attributeKey="excerptLength"
						min={1}
						max={200}
						defaultValue={14}
						showUnit={true}
						showDevice={false}
						flat={true}
						options={["words", "char"]}
						unit={attributes.excerptLength}
					/>

					<TextControl
						label="Ellipsis Points Ending Excerpt"
						value={attributes.excerptEllipsis}
						onChange={(value) => setAttributes({ excerptEllipsis: value })}
						placeholder="..."
					/>
				</>
			)}
		</>
	);
}

export default General;
