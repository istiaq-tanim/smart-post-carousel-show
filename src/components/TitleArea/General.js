import { __ } from "@wordpress/i18n";
import { badgePosition } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import CustomSelection from "../common/CustomSelection/CustomSelection";
import CustomToggle from "../common/CustomToggle/CustomToggle";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";
import Divider from "../common/Divider/Divider";

const tagDefaultSizes = {
	h1: 44,
	h2: 32,
	h3: 24,
	h4: 20,
	h5: 22,
	h6: 20,
	p: 24,
};

function General() {
	const { attributes, setAttributes } = useAttributes();
	return (
		<>
			{/* Title Tag Select */}
			<CustomToggleGroupControl
				label="Title Tag"
				attributes={attributes}
				attributesKey="titleTag"
				setAttributes={(newAttrs) => {
					const newTag = newAttrs.titleTag;
					setAttributes({
						titleTag: newTag,
						titleTypo: {
							...attributes.titleTypo,
							fontSize: tagDefaultSizes[newTag] ?? 16,
						},
					});
				}}
				items={[
					{ label: "H1", value: "h1" },
					{ label: "H2", value: "h2" },
					{ label: "H3", value: "h3" },
					{ label: "H4", value: "h4" },
					{ label: "H5", value: "h5" },
					{ label: "H6", value: "h6" },
					{ label: "P", value: "p" },
				]}
			/>

			{/* Title Display Type */}

			<CustomToggleGroupControl
				attributes={attributes}
				label="Title Display Type"
				attributesKey="titleType"
				setAttributes={setAttributes}
				items={[
					{ label: "Full", value: "full" },
					{ label: "Limited", value: "limited" },
				]}
			></CustomToggleGroupControl>

			{/* Title Display based on Char and Words */}
			{attributes.titleType === "limited" && (
				<>
					<CustomRangeControl
						label="Length"
						attributeKey="titleLength"
						nestedKey="value"
						min={1}
						max={50}
						defaultValue={10}
						showUnit={true}
						showDevice={false}
						flat={true}
						options={["words", "char"]}
						unit={attributes.titleLength.unit}
					/>
				</>
			)}
			<Divider top="12px"></Divider>

			{/* Badges Toggler */}

			<CustomToggle
				label={__("Post Badges", "smart-post-carousel")}
				value={attributes.showBadges}
				attributesKey="showBadges"
				setAttributes={setAttributes}
			/>

			{attributes.showBadges && (
				<>
					<CustomSelection
						label={__("Badge Display Position", "smart-post-carousel")}
						options={badgePosition}
						attributeKey="badgePosition"
						inline={false}
					/>

					<CustomRangeControl
						label={__("Gap Between Badges", "smart-post-carousel")}
						attributeKey="badgesGap"
						min={0}
						max={24}
						defaultValue={5}
						showUnit={true}
						step={1}
					></CustomRangeControl>
				</>
			)}
		</>
	);
}

export default General;
