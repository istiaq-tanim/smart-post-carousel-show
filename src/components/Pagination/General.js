import { useEffect } from "@wordpress/element";
import { paginationDotsOptions } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import SelectDropDown from "../common/SelectDropDown/SelectDropDown";

const PAGINATION_WIDTH_DEFAULTS = {
	dots: 12,
	lines: 12,
	numbers: 24,
	fraction: 36,
	progressbar: 12,
};

const PAGINATION_HEIGHT_DEFAULTS = {
	dots: 12,
	lines: 12,
	numbers: 24,
	fraction: 36,
	progressbar: 8,
};

function General() {
	const { attributes, setAttributes } = useAttributes();
	const { paginationStyle } = attributes;

	useEffect(() => {
		const newWidth = PAGINATION_WIDTH_DEFAULTS[paginationStyle] ?? 12;
		const newHeight = PAGINATION_HEIGHT_DEFAULTS[paginationStyle] ?? 12;

		setAttributes({
			paginationWidth: {
				desktop: newWidth,
				tablet: newWidth,
				mobile: newWidth,
			},
			paginationHeight: {
				desktop: newHeight,
				tablet: newHeight,
				mobile: newHeight,
			},
		});
	}, [paginationStyle]);
	return (
		<>
			{/* Row with label and Pagination icon style type */}
			<SelectDropDown
				label="Arrow Icon Style"
				attributes={attributes.paginationStyle}
				attributesKey="paginationStyle"
				setAttributes={setAttributes}
				options={paginationDotsOptions}
			/>

			{/* pagination Dot Width */}
			<CustomRangeControl
				label="Width"
				attributeKey="paginationWidth"
				min={0}
				max={60}
				defaultValue={12}
				showUnit={true}
			></CustomRangeControl>

			{/* Pagination Dot Height */}
			<CustomRangeControl
				label="Height"
				attributeKey="paginationHeight"
				min={0}
				max={60}
				defaultValue={12}
				showUnit={true}
			></CustomRangeControl>

			{/* Pagination Dot Gap */}
			<CustomRangeControl
				label="Space Between Dots"
				attributeKey="paginationDotGap"
				min={0}
				max={40}
				defaultValue={8}
				showUnit={true}
			></CustomRangeControl>

			{/* Horizontal Position */}
			<CustomRangeControl
				label="Horizontal Position"
				attributeKey="paginationHorizontalPosition"
				min={0}
				max={100}
				defaultValue={50}
				showUnit={true}
			></CustomRangeControl>
			{/* Vertical Position */}
			<CustomRangeControl
				label="Vertical Position"
				attributeKey="paginationVerticalPosition"
				min={-100}
				max={500}
				defaultValue={-50}
				showUnit={true}
			></CustomRangeControl>
		</>
	);
}

export default General;
