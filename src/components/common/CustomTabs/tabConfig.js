import { AdvancedIcon, CarouselIcon, GeneralIcon, LayoutsIcon, SliderIcon, StyleIcon } from "./icons";

export const tabConfigs = {
      layout: {
            name: 'layout',
            icon: LayoutsIcon,
            label: 'Layouts',
            className: 'sp-smart-post-carousel-general-tab',
      },
      carousel: {
            name: 'carousel',
            icon: CarouselIcon,
            label: 'Carousel',
            className: 'sp-smart-post-carousel-general-tab',
      },
      general: {
            name: 'general',
            icon: GeneralIcon,
            label: 'General',
            className: 'sp-smart-post-carousel-general-tab',
      },
      style: {
            name: 'style',
            icon: StyleIcon,
            label: 'Style',
            className: 'sp-smart-post-carousel-style-tab',
      },
      visibility: {
            name: 'visibility',
            icon: null,
            label: 'Visibility',
            className: 'sp-smart-post-carousel-visibility-tab',
      },
      advanced: {
            name: 'advanced',
            icon: AdvancedIcon,
            label: 'Advanced',
            className: 'sp-smart-post-carousel-advanced-tab',
      },
      slider: {
            name: 'slider',
            icon: SliderIcon,
            label: 'Slider',
            className: 'sp-smart-post-carousel-advanced-tab',
      },
};

export const tabOrder = [
      { key: 'layout', componentKey: 'LayoutTab' },
      { key: 'carousel', componentKey: 'CarouselTab' },
      { key: 'general', componentKey: 'GeneralTab' },
      { key: 'preset', componentKey: 'Preset' },
      { key: 'style', componentKey: 'StyleTab' },
      { key: 'visibility', componentKey: 'VisibilityTab' },
      { key: 'advanced', componentKey: 'AdvancedTab' },
      { key: 'slider', componentKey: 'SliderTab' },
];
