import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import { memo, useCallback } from "@wordpress/element";
import "./editor.scss";

const CustomToggleGroupControl = ({
	attributes,
	attributesKey,
	setAttributes,
	label = "",
	items = [],
	border = false,
	flexStyle = false,
	onClick,
	hasDivider = true,
	extraClass = "",
}) => {
	const value = attributes?.[attributesKey];

	const handleChange = useCallback(
		(newValue) => {
			if (onClick) {
				onClick(newValue);
			} else {
				setAttributes({ [attributesKey]: newValue });
			}
		},
		[onClick, setAttributes, attributesKey],
	);

	return (
		<div className="sp-smart-post-carousel-toggle-button-group-wrapper sp-smart-post-carousel-component-mb">
			{label && (
				<div className="sp-smart-post-carousel-header">
					<span className="sp-smart-post-carousel-component-title">
						{label}
					</span>
				</div>
			)}

			<ToggleGroupControl
				className={`sp-smart-post-carousel-toggle-button-group sp-smart-post-carousel-component-mb${
					label ? "" : " sp-negative-space"
				}${flexStyle ? " sp-smart-post-carousel-d-flex button-style-2" : ""}`}
				value={value}
				onChange={handleChange}
				isBlock
				__nextHasNoMarginBottom
				__next40pxDefaultSize
			>
				<div
					className={`sp-smart-post-carousel-toggle-button-group-list${
						border ? " has-border" : ""
					}${hasDivider ? " sp-has-divider" : ""} ${extraClass}`}
				>
					{items.map((item) => (
						<ToggleGroupControlOption
							key={item.value}
							value={item.value}
							label={item.label}
							showTooltip={!!item.tooltip}
							aria-label={item.tooltip || item.label}
						/>
					))}
				</div>
			</ToggleGroupControl>
		</div>
	);
};

export default memo(CustomToggleGroupControl);
