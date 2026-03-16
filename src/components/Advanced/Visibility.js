import { __ } from "@wordpress/i18n";
import CustomToggle from "../common/CustomToggle/CustomToggle";
import { useAttributes } from "./../../hooks/useAttributes";
function Visibility() {
	const { attributes, setAttributes } = useAttributes();
	return (
		<>
			{/* Visibility Tabs for Desktop */}
			<CustomToggle
				label={__("Hide on Desktop", "smart-post-carousel")}
				value={attributes.hideOnDesktop}
				attributesKey="hideOnDesktop"
				setAttributes={setAttributes}
			/>

			{/* Visibility Tabs for Tabs */}
			<CustomToggle
				label={__("Hide on Desktop", "smart-post-carousel")}
				value={attributes.hideOnTablet}
				attributesKey="hideOnTablet"
				setAttributes={setAttributes}
			/>
			{/* Visibility Tabs for Mobile */}
			<CustomToggle
				label={__("Hide on Desktop", "smart-post-carousel")}
				value={attributes.hideOnMobile}
				attributesKey="hideOnMobile"
				setAttributes={setAttributes}
			/>
		</>
	);
}

export default Visibility;
