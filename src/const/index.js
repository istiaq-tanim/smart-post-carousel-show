import { __ } from "@wordpress/i18n";
import {
	ArrowMinimal,
	ArrowOutline,
	ArrowSolid,
	ChevronBold,
	ChevronBorderLine,
	ChevronOutline,
	ChevronSolid,
	DoubleChevron,
	DoubleChevronOutline,
	TriangleOutline,
} from "../smart-post-carousel/assets/arrowIcons";
import {
	CarouselStandardIcon,
	CarouselTickerIcon,
} from "../smart-post-carousel/assets/icon";
import {
	OrientationFourIcon,
	OrientationOneIcon,
	OrientationThreeIcon,
	OrientationTwoIcon,
} from "../smart-post-carousel/assets/orientationIcon";

export const LayoutItems = [
	{
		icon: (activeValue) => {
			return (
				<CarouselStandardIcon
					value={activeValue.carouselStyle === "standard"}
				/>
			);
		},
		label: "Standard",
		value: "standard",
	},
	{
		icon: (activeValue) => {
			return (
				<CarouselTickerIcon value={activeValue.carouselStyle === "ticker"} />
			);
		},
		label: "Ticker",
		value: "ticker",
	},
];

export const OrientationItems = [
	{
		icon: (activeValue) => {
			return (
				<OrientationOneIcon
					value={activeValue.contentOrientation === "orientation_one"}
				/>
			);
		},
		value: "orientation_one",
	},
	{
		icon: (activeValue) => {
			return (
				<OrientationTwoIcon
					value={activeValue.contentOrientation === "orientation_two"}
				/>
			);
		},
		value: "orientation_two",
	},
	{
		icon: (activeValue) => {
			return (
				<OrientationThreeIcon
					value={activeValue.contentOrientation === "orientation_three"}
				/>
			);
		},
		value: "orientation_three",
	},
	{
		icon: (activeValue) => {
			return (
				<OrientationFourIcon
					value={activeValue.contentOrientation === "orientation_four"}
				/>
			);
		},
		value: "orientation_four",
	},
];

export const linkOpen = [
	{
		label: "Current Tab",
		value: "currentTab",
	},
	{
		label: "New tab",
		value: "newTab",
	},
];
export const animationEffect = [
	{
		label: "Slide",
		value: "slide",
	},
	{
		label: "Coverflow",
		value: "cover",
	},
	{
		label: "Fade",
		value: "fade",
	},
	{
		label: "Cube",
		value: "cube",
	},
	{
		label: "Flip",
		value: "flip",
	},
];

export const arrowIcons = {
	"chevron-solid": ChevronSolid,
	"chevron-outline": ChevronOutline,
	"chevron-bold": ChevronBold,
	"double-chevron": DoubleChevron,
	"arrow-solid": ArrowSolid,
	"arrow-outline": ArrowOutline,
	"arrow-minimal": ArrowMinimal,
	"chevron-border-line": ChevronBorderLine,
	"double-chevron-outline": DoubleChevronOutline,
	"triangle-outline": TriangleOutline,
};

export const arrowIconOptions = [
	{
		label: __("Chevron Solid", "smart-post-carousel"),
		value: "chevron-solid",
		icon: <ChevronSolid />,
	},
	{
		label: __("Chevron Outline", "smart-post-carousel"),
		value: "chevron-outline",
		icon: <ChevronOutline />,
	},
	{
		label: __("Chevron Bold", "smart-post-carousel"),
		value: "chevron-bold",
		icon: <ChevronBold />,
	},
	{
		label: __("Double Chevron", "smart-post-carousel"),
		value: "double-chevron",
		icon: <DoubleChevron />,
	},
	{
		label: __("Arrow Solid", "smart-post-carousel"),
		value: "arrow-solid",
		icon: <ArrowSolid />,
	},
	{
		label: __("Arrow Outline", "smart-post-carousel"),
		value: "arrow-outline",
		icon: <ArrowOutline />,
	},
	{
		label: __("Arrow Minimal", "smart-post-carousel"),
		value: "arrow-minimal",
		icon: <ArrowMinimal />,
	},
	{
		label: __("Chevron Border Line", "smart-post-carousel"),
		value: "chevron-border-line",
		icon: <ChevronBorderLine />,
	},
	{
		label: __("Double Chevron Outline", "smart-post-carousel"),
		value: "double-chevron-outline",
		icon: <DoubleChevronOutline />,
	},
	{
		label: __("Triangle Outline", "smart-post-carousel"),
		value: "triangle-outline",
		icon: <TriangleOutline />,
	},
];
