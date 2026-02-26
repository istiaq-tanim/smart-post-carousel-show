import { Popover } from "@wordpress/components";
import { useState } from "@wordpress/element";
import Input from "../Input/Input";
import Typo from "../../../smart-post-carousel/assets/icon";
import CustomSelection from "../CustomSelection/CustomSelection";
import { fontFamilyOptions, fontWeight, tags } from "../../../const";

function Typography({ label, onChange = () => {}, values, attributeKey }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

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
						<h3 style={{ marginTop: 0, marginBottom: "16px" }}>
							{label} Typography
						</h3>

						<CustomSelection
							label="Select Global Style"
							inline={false}
							options={tags}
							attributeKey={attributeKey}
							subKey="tags"
						/>

						<CustomSelection
							label="Font Family"
							inline={false}
							options={fontFamilyOptions}
							attributeKey={attributeKey}
							subKey="family"
						/>
						<CustomSelection
							label="Font Weight"
							inline={false}
							options={fontWeight}
							attributeKey={attributeKey}
							subKey="weight"
						/>

						<div style={{ display: "flex", gap: "5px" }}>
							<Input
								value={values.fontSize}
								label="Font Size"
								onChange={(value) => handleChange("fontSize", value)}
							></Input>
							<Input
								value={values.height}
								step={0.1}
								label="Height"
								onChange={(value) => handleChange("height", value)}
							></Input>
							<Input
								value={values.spacing}
								label="Spacing"
								onChange={(value) => handleChange("spacing", value)}
							></Input>
						</div>
					</div>
				</Popover>
			)}
		</div>
	);
}

export default Typography;
