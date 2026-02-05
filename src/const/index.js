import {
	CarouselStandardIcon,
	CarouselTickerIcon,
} from "../smart-post-carousel/assets/icon";

export const LayoutItems = [
	{
		icon: (activeValue) => {
			return <CarouselStandardIcon value={activeValue === "standard"} />;
		},
		label: "Standard",
		value: "standard",
	},
	{
		icon: (activeValue) => {
			return <CarouselTickerIcon value={activeValue === "ticker"} />;
		},
		label: "Ticker",
		value: "ticker",
	},
];
