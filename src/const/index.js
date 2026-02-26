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
import {
	DotsPagination,
	FractionPagination,
	NumbersPagination,
	ScrollbarPagination,
	StrokesPagination,
} from "../smart-post-carousel/assets/paginationIcon";
import {
	BasicOutline,
	Circle,
	Female,
	Minimal,
	Outline,
	Rounded,
	UserAuthor,
	UserSolid,
} from "../smart-post-carousel/assets/userIcon";

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

export const authorDisplayStyle = [
	{
		disabled: true,
		label: "Select an Option",
		value: "",
	},
	{
		label: "Show Name",
		value: "name",
	},
	{
		label: "Show Gravatar",
		value: "gravatar",
	},
	{
		label: "Show Name with Gravatar",
		value: "nameGravatar",
	},
	{
		label: "Author Name with Icon",
		value: "iconName",
	},
];
export const dateFormat = [
	{
		disabled: true,
		label: "Select Date Format",
		value: "",
	},
	{
		label: "Default",
		value: "default",
	},
	{
		label: "Time Ago (Human Time)",
		value: "timeAgo",
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

// Select Options for navigation Arrow Style

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

// Select Options for Pagination Dot Style

export const paginationDotsOptions = [
	{ label: "Dots", value: "dots", icon: <DotsPagination /> },
	{
		label: "Strokes",
		value: "lines",
		icon: <StrokesPagination />,
	},
	{
		label: "Scrollbar",
		value: "progressbar",
		icon: <ScrollbarPagination />,
	},
	{
		label: "Fraction",
		value: "fraction",
		icon: <FractionPagination />,
	},
	{
		label: "Numbers",
		value: "numbers",
		icon: <NumbersPagination />,
	},
];

export const colorConfig = {
	normal: {
		label: "Color",
		attributeKey: "iconColor",
		defaultValue: "#ffffff",
	},
	hover: {
		label: "Color",
		attributeKey: "iconHoverColor",
		defaultValue: "#ffffff",
	},
};
export const backGroundColorConfig = {
	normal: {
		label: "Background Color",
		attributeKey: "iconBackGroundColor",
		defaultValue: "#4e4f52",
	},
	hover: {
		label: "Hover Background Color",
		attributeKey: "iconBackGroundHoverColor",
		defaultValue: "#4e6e3e",
	},
};

// Render Bullet Type Pagination

export const getRenderBullet = (paginationStyle) => {
	switch (paginationStyle) {
		case "lines":
			return (index, className) =>
				`<span class="${className} sp-pagination-line"></span>`;
		case "numbers":
			return (index, className) =>
				`<span class="${className} sp-pagination-number">${index + 1}</span>`;
		case "dots":
		default:
			return (index, className) =>
				`<span class="${className} sp-pagination-dot"></span>`;
	}
};

export const userIcons = [
	{
		label: "Outline",
		value: "outline",
		icon: <Outline />,
	},
	{
		label: "Basic Outline",
		value: "basic-outline",
		icon: <BasicOutline />,
	},
	{
		label: "Solid",
		value: "user-solid",
		icon: <UserSolid />,
	},
	{
		label: "Profile Rounded",
		value: "rounded",
		icon: <Rounded />,
	},
	{
		label: "Profile Circle",
		value: "circle",
		icon: <Circle />,
	},
	{
		label: "Female",
		value: "female",
		icon: <Female />,
	},
	{
		label: "Author",
		value: "author",
		icon: <UserAuthor />,
	},
	{
		label: "Minimal",
		value: "minimal",
		icon: <Minimal />,
	},
];

export const fontFamilyOptions = [
	{ label: "Roboto", value: "Roboto" },
	{ label: "Tahoma", value: "Tahoma" },
	{ label: "Arial", value: "Arial" },
	{ label: "Georgia", value: "Georgia" },
	{ label: "Times New Roman", value: "Times New Roman" },
	{ label: "Courier New", value: "Courier New" },
	{ label: "Verdana", value: "Verdana" },
];

export const fontWeight = [
	{ label: "200", value: "200" },
	{ label: "400", value: "400" },
	{ label: "600", value: "600" },
	{ label: "800", value: "800" },
];

export const tags = [
	{
		label: "Default",
		value: "p",
	},
	{
		label: "Heading h1",
		value: "h1",
	},
	{
		label: "Heading h2",
		value: "h2",
	},
	{
		label: "Heading h3",
		value: "h3",
	},
	{
		label: "Body",
		value: "body",
	},
];
