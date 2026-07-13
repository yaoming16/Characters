export type characterInfoType = {
  character?: string;
  definition?: string;
  pinyin?: string[];
  decomposition?: string;
  etymology?: {
    type?: string;
    hint?: string;
  };
  radical?: string;
  matches?: any[];
};

export type characterSVGType = {
  character?: string;
  strokes?: string[];
  medians?: string[];
};

export interface SquareReactType {
  character: string;
  firstCharacter: boolean;
}

import type { Dispatch, SetStateAction } from "react";

export interface NumberInputState {
  warning: boolean;
  setWarning: Dispatch<SetStateAction<boolean>>;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

export interface allNumberInputsStatesType {
  [key: string]: NumberInputState;
}

export interface NumberInputInfoType {
  text: string;
  warningName: string;
  minVal: number;
  maxVal: number;
  warningText: string;
  name: string;
}

export interface OtherSetFunctions {
  setCharacters: Dispatch<SetStateAction<string>>;
  setFont: Dispatch<SetStateAction<string>>;
  setGridName: Dispatch<SetStateAction<string>>;
  setShowDefinition: Dispatch<SetStateAction<boolean>>;
  setShowPinyin: Dispatch<SetStateAction<boolean>>;
  setShowRadical: Dispatch<SetStateAction<boolean>>;
  setShowDecomposition: Dispatch<SetStateAction<boolean>>;
  setShowStrokesOrder: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setTitleItalic: Dispatch<SetStateAction<boolean>>;
  setTitleBold: Dispatch<SetStateAction<boolean>>;
  setTitleUnderline: Dispatch<SetStateAction<boolean>>;
  setSeparationLine: Dispatch<SetStateAction<boolean>>;
}

export interface CheckboxModOption {
  checked: boolean;
  setFunction: Dispatch<SetStateAction<boolean>>;
  text: string;
}

export interface PracticeSheetContextType {

  characters: string;
  setCharacters: Dispatch<SetStateAction<string>>;
  numberOfSquaresPerRow: number;
  setNumberOfSquaresPerRow: Dispatch<SetStateAction<number>>;
  numberOfRowsPerCharacter: number;
  setNumberOfRowsPerCharacter: Dispatch<SetStateAction<number>>;
  numberPracticeSquares: number;
  setNumberPracticeSquares: Dispatch<SetStateAction<number>>;
  numberMarginLeft: number;
  setNumberMarginLeft: Dispatch<SetStateAction<number>>;
  numberMarginRight: number;
  setNumberMarginRight: Dispatch<SetStateAction<number>>;
  numberMarginTop: number;
  setNumberMarginTop: Dispatch<SetStateAction<number>>;
  numberMarginBottom: number;
  setNumberMarginBottom: Dispatch<SetStateAction<number>>;
  numberRowSpacing: number;
  setNumberRowSpacing: Dispatch<SetStateAction<number>>;
  numberColumnSpacing: number;
  setNumberColumnSpacing: Dispatch<SetStateAction<number>>;
  letterOpacity: number;
  setLetterOpacity: Dispatch<SetStateAction<number>>;
  numberOfPracticeLines: number;
  setNumberOfPracticeLines: Dispatch<SetStateAction<number>>;
  font: string;
  setFont: Dispatch<SetStateAction<string>>;
  gridName: string;
  setGridName: Dispatch<SetStateAction<string>>;
  showDefinition: boolean;
  setShowDefinition: Dispatch<SetStateAction<boolean>>;
  showPinyin: boolean;
  setShowPinyin: Dispatch<SetStateAction<boolean>>;
  showRadical: boolean;
  setShowRadical: Dispatch<SetStateAction<boolean>>;
  showDecomposition: boolean;
  setShowDecomposition: Dispatch<SetStateAction<boolean>>;
  showStrokesOrder: boolean;
  setShowStrokesOrder: Dispatch<SetStateAction<boolean>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  titleItalic: boolean;
  setTitleItalic: Dispatch<SetStateAction<boolean>>;
  titleBold: boolean;
  setTitleBold: Dispatch<SetStateAction<boolean>>;
  titleUnderline: boolean;
  setTitleUnderline: Dispatch<SetStateAction<boolean>>;
  separationLine: boolean;
  setSeparationLine: Dispatch<SetStateAction<boolean>>;
  titleFontSize: number;
  setTitleFontSize: Dispatch<SetStateAction<number>>;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  showPreviewer: boolean;
  setShowPreviewer: Dispatch<SetStateAction<boolean>>;
  widthOfTheSquaresInPx: number;
  setWidthOfTheSquaresInPx: Dispatch<SetStateAction<number>>;
  changeToPreviewer: boolean;
  setchangeToPreviewer: Dispatch<SetStateAction<boolean>>;
  warningNumberOfSquaresPerRow: boolean;
  setWarningNumberOfSquaresPerRow: Dispatch<SetStateAction<boolean>>;
  warningNumberOfRowsPerCharacter: boolean;
  setWarningNumberOfRowsPerCharacter: Dispatch<SetStateAction<boolean>>;
  warningNumberPracticeSquares: boolean;
  setWarningNumberPracticeSquares: Dispatch<SetStateAction<boolean>>;
  warningNumberMarginLeft: boolean;
  setWarningNumberMarginLeft: Dispatch<SetStateAction<boolean>>;
  warningNumberMarginRight: boolean;
  setWarningNumberMarginRight: Dispatch<SetStateAction<boolean>>;
  warningNumberMarginTop: boolean;
  setWarningNumberMarginTop: Dispatch<SetStateAction<boolean>>;
  warningNumberMarginBottom: boolean;
  setWarningNumberMarginBottom: Dispatch<SetStateAction<boolean>>;
  warningNumberRowSpacing: boolean;
  setWarningNumberRowSpacing: Dispatch<SetStateAction<boolean>>;
  warningNumberColumnSpacing: boolean;
  setWarningNumberColumnSpacing: Dispatch<SetStateAction<boolean>>;
  warningLetterOpacity: boolean;
  setWarningLetterOpacity: Dispatch<SetStateAction<boolean>>;
  warningNumberOfPracticeLines: boolean;
  setWarningNumberOfPracticeLines: Dispatch<SetStateAction<boolean>>;
  warningTitleFontSize: boolean;
  setWarningTitleFontSize: Dispatch<SetStateAction<boolean>>;
}
