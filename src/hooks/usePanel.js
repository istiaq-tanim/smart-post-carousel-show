import { useContext } from "@wordpress/element";
import { PanelContext } from "../context/PanelContext";
export const usePanel = () => {
    const context = useContext(PanelContext);
    
    if (!context) {
        throw new Error("usePanel must be used within PanelProvider");
    }
    
    return context;
};