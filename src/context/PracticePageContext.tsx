import { createContext, useContext, useState } from "react";

import { PracticeSheetContextType } from "../Types/types";

const PracticeSheetContext = createContext<
  PracticeSheetContextType | undefined
>(undefined);

export function usePracticeSheet() {
  const ctx = useContext(PracticeSheetContext);
  if (!ctx) {
    throw new Error(
      "usePracticeSheet must be used within a PracticeSheetProvider",
    );
  }
  return ctx;
}

export function PracticeSheetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Below i will put states that need to be shared. Next to each one I will add a comment with what the state is used for (Comment and name sof the states are the same I had on PracticeSheetPage).
  // Main Options
  const [characters, setCharacters] = useState("你好"); // Characters to practice

  const [numberOfSquaresPerRow, setNumberOfSquaresPerRow] = useState(8); //Use State for the input that selects the Boxes per row.
  const [numberOfRowsPerCharacter, setNumberOfRowsPerCharacter] = useState(2); //Use State for the input that selects the rows per character.
  const [numberPracticeSquares, setNumberPracticeSquares] = useState(2); // Use state for Practice Squares
  const [font, setFont] = useState("FangSong"); //Use state for the font
  const [gridName, setGridName] = useState("basic-grid.jpg"); // Use state for grid selection

  // This are states for main options checkboxes
  const [showDefinition, setShowDefinition] = useState(true); // Option to show definition
  const [showPinyin, setShowPinyin] = useState(true); // Option to show the pinyin
  const [showRadical, setShowRadical] = useState(true); // Option to show the radical
  const [showDecomposition, setShowDecomposition] = useState(true); // Option to show the decomposition
  const [showStrokesOrder, setShowStrokesOrder] = useState(true); // Option to show the strokes order

  //Advances Options
  const [numberMarginLeft, setNumberMarginLeft] = useState(50); //Use state for Margin left
  const [numberMarginRight, setNumberMarginRight] = useState(50); // Use state for Margin right
  const [numberMarginTop, setNumberMarginTop] = useState(50); // Use state for Margin top
  const [numberMarginBottom, setNumberMarginBottom] = useState(50); // Use state for Margin bottom
  const [numberRowSpacing, setNumberRowSpacing] = useState(10); //Use state for Row spacing
  const [numberColumnSpacing, setNumberColumnSpacing] = useState(0); //Use state for Column Spacing
  const [letterOpacity, setLetterOpacity] = useState(100); // Use state for the letter opacity
  const [numberOfPracticeLines, setNumberOfPracticeLines] = useState(1); // Option for how many lines the user wants the practice character to show

  //Title options
  const [title, setTitle] = useState(""); //State for title of the page
  const [titleFontSize, setTitleFontSize] = useState(24); // State for the title font size
  const [titleItalic, setTitleItalic] = useState(false); //italic
  const [titleBold, setTitleBold] = useState(false); //bold
  const [titleUnderline, setTitleUnderline] = useState(false); //undeline
  const [separationLine, setSeparationLine] = useState(false); //State for a separation line between characters squares

  //Configuration states
  const [openModal, setOpenModal] = useState(false); // State for the modal
  const [showPreviewer, setShowPreviewer] = useState(true); // Option to show the previewer
  const [widthOfTheSquaresInPx, setWidthOfTheSquaresInPx] = useState<number>(0); // State to store the width of the squares
  const [changeToPreviewer, setchangeToPreviewer] = useState(false); // State to change between the previewer and the options form

  //Warnings
  const [warningNumberOfSquaresPerRow, setWarningNumberOfSquaresPerRow] =
    useState(false);
  const [warningNumberOfRowsPerCharacter, setWarningNumberOfRowsPerCharacter] =
    useState(false);
  const [warningNumberPracticeSquares, setWarningNumberPracticeSquares] =
    useState(false);
  const [warningNumberMarginLeft, setWarningNumberMarginLeft] = useState(false);
  const [warningNumberMarginRight, setWarningNumberMarginRight] =
    useState(false);
  const [warningNumberMarginTop, setWarningNumberMarginTop] = useState(false);
  const [warningNumberMarginBottom, setWarningNumberMarginBottom] =
    useState(false);
  const [warningNumberRowSpacing, setWarningNumberRowSpacing] = useState(false);
  const [warningNumberColumnSpacing, setWarningNumberColumnSpacing] =
    useState(false);
  const [warningLetterOpacity, setWarningLetterOpacity] = useState(false);
  const [warningNumberOfPracticeLines, setWarningNumberOfPracticeLines] =
    useState(false);
  const [warningTitleFontSize, setWarningTitleFontSize] = useState(false);

  const value: PracticeSheetContextType = {
    characters,
    setCharacters,
    numberOfSquaresPerRow,
    setNumberOfSquaresPerRow,
    numberOfRowsPerCharacter,
    setNumberOfRowsPerCharacter,
    numberPracticeSquares,
    setNumberPracticeSquares,
    font,
    setFont,
    gridName,
    setGridName,
    showDefinition,
    setShowDefinition,
    showPinyin,
    setShowPinyin,
    showRadical,
    setShowRadical,
    showDecomposition,
    setShowDecomposition,
    showStrokesOrder,
    setShowStrokesOrder,
    title,
    setTitle,
    titleFontSize,
    setTitleFontSize,
    titleItalic,
    setTitleItalic,
    titleBold,
    setTitleBold,
    titleUnderline,
    setTitleUnderline,
    separationLine,
    setSeparationLine,
    numberMarginLeft,
    setNumberMarginLeft,
    numberMarginRight,
    setNumberMarginRight,
    numberMarginTop,
    setNumberMarginTop,
    numberMarginBottom,
    setNumberMarginBottom,
    numberRowSpacing,
    setNumberRowSpacing,
    numberColumnSpacing,
    setNumberColumnSpacing,
    letterOpacity,
    setLetterOpacity,
    numberOfPracticeLines,
    setNumberOfPracticeLines,
    openModal,
    setOpenModal,
    showPreviewer,
    setShowPreviewer,
    widthOfTheSquaresInPx,
    setWidthOfTheSquaresInPx,
    changeToPreviewer,
    setchangeToPreviewer,
    warningNumberOfSquaresPerRow,
    setWarningNumberOfSquaresPerRow,
    warningNumberOfRowsPerCharacter,
    setWarningNumberOfRowsPerCharacter,
    warningNumberPracticeSquares,
    setWarningNumberPracticeSquares,
    warningNumberMarginLeft,
    setWarningNumberMarginLeft,
    warningNumberMarginRight,
    setWarningNumberMarginRight,
    warningNumberMarginTop,
    setWarningNumberMarginTop,
    warningNumberMarginBottom,
    setWarningNumberMarginBottom,
    warningNumberRowSpacing,
    setWarningNumberRowSpacing,
    warningNumberColumnSpacing,
    setWarningNumberColumnSpacing,
    warningLetterOpacity,
    setWarningLetterOpacity,
    warningNumberOfPracticeLines,
    setWarningNumberOfPracticeLines,
    warningTitleFontSize,
    setWarningTitleFontSize,
  };

  return (
    <PracticeSheetContext.Provider value={value}>
      {children}
    </PracticeSheetContext.Provider>
  );
}
