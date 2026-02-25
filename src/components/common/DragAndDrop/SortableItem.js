import { useSortable } from "@dnd-kit/sortable";
import { memo } from "@wordpress/element";
import { DndTitleIcon } from "../../../smart-post-carousel/assets/icon";
import { CSS } from "@dnd-kit/utilities";
import CustomToggle from "../CustomToggle/CustomToggle";

const SortableItem = memo(({ id, item, toggleBtn, onToggle }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		transform: transform ? CSS.Transform.toString(transform) : undefined,
		transition,
	};
	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={
				isDragging
					? "sp-smart-post-carousel-grabbing"
					: "sp-smart-post-carousel-grab"
			}
		>
			<div className="sp-smart-post-carousel-selected-option">
				<span className="sp-smart-post-carousel-select-label">
					<DndTitleIcon /> {item?.label}
				</span>

				{toggleBtn && (
					<span className="sp-smart-post-carousel-select-toggle-button">
						<CustomToggle value={item.show} onChange={() => onToggle(item)} />
					</span>
				)}
			</div>
		</div>
	);
});

export default SortableItem;
