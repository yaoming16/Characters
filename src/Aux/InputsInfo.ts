import type { TFunction } from "i18next";

import type { allNumberInputsStatesType } from "../Types/types";

//Main accordion inputsinfo aray.
export function createMainInputsInfo(
  allNumberInputsStates: allNumberInputsStatesType,
  t: TFunction,
) {
  return [
    {
      name: "squaresPerRow",
      warningText: t("optionsForm.warnings.squaresPerRow"),
      text: t("optionsForm.numberInputsText.squaresPerRow"),
      minVal: 1,
      maxVal: Infinity,
    },
    {
      name: "rowsPerCharacter",
      warningText: t("optionsForm.warnings.rowsPerCharacter"),
      text: t("optionsForm.numberInputsText.rowsPerCharacter"),
      minVal: 1,
      maxVal: Infinity,
    },
    {
      name: "practiceSquaresPerLine",
      warningText: t("optionsForm.warnings.practiceSquaresPerLine"),
      text: t("optionsForm.numberInputsText.practiceSquaresPerLine"),
      minVal: 0,
      maxVal: allNumberInputsStates["squaresPerRow"].value,
    },
    {
      name: "practiceLines",
      warningText: t("optionsForm.warnings.practiceLines"),
      text: t("optionsForm.numberInputsText.practiceLines"),
      minVal: 1,
      maxVal: allNumberInputsStates["rowsPerCharacter"].value,
    },
  ];
}

// Style options inputs info array
export function createStyleInputsInfo(t: TFunction) {
  return [
    {
      name: "titleFontSize",
      warningText: t("optionsForm.warnings.titleFontSize"),
      text: t("optionsForm.numberInputsText.titleFontSize"),
      minVal: 0,
      maxVal: 500,
    },
    {
      name: "letterOpacity",
      warningText: t("optionsForm.warnings.letterOpacity"),
      text: t("optionsForm.numberInputsText.letterOpacity"),
      minVal: 0,
      maxVal: 100,
    },
  ];
}

export function createExtraOptionsInputsInfo(t: TFunction) {
  return [
    {
      name: "marginLeft",
      warningText: t("optionsForm.warnings.marginLeft"),
      text: t("optionsForm.numberInputsText.marginLeft"),
      minVal: 0,
      maxVal: Infinity,
    },
    {
      name: "marginRight",
      warningText: t("optionsForm.warnings.marginRight"),
      text: t("optionsForm.numberInputsText.marginRight"),
      minVal: 0,
      maxVal: Infinity,
    },
    {
      name: "marginTop",
      warningText: t("optionsForm.warnings.marginTop"),
      text: t("optionsForm.numberInputsText.marginTop"),
      minVal: 0,
      maxVal: Infinity,
    },
    {
      name: "marginBottom",
      warningText: t("optionsForm.warnings.marginBottom"),
      text: t("optionsForm.numberInputsText.marginBottom"),
      minVal: 0,
      maxVal: Infinity,
    },
    {
      name: "rowSpacing",
      warningText: t("optionsForm.warnings.rowSpacing"),
      text: t("optionsForm.numberInputsText.rowSpacing"),
      minVal: 0,
      maxVal: Infinity,
    },
    {
      name: "columnSpacing",
      warningText: t("optionsForm.warnings.columnSpacing"),
      text: t("optionsForm.numberInputsText.columnSpacing"),
      minVal: 0,
      maxVal: Infinity,
    },
  ];
}

export const fontInfo = {
  text: [" FangSong (欢迎)", "Kaiti (欢迎)", "SimSun (欢迎)"],
  values: [`FangSong`, `KaiTi`, `SimSun`],
};

// A list with the name of all the grid options/files
export const gridOptions = ["basic-grid.jpg", "cross.jpg", "square.jpg"];
