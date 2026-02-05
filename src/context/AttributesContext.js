import { createContext } from "@wordpress/element";
export const AttributesContext = createContext();

export const AttributesProvider = ({ attributes, setAttributes, children }) => {
	return (
		<AttributesContext.Provider value={{ attributes, setAttributes }}>
			{children}
		</AttributesContext.Provider>
	);
};
