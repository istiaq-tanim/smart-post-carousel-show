import { __ } from "@wordpress/i18n";
import { animationEffect } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import CustomSelection from "../common/CustomSelection/CustomSelection";
import CustomToggle from "../common/CustomToggle/CustomToggle";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";

function Slider() {
	const { attributes, setAttributes } = useAttributes();

	const { carouselStyle } = attributes;
	return (
		<>
			{/* Auto Play Section */}
			{carouselStyle === "standard" && (
				<CustomToggle
					label={__("AutoPlay", "smart-post-carousel")}
					value={attributes.autoPlay}
					attributesKey="autoPlay"
					setAttributes={setAttributes}
				/>
			)}
			{/* AutoPlay Delay*/}
			{carouselStyle === "standard" && (
				<CustomRangeControl
					label="AutoPlay Delay"
					attributeKey="delay"
					min={0}
					max={5000}
					defaultValue={2000}
					step={50}
					showDevice={false}
				></CustomRangeControl>
			)}
			{/* Carousel Speed */}
			<CustomRangeControl
				label="Carousel Speed"
				attributeKey="speed"
				min={0}
				max={5000}
				defaultValue={600}
				step={50}
				showDevice={false}
			></CustomRangeControl>

			{/* Content Alignment Section */}

			<CustomToggleGroupControl
				label={__("Content Alignment", "smart-post-carousel")}
				attributes={attributes}
				attributesKey="direction"
				setAttributes={setAttributes}
				items={[
					{ label: "Right to Left", value: "right" },
					{ label: "Left to Right", value: "left" },
				]}
			></CustomToggleGroupControl>

			{/*Slide to Scroll Section  */}
			<CustomRangeControl
				label="Slide to Scroll"
				attributeKey="speed"
				min={0}
				max={100}
				defaultValue={1}
				showReset={false}
				showUnit={false}
			></CustomRangeControl>

			{/* Preloader Section */}

			<CustomToggle
				label={__("Pause on Hover", "smart-post-carousel")}
				value={attributes.onHover}
				attributesKey="onHover"
				setAttributes={setAttributes}
			/>

			{/* Link Open In Section */}

			{carouselStyle === "standard" && (
				<CustomSelection
					label="Link Open In"
					options={animationEffect}
					attributeKey="animationEffect"
				></CustomSelection>
			)}

			{/* Adaptive Height Section */}

			{carouselStyle === "standard" && (
				<CustomToggle
					label={__("Adaptive Height", "smart-post-carousel")}
					value={attributes.adaptiveHeight}
					attributesKey="adaptiveHeight"
					setAttributes={setAttributes}
				/>
			)}
			{/* Infinite Loop */}
			{carouselStyle === "standard" && (
				<CustomToggle
					label={__("Infinite Loop", "smart-post-carousel")}
					value={attributes.infiniteLoop}
					attributesKey="infiniteLoop"
					setAttributes={setAttributes}
				/>
			)}
			{/* Tab and Key Navigation */}
			{carouselStyle === "standard" && (
				<CustomToggle
					label={__("Tab and Key Navigation", "smart-post-carousel")}
					value={attributes.keyNavigation}
					attributesKey="keyNavigation"
					setAttributes={setAttributes}
				/>
			)}
			{/* MouseWheel Control */}
			{carouselStyle === "standard" && (
				<CustomToggle
					label={__("MouseWheel Control", "smart-post-carousel")}
					value={attributes.mouseWheelControl}
					attributesKey="mouseWheelControl"
					setAttributes={setAttributes}
				/>
			)}
			{/* Free Scroll Mode */}
			{carouselStyle === "standard" && (
				<CustomToggle
					label={__("Free Scroll Mode", "smart-post-carousel")}
					value={attributes.freeScroll}
					attributesKey="freeScroll"
					setAttributes={setAttributes}
				/>
			)}
			{/* Navigation Arrow */}
			{carouselStyle === "standard" && (
				<CustomToggle
					label={__("Navigation Arrow", "smart-post-carousel")}
					value={attributes.navigationArrow}
					attributesKey="navigationArrow"
					setAttributes={setAttributes}
				/>
			)}
			{/* Pagination Dots */}
			{carouselStyle === "standard" && (
				<CustomToggle
					label={__("Navigation Arrow", "smart-post-carousel")}
					value={attributes.paginationDots}
					attributesKey="paginationDots"
					setAttributes={setAttributes}
				/>
			)}
		</>
	);
}

export default Slider;
