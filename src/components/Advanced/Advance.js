import { __ } from "@wordpress/i18n";
import { TextControl } from "@wordpress/components";

const Advance = ({ attributes, setAttributes }) => {
	const { additionalCssClass } = attributes;

	return (
		<div>
			<TextControl
				label={__("Additional CSS Class(es)", "smart-post-carousel")}
				attributes={additionalCssClass}
				attributesKey={"additionalCssClass"}
				setAttributes={setAttributes}
				flex={false}
				inputType="string"
			/>
		</div>
	);
};

export default Advance;
