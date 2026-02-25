import { __ } from "@wordpress/i18n";
import { useAttributes } from "../../hooks/useAttributes";
import CustomColorPicker from "../common/CustomColorPicker/CustomColorPicker";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";
import {
	DashedBorder,
	DottedBorder,
	DoubleBorder,
	SolidBorder,
} from "../../smart-post-carousel/assets/borderIcon";

function Style() {
	const { attributes, setAttributes } = useAttributes();
	const {
		paginationDotStyleType,
		dotNormalTextColor,
		dotActiveTextColor,
		dotNormalBackGroundNormalColor,
		dotNormalBackGroundActiveColor,
		paginationBorderStyle,
		paginationStyle,
	} = attributes;

	const hasBorder = paginationBorderStyle !== "none";

	return (
		<>
			{/* Tabs for Normal Active for Pagination Bullet */}
			{paginationStyle !== "fraction" ? (
				<CustomToggleGroupControl
					attributes={attributes}
					attributesKey="paginationDotStyleType"
					setAttributes={setAttributes}
					items={[
						{ label: "Normal", value: "normal" },
						{ label: "Active", value: "active" },
					]}
				></CustomToggleGroupControl>
			) : (
				<CustomToggleGroupControl
					attributes={attributes}
					attributesKey="paginationHover"
					setAttributes={setAttributes}
					items={[
						{ label: "Normal", value: "normal" },
						{ label: "HOVER", value: "hover" },
					]}
				></CustomToggleGroupControl>
			)}

			{/*pagination Dots text Color For Normal & Active*/}

			{["fraction", "numbers"].includes(paginationStyle) && (
				<CustomColorPicker
					label="Text Color"
					defaultValue={
						paginationDotStyleType === "normal" ? "#000000" : "#ffffff"
					}
					onChange={(value) =>
						setAttributes(
							paginationDotStyleType === "normal"
								? { dotNormalTextColor: value }
								: { dotActiveTextColor: value },
						)
					}
					value={
						paginationDotStyleType === "normal"
							? dotNormalTextColor
							: dotActiveTextColor
					}
				/>
			)}

			{/*pagination Dots Background Color For Normal & Active*/}
			<CustomColorPicker
				label="Background Color"
				defaultValue={
					paginationDotStyleType === "normal" ? "#cacbcf" : "#4E6E3E"
				}
				onChange={(value) =>
					setAttributes(
						paginationDotStyleType === "normal"
							? { dotNormalBackGroundNormalColor: value }
							: { dotNormalBackGroundActiveColor: value },
					)
				}
				value={
					paginationDotStyleType === "normal"
						? dotNormalBackGroundNormalColor
						: dotNormalBackGroundActiveColor
				}
			></CustomColorPicker>

			{/* Border Style for Pagination */}

			<CustomToggleGroupControl
				label={__("Border", "smart-post-carousel")}
				attributes={attributes}
				attributesKey="paginationBorderStyle"
				setAttributes={setAttributes}
				items={[
					{ label: "None", value: "none" },
					{ label: <SolidBorder />, value: "solid" },
					{ label: <DashedBorder />, value: "dashed" },
					{ label: <DottedBorder />, value: "dotted" },
					{ label: <DoubleBorder />, value: "double" },
				]}
			></CustomToggleGroupControl>

			{/* Based on Border Style this section show */}

			{hasBorder && (
				<>
					{/* Icon Border Width */}
					<CustomRangeControl
						label="Border Width"
						attributeKey="borderWidth"
						min={0}
						max={10}
						defaultValue={0}
						showUnit={true}
						step={1}
					></CustomRangeControl>
					{/* Icon Border Color */}
					<CustomColorPicker
						label="Border Color"
						defaultValue=""
						onChange={(value) => setAttributes({ borderColor: value })}
						value={borderColor}
					></CustomColorPicker>
				</>
			)}
		</>
	);
}

export default Style;
