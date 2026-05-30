import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Buffer } from "buffer";

import { useTranslation } from "react-i18next";

import { allStatesType } from "../../Types/types";
import { useCharacterData } from "../../hooks/useCharacterData";

import ReactPDFViewer from "../PraticeSheetComp/ReactPDFViewer";
import Preview from "../PraticeSheetComp/Preview";
import OptionsForm from "../PraticeSheetComp/OptionsForm";
import Toggle from "../Form/Toggle";
import DownloadButton from "../Form/DownloadButton";

function App() {
  (window as any).Buffer = Buffer;

  // Fuction to check if there are no warnings and show the final previewer
  function changeStateIfNoWarnings(
    warningsArr: boolean[],
    setFunction: React.Dispatch<React.SetStateAction<boolean>>,
  ): void {
    if (warningsArr.some((warning) => warning)) {
      console.error("Cannot generate PDF due to warnings.");
      return;
    }
    setFunction(true);
  }

  function getDivWidth(id: string): number {
    const previewDivContainer = document.getElementById(id)?.offsetWidth;
    if (previewDivContainer) {
      return previewDivContainer;
    }
    return 0;
  }

  function calculateNewWidth(maxWidth: number): number {
    const spaceBetweenSquares =
      numberColumnSpacing * (numberOfSquaresPerRow - 1);
    const newWidth = Math.floor(
      (maxWidth - spaceBetweenSquares - numberMarginRight - numberMarginLeft) /
        numberOfSquaresPerRow,
    );
    return newWidth;
  }

  // Function to recalculate the width of the squares when the user resizes the window or changes the number of boxes per row or the margins or the spacing between columns
  function calculateDivWidth() {
    if (showPreviewer) {
      // Wait a moment for the element to be visible, then recalculate
      const timer = setTimeout(() => {
        const previewDivContainer = getDivWidth("previewer-container");
        if (previewDivContainer) {
          const newWidth = calculateNewWidth(previewDivContainer);
          if (newWidth > 0) {
            setWidthOfTheSquaresInPx(newWidth);
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }

  const charactersInfoResponse = useCharacterData();

  // Use State for the input that selects the characters to show

  let [characters, setCharacters] = useState("你好");

  //Use State for the input that selects the Boxes per row

  let [numberOfSquaresPerRow, setNumberOfSquaresPerRow] = useState(8);
  let [warningNumberOfSquaresPerRow, setWarningNumberOfSquaresPerRow] =
    useState(false);

  //Use State for the input that selects the rows per character

  let [numberOfRowsPerCharacter, setNumberOfRowsPerCharacter] = useState(2);
  let [warningNumberOfRowsPerCharacter, setWarningNumberOfRowsPerCharacter] =
    useState(false);

  // Use state for Practice Squares

  let [numberPracticeSquares, setNumberPracticeSquares] = useState(2);
  let [warningNumberPracticeSquares, setWarningNumberPracticeSquares] =
    useState(false);

  //Use state for Margin left

  let [numberMarginLeft, setNumberMarginLeft] = useState(50);
  let [warningNumberMarginLeft, setWarningNumberMarginLeft] = useState(false);

  // Use state for Margin right

  let [numberMarginRight, setNumberMarginRight] = useState(50);
  let [warningNumberMarginRight, setWarningNumberMarginRight] = useState(false);

  // Use state for Margin top

  let [numberMarginTop, setNumberMarginTop] = useState(50);
  let [warningNumberMarginTop, setWarningNumberMarginTop] = useState(false);

  //Use state for Margin bottom

  let [numberMarginBottom, setNumberMarginBottom] = useState(50);
  let [warningNumberMarginBottom, setWarningNumberMarginBottom] =
    useState(false);

  //Use state for Row spacing

  let [numberRowSpacing, setNumberRowSpacing] = useState(10);
  let [warningNumberRowSpacing, setWarningNumberRowSpacing] = useState(false);

  //Use state for Column Spacing

  let [numberColumnSpacing, setNumberColumnSpacing] = useState(0);
  let [warningNumberColumnSpacing, setWarningNumberColumnSpacing] =
    useState(false);

  // Use state for the letter opacity
  let [letterOpacity, setLetterOpacity] = useState(100);
  let [warningLetterOpacity, setWarningLetterOpacity] = useState(false);

  // Option for how many lines the user wants the practice character to show
  let [numberOfPracticeLines, setNumberOfPracticeLines] = useState(1);
  let [warningNumberOfPracticeLines, setWarningNumberOfPracticeLines] =
    useState(false);

  //Use state for the font
  let [font, setFont] = useState("FangSong");

  // Use state for grid selection
  let [gridName, setGridName] = useState("basic-grid.jpg");

  // Option to show definition
  let [showDefinition, setShowDefinition] = useState(true);

  // Option to show the pinyin
  let [showPinyin, setShowPinyin] = useState(true);

  // Option to show the radical
  let [showRadical, setShowRadical] = useState(true);

  // Option to show the decomposition
  let [showDecomposition, setShowDecomposition] = useState(true);

  // Option to show the strokes order
  let [showStrokesOrder, setShowStrokesOrder] = useState(true);

  // Option to show the previewer
  let [showPreviewer, setShowPreviewer] = useState(true);

  // State to store the width of the squares
  let [widthOfTheSquaresInPx, setWidthOfTheSquaresInPx] = useState<number>(0);

  // State to change between the previewer and the options form
  let [changeToPreviewer, setchangeToPreviewer] = useState(false);

  // State for the modal
  let [openModal, setOpenModal] = useState(false);

  // Title options
  //State for title of the page
  let [title, setTitle] = useState("");

  //italic
  let [titleItalic, setTitleItalic] = useState(false);

  //bold
  let [titleBold, setTitleBold] = useState(false);

  //undeline
  let [titleUnderline, setTitleUnderline] = useState(false);

  //State for a separation line between characters squares
  let [separationLine, setSeparationLine] = useState(false);

  // State for the title font size
  let [titleFontSize, setTitleFontSize] = useState(24);
  let [warningTitleFontSize, setWarningTitleFontSize] = useState(false);

  // Remove practice lines warnig if rows per character increases to a value equal or higher than practice lines
  useEffect(() => {
    if (
      numberOfRowsPerCharacter >= numberOfPracticeLines &&
      numberOfPracticeLines >= 1
    ) {
      setWarningNumberOfPracticeLines(false);
    }
  }, [numberOfRowsPerCharacter, numberOfPracticeLines]);

  // Update width when previewer visibility changes or relevant props change
  useEffect(() => {
    calculateDivWidth();
  }, [
    changeToPreviewer,
    showPreviewer,
    numberOfSquaresPerRow,
    numberColumnSpacing,
    numberMarginLeft,
    numberMarginRight,
  ]);

  useEffect(() => {
    // We only want to resize when the modal is not open
    const handler = () => {
      if (!openModal) {
        calculateDivWidth();
      }
    };
    window.addEventListener("resize", handler);
    // Cleanup function
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [openModal]);

  // If screen is less than 1024px when the page loads we want the preview to start closed
  useEffect(() => {
    let viewportWidth = window.innerWidth;
    if (viewportWidth < 1024) {
      setShowPreviewer(false);
    }
  }, []);

  // All states of number inputs will be stored here as objects for clarity
  let allNumberInputsStates = {
    squaresPerRow: {
      warning: warningNumberOfSquaresPerRow,
      setWarning: setWarningNumberOfSquaresPerRow,
      value: numberOfSquaresPerRow,
      setValue: setNumberOfSquaresPerRow,
    },
    rowsPerCharacter: {
      warning: warningNumberOfRowsPerCharacter,
      setWarning: setWarningNumberOfRowsPerCharacter,
      value: numberOfRowsPerCharacter,
      setValue: setNumberOfRowsPerCharacter,
    },
    practiceSquaresPerLine: {
      warning: warningNumberPracticeSquares,
      setWarning: setWarningNumberPracticeSquares,
      value: numberPracticeSquares,
      setValue: setNumberPracticeSquares,
    },
    practiceLines: {
      warning: warningNumberOfPracticeLines,
      setWarning: setWarningNumberOfPracticeLines,
      value: numberOfPracticeLines,
      setValue: setNumberOfPracticeLines,
    },
    titleFontSize: {
      warning: warningTitleFontSize,
      setWarning: setWarningTitleFontSize,
      value: titleFontSize,
      setValue: setTitleFontSize,
    },
    letterOpacity: {
      warning: warningLetterOpacity,
      setWarning: setWarningLetterOpacity,
      value: letterOpacity,
      setValue: setLetterOpacity,
    },
    marginLeft: {
      warning: warningNumberMarginLeft,
      setWarning: setWarningNumberMarginLeft,
      value: numberMarginLeft,
      setValue: setNumberMarginLeft,
    },
    marginRight: {
      warning: warningNumberMarginRight,
      setWarning: setWarningNumberMarginRight,
      value: numberMarginRight,
      setValue: setNumberMarginRight,
    },
    marginTop: {
      warning: warningNumberMarginTop,
      setWarning: setWarningNumberMarginTop,
      value: numberMarginTop,
      setValue: setNumberMarginTop,
    },
    marginBottom: {
      warning: warningNumberMarginBottom,
      setWarning: setWarningNumberMarginBottom,
      value: numberMarginBottom,
      setValue: setNumberMarginBottom,
    },
    rowSpacing: {
      warning: warningNumberRowSpacing,
      setWarning: setWarningNumberRowSpacing,
      value: numberRowSpacing,
      setValue: setNumberRowSpacing,
    },
    columnSpacing: {
      warning: warningNumberColumnSpacing,
      setWarning: setWarningNumberColumnSpacing,
      value: numberColumnSpacing,
      setValue: setNumberColumnSpacing,
    },
  };

  {
    /* This one is to send the states to the previewer */
  }
  let statesToShow: allStatesType = [
    characters,
    numberOfSquaresPerRow,
    numberOfRowsPerCharacter,
    numberPracticeSquares,
    font,
    numberRowSpacing,
    numberColumnSpacing,
    gridName,
    showDefinition,
    showPinyin,
    showRadical,
    showDecomposition,
    letterOpacity,
    numberOfPracticeLines,
    showStrokesOrder,
    title,
    titleFontSize,
    titleItalic,
    titleBold,
    titleUnderline,
    separationLine,
  ];

  {
    /* This array is to later check that every warning is false */
  }
  let warningArr = [
    warningNumberOfSquaresPerRow,
    warningNumberOfRowsPerCharacter,
    warningNumberPracticeSquares,
    warningNumberMarginLeft,
    warningNumberMarginRight,
    warningNumberMarginTop,
    warningNumberMarginBottom,
    warningNumberRowSpacing,
    warningNumberColumnSpacing,
    warningLetterOpacity,
    warningNumberOfPracticeLines,
    warningTitleFontSize,
  ];

  // Style for the margins previewer
  const marginStylePreview = {
    margin: `${numberMarginTop}px ${numberMarginRight}px ${numberMarginBottom}px ${numberMarginLeft}px`,
  };

  const { t } = useTranslation("global");

  return (
    <>
      <div className="border-gray-300 z-10 flex flex-col">
        <h1 className="font-semibold mt-4 ml-auto mr-auto text-4xl font-[KaiTi]">
          {t("main.title")}
        </h1>
        <div
          id="container"
          className={`w-3/4 m-auto mt-10 mb-10 border border-gray-300 p-10 rounded-lg shadow-lg flex ${
            changeToPreviewer ? "flex-col" : "flex-row"
          } `}
        >
          <div
            className={`flex flex-col ${
              showPreviewer ? "max-w-1/3" : "max-w-full  mr-auto ml-auto"
            }`}
          >
            <div className="mb-5 flex flex-row justify-around">
              <Toggle
                checked={showPreviewer}
                label={t("main.switchView.showPreviewer")}
                onChange={() => {
                  setShowPreviewer(!showPreviewer);
                  if (changeToPreviewer) {
                    setchangeToPreviewer(false);
                  }
                }}
                className="mr-5"
              />
              <Toggle
                checked={changeToPreviewer}
                label={
                  changeToPreviewer
                    ? t("main.switchView.preview")
                    : t("main.switchView.options")
                }
                onChange={() => {
                  setchangeToPreviewer(!changeToPreviewer);
                }}
                className={`${showPreviewer ? "!hidden " : ""}`}
              />
            </div>
            <div className={`${changeToPreviewer ? "hidden" : ""}`}>
              <OptionsForm
                allNumberInputsStates={allNumberInputsStates}
                className=""
                charactersInfoResponse={charactersInfoResponse}
                characters={characters}
                otherSetFunctions={{
                  setCharacters,
                  setFont,
                  setGridName,
                  setShowDefinition,
                  setShowPinyin,
                  setShowRadical,
                  setShowDecomposition,
                  setShowStrokesOrder,
                  setTitle,
                  setTitleItalic,
                  setTitleBold,
                  setTitleUnderline,
                  setSeparationLine,
                }}
              ></OptionsForm>
            </div>
            {/* Download button that only appears when the previewer is shown or when we are in changeToPreviewer mode and the options form is hidden */}
            <DownloadButton
              onClick={() => {
                changeStateIfNoWarnings(warningArr, setOpenModal);
              }}
              warningArr={warningArr}
              className={`${changeToPreviewer ? "hidden" : ""}`}
            />
          </div>

          <div
            className={`ml-10  w-2/3 rounded-lg shadow-lg border 
              border-gray-300 $
               ${showPreviewer ? "" : changeToPreviewer ? "" : "hidden"} 
              ${changeToPreviewer ? "mr-auto ml-auto" : ""}`}
            id="previewer-container"
          >
            <div style={marginStylePreview} id="previewer-div">
              {/* We need to check if every warning is false to know if the previewer should be shown or not */}
              {warningArr.every((val) => val === false) ? (
                <Preview
                  id={"previewer"}
                  allStates={statesToShow}
                  widthOfTheSquaresInPx={widthOfTheSquaresInPx}
                  charactersInfoResponse={charactersInfoResponse}
                ></Preview>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* Download button that only appears when the previewer is not shown */}
          <DownloadButton
            onClick={() => {
              changeStateIfNoWarnings(warningArr, setOpenModal);
            }}
            warningArr={warningArr}
            className={`${showPreviewer || !changeToPreviewer ? "hidden" : ""}`}
          />
        </div>
      </div>

      {/* Modal for preview */}
      <Modal
        show={openModal}
        size="5xl"
        position="center"
        dismissible
        onClose={() => {
          setOpenModal(false);
          // When modal opened, resizing was stoped, so we need to recalculate it in case user changed screen width
          calculateDivWidth();
        }}
        className="!bg-black/70"
      >
        <ModalHeader />
        <ModalBody>
          <div className="overflow-auto border border-gray-300 rounded-lg shadow-lg p-5">
            <ReactPDFViewer
              id={"previewer"}
              allStates={statesToShow}
              widthOfTheSquaresInPx={calculateNewWidth(595)}
              charactersInfoResponse={charactersInfoResponse}
              marginTop={numberMarginTop}
              marginRight={numberMarginRight}
              marginBottom={numberMarginBottom}
              marginLeft={numberMarginLeft}
            ></ReactPDFViewer>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default App;

//https://github.com/skishore/makemeahanzi
