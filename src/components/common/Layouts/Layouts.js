import { useCallback } from "@wordpress/element";
import { memo } from "@wordpress/element";
import "./editor.scss";
import { RightSymbolIcon } from "../../../smart-post-carousel/assets/icon";

function Layout({ icon, value, label, isActive, onClick }) {
	return (
		<div
			className={`sp-smart-post-carousel-layout-card ${
				isActive ? "active" : "inactive"
			}`}
			onClick={onClick}
		>
			{isActive && (
				<span className="active-symbol">
					<RightSymbolIcon />
				</span>
			)}
			<div className="sp-smart-layout-img">{icon}</div>
			{label && <p className="sp-smart-post-carousel-layout-title">{label}</p>}
		</div>
	);
}

function Layouts({
	attributes,
	setAttributes,
	attributesKey,
	label = "",
	grid = 2,
	items,
	onChange,
}) {
	const handleActive = useCallback(
		(newValue) => {
			if (newValue === attributes) return;
			onChange?.(newValue);
			setAttributes({ [attributesKey]: newValue });
		},
		[attributes, attributesKey, onChange, setAttributes],
	);
	return (
		<div className="sp-smart-post-carousel-layout-picker sp-smart-post-carousel-panel-pb">
			{label && (
				<p className="sp-smart-post-carousel-component-title">{label}</p>
			)}
			<div className={`sp-smart-post-carousel-layouts grid-${grid}`}>
				{items.map(({ icon, value, label }) => {
					const isActive = value === attributes;
					return (
						<Layout
							key={value}
							icon={typeof icon === "function" ? icon(attributes) : icon}
							value={value}
							label={label}
							isActive={isActive}
							onClick={() => handleActive(value)}
						></Layout>
					);
				})}
			</div>
		</div>
	);
}

export default memo(Layouts);
