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