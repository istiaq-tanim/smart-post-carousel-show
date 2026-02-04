import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from "@wordpress/components";
import { usePanel } from '../../hooks/usePanel';
import CustomTabs from '../common/CustomTabs/CustomTabs';
import NavigationGeneral from "../NavigationArrow/General";
import NavigationStyle from "../NavigationArrow/Style";
import QueryBuilder from '../QueryBuilder';
import General from './../PostCarousel/General';
import Slider from './../PostCarousel/Slider';

function Inspector({ attributes, setAttributes }) {
    const { openPanel, togglePanel } = usePanel();

    return (
        <InspectorControls>
            {/* Post Carousel Panel */}
            <PanelBody
                title="Post Carousel"
                opened={openPanel === "carousel"}
                onToggle={() => togglePanel("carousel")}
                initialOpen={true}
            >
                {openPanel === "carousel" && (
                    <CustomTabs
                        GeneralTab={General}
                        SliderTab={Slider}
                        attributes={attributes}
                        setAttributes={setAttributes}
                        displayIcon={true}
                        initialTab="general"
                    />
                )}
            </PanelBody>

            {/* Query Builder Panel */}
            <PanelBody
                title="Query Builder"
                opened={openPanel === "query"}
                onToggle={() => togglePanel("query")}
            >
                {openPanel === "query" && (
                    <QueryBuilder
                        attributes={attributes}
                        setAttributes={setAttributes}
                    />
                )}
            </PanelBody>

            <PanelBody
                title="Navigation Arrow"
                opened={openPanel === "navigation"}
                onToggle={() => togglePanel("navigation")}
                initialOpen={true}
            >
                {openPanel === "navigation" && (
                    <CustomTabs
                        GeneralTab={NavigationGeneral}
                        StyleTab={NavigationStyle}
                        attributes={attributes}
                        setAttributes={setAttributes}
                        displayIcon={true}
                        initialTab="general"
                    />
                )}
            </PanelBody>


        </InspectorControls>
    );
}

export default Inspector;