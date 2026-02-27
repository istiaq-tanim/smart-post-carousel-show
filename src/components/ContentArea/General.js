import { useAttributes } from "../../hooks/useAttributes";
import DragAndDrop from "../common/DragAndDrop/DragAndDrop";

function General() {
	const { attributes, setAttributes } = useAttributes();
	const { allContentArray } = attributes;
	return (
		<>
			<DragAndDrop
				items={allContentArray}
				onChange={(updated) => setAttributes({ allContentArray: updated })}
			/>
		</>
	);
}

export default General;
