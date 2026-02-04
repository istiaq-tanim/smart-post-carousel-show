
import { TabPanel } from "@wordpress/components";
import { useMemo, useState } from "@wordpress/element";
import "./editor.scss";
import { tabConfigs, tabOrder } from "./tabConfig";
import TabRenderer from "./TabRenderer";

// Main CustomTabs Component
const CustomTabs = ({
      attributes,
      setAttributes,
      displayIcon = true,
      initialTab = "general",
      verticalPosition = true,
      props = "",
      ...tabComponents
}) => {
      const [tabName, setTabName] = useState(initialTab);

      const tabs = useMemo(() =>
            tabOrder
                  .filter(({ componentKey }) => tabComponents[componentKey])
                  .map(({ key }) => {
                        const config = tabConfigs[key];
                        const Icon = config.icon;

                        return {
                              name: key,
                              title: (
                                    <span className="sp-smart-post-carousel-tab-panel-title">
                                          {displayIcon && Icon && <Icon />} {config.label}
                                    </span>
                              ),
                              className: config.className,
                        };
                  }),
            [tabComponents, displayIcon]
      );

      return (
            <TabPanel
                  className="sp-smart-post-carousel-tab-panel"
                  activeClass="active-tab"
                  initialTabName={tabName}
                  onSelect={setTabName}
                  tabs={tabs}
            >
                  {(tab) => (
                        <TabRenderer
                              tab={tab}
                              tabComponents={tabComponents}
                              attributes={attributes}
                              setAttributes={setAttributes}
                              props={props}
                              verticalPosition={verticalPosition}
                        />
                  )}
            </TabPanel>
      );
};

export default CustomTabs;
