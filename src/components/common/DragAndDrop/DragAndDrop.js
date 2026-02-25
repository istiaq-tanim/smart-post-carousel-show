import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	restrictToParentElement,
	restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { memo, useRef, useState } from "@wordpress/element";
import SortableItem from "./SortAbleItem";
import "./editor.scss";

function DragAndDrop({ label = "", items = [], toggleBtn = false, onChange }) {
	const [allOptions, setAllOptions] = useState(items);
	const containRef = useRef(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 5 },
		}),
	);

	const handleDragEnd = ({ active, over }) => {
		if (!over || active.id === over.id) return;

		const oldIndex = allOptions.findIndex((i) => `${i.id}` === `${active.id}`);
		const newIndex = allOptions.findIndex((i) => `${i.id}` === `${over.id}`);
		const reordered = arrayMove(allOptions, oldIndex, newIndex);
		setAllOptions(reordered);
		onChange(reordered);
	};

	const handleToggle = (item) => {
		const updated = allOptions.map((option) =>
			option.id === item.id ? { ...option, show: !option.show } : option,
		);
		setAllOptions(updated);
		onChange(updated);
	};

	return (
		<div className="shaped-plugin-multiple-select sp-smart-post-component-mb">
			{label && (
				<div className="sp-smart-post-carousel-multiple-select-dnd-label">
					<p>{label}</p>
				</div>
			)}
			<div
				className="sp-smart-post-carousel-drag-and-drop-dnd-container"
				ref={containRef}
			>
				<div className="sp-smart-post-carousel-selected-options">
					<DndContext
						sensors={sensors}
						onDragEnd={handleDragEnd}
						modifiers={[restrictToVerticalAxis, restrictToParentElement]}
					>
						<SortableContext
							items={allOptions.map((item) => `${item.id}`)}
							strategy={verticalListSortingStrategy}
						>
							{allOptions.map((item, index) => (
								<SortableItem
									key={item.id}
									id={`${item.id}`}
									index={index}
									item={item}
									toggleBtn={toggleBtn}
									onToggle={handleToggle}
								/>
							))}
						</SortableContext>
					</DndContext>
				</div>
			</div>
		</div>
	);
}

export default memo(DragAndDrop);
