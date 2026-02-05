import { LayoutItems } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import Layouts from "../common/Layouts/Layouts";

function General() {
	const { attributes, setAttributes } = useAttributes();
	return (
		<>
			<Layouts
				attributes={attributes.carouselStyle}
				setAttributes={setAttributes}
				attributesKey={"carouselStyle"}
				items={LayoutItems}
			></Layouts>
		</>
	);
}

export default General;
