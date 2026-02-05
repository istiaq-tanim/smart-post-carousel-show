import { useContext } from "@wordpress/element";
import { AttributesContext } from "../context/AttributesContext";

export const useAttributes = () => {
	const context = useContext(AttributesContext);

	if (!context) {
		throw new Error("useTab must be used within TabProvider");
	}

	return context;
};
