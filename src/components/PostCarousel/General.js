import { __ } from "@wordpress/i18n";
import { LayoutItems, linkOpen } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import {
	AlignCenter,
	AlignLeft,
	AlignRight,
} from "../../smart-post-carousel/assets/icon";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import CustomSelection from "../common/CustomSelection/CustomSelection";
import CustomToggle from "../common/CustomToggle/CustomToggle";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";
import Layouts from "../common/Layouts/Layouts";
import ContentOrientations from "./ContentOrientations";

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
				showUnit={false}
			></CustomRangeControl>

			{/* Slider Control Section */}
			<CustomRangeControl
				label="Number of Slides"
				attributeKey="numberOfSlides"
				min={0}
				max={10}
				defaultValue={3}
				showDevice={false}
				showUnit={false}
			></CustomRangeControl>

			{/* Height Section */}
			<CustomRangeControl
				label="Height"
				attributeKey="height"
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
					{ label: <AlignLeft />, value: "flex-start" },
					{ label: <AlignCenter />, value: "center" },
					{ label: <AlignRight />, value: "flex-end" },
				]}
			></CustomToggleGroupControl>

			{/* Link Open In Section */}

			<CustomSelection
				label="Link Open In"
				options={linkOpen}
				attributeKey="linkOpen"
				inline={false}
			></CustomSelection>

			{/* Preloader Section */}

			<CustomToggle
				label={__("Preloader", "smart-post-carousel")}
				value={attributes.preloader}
				attributesKey="preloader"
				setAttributes={setAttributes}
			/>
			{/* Enable Equal Height Section */}
			<CustomToggle
				label={__("Enable Equal Height", "smart-post-carousel")}
				value={attributes.equalHeight}
				attributesKey="equalHeight"
				setAttributes={setAttributes}
			/>
		</>
	);
}

export default General;
