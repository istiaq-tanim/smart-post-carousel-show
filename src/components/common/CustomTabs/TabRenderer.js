const TabRenderer = ({
      tab,
      tabComponents,
      attributes,
      setAttributes,
      props,
      verticalPosition
}) => {
      const componentMap = {
            layout: 'LayoutTab',
            carousel: 'CarouselTab',
            general: 'GeneralTab',
            preset: 'Preset',
            style: 'StyleTab',
            visibility: 'VisibilityTab',
            advanced: 'AdvancedTab',
            slider: 'SliderTab',
      };

      const componentKey = componentMap[tab.name];
      const Component = tabComponents[componentKey];

      if (!Component) return null;

      const componentProps = {
            attributes,
            setAttributes,
            props,
      };

      if (['layout', 'carousel', 'general'].includes(tab.name)) {
            componentProps.verticalPosition = verticalPosition;
      }

      return <Component {...componentProps} />;
};

export default TabRenderer