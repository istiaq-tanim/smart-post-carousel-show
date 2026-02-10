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
