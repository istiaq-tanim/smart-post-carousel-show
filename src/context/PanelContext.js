import { createContext, useCallback, useContext, useState } from "@wordpress/element";

export const PanelContext = createContext();

export function PanelProvider  ({children}){

  const [openPanel,setOpenPanel] = useState("carousel");

  const togglePanel = useCallback((panelName)=>{
      setOpenPanel((prev)=> prev === panelName ? "" : panelName)
  },[])
  const value = {
        openPanel,      
        togglePanel,   
    };
  return (
    <PanelContext.Provider value={value}>
       {children}
    </PanelContext.Provider>
  )
} 

