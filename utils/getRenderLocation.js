export const OVERLAY_POSITIONS = [
      "top-left", "top-right",
      "bottom-left", "bottom-right",
      "center-center", "center-top", "center-bottom"
];

export const DEFAULT_OVERLAY_ORIENTATIONS = ["orientation_three", "orientation_four"];

export const getCategoryRenderLocation = (categoryPosition, orientation) => {
      const isOverlay = OVERLAY_POSITIONS.includes(categoryPosition);
      const isDefaultOverlay = categoryPosition === "" && DEFAULT_OVERLAY_ORIENTATIONS.includes(orientation);
      const isAboveTitle = categoryPosition === "above-title";

      return {
            isOverlay,
            isDefaultOverlay,
            isAboveTitle,
            showOverlay: isOverlay || isDefaultOverlay,
            showInContent: !isOverlay && !isDefaultOverlay && !isAboveTitle,
      };
};