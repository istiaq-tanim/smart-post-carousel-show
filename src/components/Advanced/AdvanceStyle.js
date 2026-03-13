import { __ } from "@wordpress/i18n";
import { borderTypes } from "../../const";
import { useAttributes } from "../../hooks/useAttributes";
import BackgroundStyle from "../common/Background/Background";
import CustomColorPicker from "../common/CustomColorPicker/CustomColorPicker";
import CustomRangeControl from "../common/CustomRangeControl/CustomRangeControl";
import SpacingControl from "../common/CustomSpacingControl/SpacingControl";
import CustomToggleGroupControl from "../common/CustomToggleGroupControl/CustomToggleGroupControl";

function AdvanceStyle() {
      const { attributes, setAttributes } = useAttributes();
      const {
            cardEffectType,
            cardBackGroundStyles,
            cardBorderColorNormal,
            cardBorderColorHover,
            cardPadding,
            cardMargin,
      } = attributes;


      const currentBorderStyleKey =
            cardEffectType === "hover" ? "cardHoverBorderStyle" : "cardBorderStyle";

      const currentBorderStyle = attributes[currentBorderStyleKey];


      return (
            <>
                  <CustomToggleGroupControl
                        attributes={attributes}
                        attributesKey="cardEffectType"
                        setAttributes={setAttributes}
                        items={[
                              { label: "Normal", value: "normal" },
                              { label: "Hover", value: "hover" },
                        ]}
                  ></CustomToggleGroupControl>

                  {/* Background Color Button */}


                  <BackgroundStyle
                        backgroundStyle={cardBackGroundStyles}
                        contentEffect={cardEffectType}
                        label="Background Style"
                        onChange={(value) => setAttributes({ cardBackGroundStyles: value })}
                  ></BackgroundStyle>


                  {/* Border Style */}
                  <CustomToggleGroupControl
                        label={__("Border", "smart-post-carousel")}
                        attributes={attributes}
                        attributesKey={currentBorderStyleKey}
                        setAttributes={setAttributes}
                        items={borderTypes}
                  ></CustomToggleGroupControl>


                  {/* check border style */}
                  {currentBorderStyle !== "none" && (
                        <>
                              {/* Border Width */}
                              <CustomRangeControl
                                    label="Border Width"
                                    attributeKey={
                                          cardEffectType === "hover"
                                                ? "cardBorderWidthHover"
                                                : "cardBorderWidthNormal"
                                    }
                                    min={0}
                                    max={10}
                                    defaultValue={1}
                                    showUnit={true}
                                    step={1}
                              ></CustomRangeControl>

                              {/* Border Color */}
                              <CustomColorPicker
                                    label="Border Color"
                                    defaultValue=""
                                    onChange={(value) =>
                                          setAttributes({
                                                [cardEffectType === "hover"
                                                      ? "cardBorderColorHover"
                                                      : "cardBorderColorNormal"]: value,
                                          })
                                    }
                                    value={
                                          cardEffectType === "hover"
                                                ? cardBorderColorHover
                                                : cardBorderColorNormal
                                    }
                              ></CustomColorPicker>

                              {/* Border Radius */}
                              <CustomRangeControl
                                    label="Border Radius"
                                    attributeKey={
                                          cardEffectType === "hover"
                                                ? "cardBorderRadiusHover"
                                                : "cardBorderRadiusNormal"
                                    }
                                    min={0}
                                    max={50}
                                    defaultValue={0}
                                    showUnit={true}
                                    showDevice={true}
                                    step={1}
                              ></CustomRangeControl>


                        </>
                  )}


                  <SpacingControl
                        values={cardPadding}
                        min={0}
                        max={48}
                        label="Padding"
                        step={1}
                        onChange={(values) => setAttributes({ cardPadding: values })}
                  ></SpacingControl>

                  <SpacingControl
                        values={cardMargin}
                        min={0}
                        max={48}
                        label="Margin"
                        step={1}
                        onChange={(values) => setAttributes({ cardMargin: values })}
                  ></SpacingControl>
            </>
      );
}

export default AdvanceStyle;