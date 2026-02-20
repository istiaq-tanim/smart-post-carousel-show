import { paginationDotsOptions } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import SelectDropDown from "../common/SelectDropDown/SelectDropDown";

function General() {
	const { attributes, setAttributes } = useAttributes();
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
