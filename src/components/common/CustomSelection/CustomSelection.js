import { SelectControl } from "@wordpress/components";
import { useAttributes } from './../../../hooks/useAttributes';
import "./editor.scss";
function CustomSelection({
      label,
      options,
      inline = true,
      attributeKey = "",
      subKey = "",
}) {
      const { attributes, setAttributes } = useAttributes();

      const handleChange = (newValue) => {
            if (subKey) {
                  setAttributes({
                        [attributeKey]: {
                              ...attributes[attributeKey],
                              [subKey]: newValue,
                        },
                  });
            } else {
                  setAttributes({ [attributeKey]: newValue });
            }
      };
      return (
            <div
                  className={`selector-control custom-selector ${inline ? "inline" : ""}`}
            >
                  <span className="selector-label">{label}</span>
                  <SelectControl
                        options={options}
                        onChange={(value) => handleChange(value)}
                        value={subKey ? attributes[attributeKey][subKey] : attributes[attributeKey]}
                  ></SelectControl>
            </div>
      );
}

export default CustomSelection;