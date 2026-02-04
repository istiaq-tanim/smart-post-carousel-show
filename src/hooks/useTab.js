import { useContext} from "@wordpress/element";
import { TabContext } from "../context/TabContext";

export const useTab = () => {
    const context = useContext(TabContext);
    
    if (!context) {
        throw new Error("useTab must be used within TabProvider");
    }
    
    return context;
};