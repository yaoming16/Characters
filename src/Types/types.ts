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
    medians?: string[]
}

export interface SquareReactType {
  character: string;
  firstCharacter: boolean;
  font: string;
  columnSpacing: number;
  gridName: string;
  widthInPx: number;
  letterOpacity: number;
}