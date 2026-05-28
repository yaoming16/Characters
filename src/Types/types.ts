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
  font: string;
  columnSpacing: number;
  gridName: string;
  widthInPx: number;
  letterOpacity: number;
}

export type allStatesType = [
  string,
  number,
  number,
  number,
  string,
  number,
  number,
  string,
  boolean,
  boolean,
  number,
  number,
  boolean,
  string,
  number,
  boolean,
  boolean,
  boolean,
  boolean,
];

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
  setShowStrokesOrder: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setTitleItalic: Dispatch<SetStateAction<boolean>>;
  setTitleBold: Dispatch<SetStateAction<boolean>>;
  setTitleUnderline: Dispatch<SetStateAction<boolean>>;
  setSeparationLine: Dispatch<SetStateAction<boolean>>;
}
