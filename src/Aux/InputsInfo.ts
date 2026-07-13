import type { TFunction } from "i18next";

import type { allNumberInputsStatesType } from "../Types/types";

//Main accordion inputsinfo aray.
export function createMainInputsInfo(
  squaresPerRow: number, 
  rowsPerCharacter: number,
  t: TFunction,
) {
  return [
    {
      name: "numberOfSquaresPerRow",
      warningName: "warningNumberOfSquaresPerRow",
      warningText: t("optionsForm.warnings.squaresPerRow"),
      text: t("optionsForm.numberInputsText.squaresPerRow"),
      minVal: 1,
      maxVal: Infinity,
    },
    {
      name: "numberOfRowsPerCharacter",
      warningName: "warningNumberOfRowsPerCharacter",
      warningText: t("optionsForm.warnings.rowsPerCharacter"),
      text: t("optionsForm.numberInputsText.rowsPerCharacter"),
      minVal: 1,
      maxVal: Infinity,
    },
    {
      name: "numberPracticeSquares",
      warningName: "warningNumberPracticeSquares",
      warningText: t("optionsForm.warnings.practiceSquaresPerLine"),
      text: t("optionsForm.numberInputsText.practiceSquaresPerLine"),
      minVal: 0,
      maxVal: squaresPerRow,
    },
    {
      name: "numberOfPracticeLines",
      warningName: "warningNumberOfPracticeLines",
      warningText: t("optionsForm.warnings.practiceLines"),
      text: t("optionsForm.numberInputsText.practiceLines"),
      minVal: 1,
      maxVal: rowsPerCharacter,
    },
  ];
}

// Style options inputs info array
export function createStyleInputsInfo(t: TFunction) {
  return [
    {
      name: "titleFontSize",
      warningName: "warningTitleFontSize",
      warningText: t("optionsForm.warnings.titleFontSize"),
      text: t("optionsForm.numberInputsText.titleFontSize"),
      minVal: 0,
      maxVal: 500,
    },
    {
      name: "letterOpacity",
      warningName: "warningLetterOpacity",
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
      name: "numberMarginLeft",
      warningName: "warningNumberMarginLeft",
      warningText: t("optionsForm.warnings.marginLeft"),
      text: t("optionsForm.numberInputsText.marginLeft"),
      minVal: 0,
      maxVal: Infinity,
    },
    {
      name: "numberMarginRight",
      warningName: "warningNumberMarginRight",
      warningText: t("optionsForm.warnings.marginRight"),
      text: t("optionsForm.numberInputsText.marginRight"),
      minVal: 0,
      maxVal: Infinity,
    },
    {
      name: "numberMarginTop",
      warningName: "warningNumberMarginTop",
      warningText: t("optionsForm.warnings.marginTop"),
      text: t("optionsForm.numberInputsText.marginTop"),
      minVal: 0,
      maxVal: Infinity,
    },
    {
      name: "numberMarginBottom",
      warningName: "warningNumberMarginBottom",
      warningText: t("optionsForm.warnings.marginBottom"),
      text: t("optionsForm.numberInputsText.marginBottom"),
      minVal: 0,
      maxVal: Infinity,
    },
    {
      name: "numberRowSpacing",
      warningName: "warningNumberRowSpacing",
      warningText: t("optionsForm.warnings.rowSpacing"),
      text: t("optionsForm.numberInputsText.rowSpacing"),
      minVal: 0,
      maxVal: Infinity,
    },
    {
      name: "numberColumnSpacing",
      warningName: "warningNumberColumnSpacing",
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
