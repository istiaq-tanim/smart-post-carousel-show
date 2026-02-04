import { createContext, useCallback, useContext, useState } from "@wordpress/element";

export const TabContext = createContext();

export const TabProvider = ({ children }) => {
    const [activeTabs, setActiveTabs] = useState({
        carousel: 'general',
        navigation: 'general',
        pagination: 'general',
        typography: 'general',
    });

    const switchTab = useCallback((panelName, tabName) => {
        setActiveTabs((prev) => ({
            ...prev,
            [panelName]: tabName,
        }));
    }, []);

    const getActiveTab = useCallback((panelName) => {
        return activeTabs[panelName] || 'general';
    }, [activeTabs]);

    const value = {
        activeTabs,
        switchTab,
        getActiveTab,
    };

    return (
        <TabContext.Provider value={value}>
            {children}
        </TabContext.Provider>
    );
};

