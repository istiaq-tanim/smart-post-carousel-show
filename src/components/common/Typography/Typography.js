import { Popover } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { fontFamilyOptions, fontWeight } from "../../../const";
import { useAttributes } from "../../../hooks/useAttributes";
import Typo from "../../../smart-post-carousel/assets/icon";
import CustomSelection from "../CustomSelection/CustomSelection";
import Input from "../Input/Input";

function Typography({
	label,
	onChange = () => { },
	values,
	attributeKey,
	tags = [
		{
			label: "Default",
			value: "div",
		},
		{
			label: "Heading h1",
			value: "h1",
		},
		{
			label: "Heading h2",
			value: "h2",
		},
		{
			label: "Heading h3",
			value: "h3",
		},
		{
			label: "Heading h4",
			value: "h4",
		},
		{
			label: "Heading h5",
			value: "h5",
		},
	],
}) {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const { attributes } = useAttributes();
	const typoValues = attributes[attributeKey] ?? {};

	const handleChange = (name, value) => {
		const newValue = {
			...values,
			[name]: value,
		};
		onChange(newValue);
	};

	return (
		<div className="custom-range-control">
			<div className="range-control">
				<div className="content">
					<div className="range-label">
						<p>{label}</p>
					</div>
					<div className="range-measure">
						<div style={{ cursor: "pointer" }}>
							<Typo onClick={handleToggle} active={isOpen}></Typo>
						</div>
					</div>
				</div>
			</div>
			{isOpen && (
				<Popover onClose={() => setIsOpen(false)} placement="bottom-end">
					<div style={{ padding: "20px", minWidth: "450px" }}>
						<h3 style={{ marginTop: 0, marginBottom: "16px" }}>{label}</h3>

						{"tags" in typoValues && (
							<CustomSelection
								label="Select Global Style"
								inline={false}
								options={tags}
								attributeKey={attributeKey}
								subKey="tags"
								onChange={(newTag) => handleChange("tags", newTag)}
							/>
						)}

						{"family" in typoValues && (
							<CustomSelection
								label="Font Family"
								inline={false}
								options={fontFamilyOptions}
								attributeKey={attributeKey}
								subKey="family"
							/>
						)}
						{"weight" in typoValues && (
							<CustomSelection
								label="Font Weight"
								inline={false}
								options={fontWeight}
								attributeKey={attributeKey}
								subKey="weight"
							/>
						)}

						<div style={{ display: "flex", gap: "5px" }}>
							{"fontSize" in typoValues && (
								<Input
									value={typoValues.fontSize}
									label="Font Size"
									onChange={(value) => handleChange("fontSize", value)}
								/>
							)}
							{"height" in typoValues && (
								<Input
									value={typoValues.height}
									step={0.1}
									label="Height"
									onChange={(value) => handleChange("height", value)}
								/>
							)}
							{"spacing" in typoValues && (
								<Input
									value={typoValues.spacing}
									label="Spacing"
									onChange={(value) => handleChange("spacing", value)}
								/>
							)}
						</div>
					</div>
				</Popover>
			)}
		</div>
	);
}

export default Typography;
