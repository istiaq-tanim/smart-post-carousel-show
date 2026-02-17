const SelectDropDownField = ({
	options,
	attributes,
	setAttributes,
	attributesKey,
	onClick = null,
	className = "",
	onClose,
}) => {
	const selectHandler = (value) => {
		if (onClick) {
			onClick(value);
		} else {
			setAttributes({ [attributesKey]: value });
		}
	};
	return (
		<ul className={`sp-smart-post-carousel-select-dropdown ${className}`}>
			{options?.map((option, index) => (
				<li
					key={index}
					className={`sp-smart-post-carousel-select-dropdown-option ${
						attributes === option.value ? "active" : ""
					}`}
					onClick={() => {
						selectHandler(option.value);
						if (typeof onClose === "function") {
							onClose();
						}
					}}
				>
					{option.label && <span>{option.label}</span>}
					{option.icon && <span>{option.icon}</span>}
				</li>
			))}
		</ul>
	);
};
export default SelectDropDownField;
