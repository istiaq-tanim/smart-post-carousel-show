import { __ } from "@wordpress/i18n";
import { LayoutItems } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import CustomToggle from "../common/CustomToggle/CustomToggle";
import Layouts from "../common/Layouts/Layouts";
import ContentOrientations from "./ContentOrientations";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";
import {
	AlignCenter,
	AlignLeft,
	AlignRight,
} from "../../smart-post-carousel/assets/icon";

function General() {
	const { attributes, setAttributes } = useAttributes();

	const orientationHandler = (newValue) => {
		setAttributes({ contentOrientation: newValue });
	};

	return (
		<>
			{/* Layouts Section */}
			<Layouts
				attributes={attributes}
				setAttributes={setAttributes}
				attributesKey={"carouselStyle"}
				items={LayoutItems}
			></Layouts>
			{/* Partial Slide View*/}
			<CustomToggle
				label={__("Partial Slide View", "smart-post-carousel")}
				value={attributes.partialView}
				attributesKey="partialView"
				setAttributes={setAttributes}
			/>
			{/* Content Orientations Section */}
			<ContentOrientations
				label="Content Orientation"
				attributes={attributes}
				setAttributes={setAttributes}
				attributesKey={"contentOrientation"}
				onChange={orientationHandler}
			></ContentOrientations>

			{/* Columns Section */}
			<CustomRangeControl
				label="Columns"
				attributeKey="columns"
				min={0}
				max={10}
				defaultValue={3}
			></CustomRangeControl>

			{/* Slider Control Section */}
			<CustomRangeControl
				label="Number of Slides"
				attributeKey="slides"
				min={0}
				max={10}
				defaultValue={3}
				showDevice={false}
			></CustomRangeControl>

			{/* Height Section */}
			<CustomRangeControl
				label="Height"
				attributeKey="gap"
				min={0}
				max={1200}
				defaultValue={642}
			></CustomRangeControl>

			{/* Gap Section */}
			<CustomRangeControl
				label="Gap"
				attributeKey="gap"
				min={0}
				max={100}
				defaultValue={24}
			></CustomRangeControl>

			{/* Alignment Section */}

			<CustomToggleGroupControl
				label={__("Content Alignment", "smart-post-carousel")}
				attributes={attributes}
				attributesKey="contentAlignment"
				setAttributes={setAttributes}
				items={[
					{ label: <AlignLeft />, value: "left" },
					{ label: <AlignCenter />, value: "center" },
					{ label: <AlignRight />, value: "right" },
				]}
			></CustomToggleGroupControl>
		</>
	);
}

export default General;
