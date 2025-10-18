import html2pdf from "html2pdf.js";
import Preview from "./Components/Preview";
import OptionsForm from "./Components/OptionsForm";
import Toggle from "./Components/Form/Toggle";
import DownloadButton from "./Components/Form/DownloadButton";
import { useState, useEffect } from "react";
import React from "react";
import ReactPDFViewer from "./Components/ReactPDFViewer";
import { Modal } from "flowbite-react";

function App() {
  // Fuction to check if there are no warnings and show the final previewer
  function changeStateIfNoWarnings(
    warningsArr: boolean[],
    setFunction: React.Dispatch<React.SetStateAction<boolean>>
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
    const spaceBetweenSquares = numberColumnSpacing * (numberOfBoxesPerRow - 1);
    const newWidth = Math.floor(
      (maxWidth - spaceBetweenSquares - numberMarginRight - numberMarginLeft) /
        numberOfBoxesPerRow
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

  // Use State for the input that selects the characters to show

  let [characters, setCharacters] = useState("");

  //Use State for the input that selects the Boxes per row

  let [numberOfBoxesPerRow, setNumberOfBoxesPerRow] = useState(5);
  let [warningNumberOfBoxesPerRow, setWarningNumberOfBoxesPerRow] =
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

  //Use state for the font
  let [font, setFont] = useState(
    `"FangSong", "仿宋", "STFangSong", "华文仿宋", "Noto Serif SC", serif`
  );

  // Use state for grid selection
  let [gridName, setGridName] = useState("basic-grid.jpg");

  // Option to show definition
  let [showDefinition, setShowDefinition] = useState(false);

  // Option to show the pinyin
  let [showPinyin, setShowPinyin] = useState(false);

  // Option to show the previewer
  let [showPreviewer, setShowPreviewer] = useState(true);

  // State to store the width of the squares
  const [widthOfTheSquaresInPx, setWidthOfTheSquaresInPx] = useState<number>(0);
  //calculateDivWidth();

  // State to change between the previewer and the options form
  const [changeToPreviewer, setchangeToPreviewer] = useState(false);

  // State for the modal
  const [openModal, setOpenModal] = useState(false);

  // Update width when previewer visibility changes or relevant props change
  useEffect(() => {
    calculateDivWidth();
  }, [
    changeToPreviewer,
    showPreviewer,
    numberOfBoxesPerRow,
    numberColumnSpacing,
    numberMarginLeft,
    numberMarginRight,
  ]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      calculateDivWidth();
      //getScalePreviewer();
    });
  }, []);

  // All states of number inputs will be stored here so is easier to send them  to the Options form
  let allNumberInputsStates: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    number,
    React.Dispatch<React.SetStateAction<number>>
  ][] = [
    [
      warningNumberOfBoxesPerRow,
      setWarningNumberOfBoxesPerRow,
      numberOfBoxesPerRow,
      setNumberOfBoxesPerRow,
    ],
    [
      warningNumberOfRowsPerCharacter,
      setWarningNumberOfRowsPerCharacter,
      numberOfRowsPerCharacter,
      setNumberOfRowsPerCharacter,
    ],
    [
      warningNumberPracticeSquares,
      setWarningNumberPracticeSquares,
      numberPracticeSquares,
      setNumberPracticeSquares,
    ],
    [
      warningLetterOpacity,
      setWarningLetterOpacity,
      letterOpacity,
      setLetterOpacity,
    ],
    [
      warningNumberMarginLeft,
      setWarningNumberMarginLeft,
      numberMarginLeft,
      setNumberMarginLeft,
    ],
    [
      warningNumberMarginRight,
      setWarningNumberMarginRight,
      numberMarginRight,
      setNumberMarginRight,
    ],
    [
      warningNumberMarginTop,
      setWarningNumberMarginTop,
      numberMarginTop,
      setNumberMarginTop,
    ],
    [
      warningNumberMarginBottom,
      setWarningNumberMarginBottom,
      numberMarginBottom,
      setNumberMarginBottom,
    ],
    [
      warningNumberRowSpacing,
      setWarningNumberRowSpacing,
      numberRowSpacing,
      setNumberRowSpacing,
    ],
    [
      warningNumberColumnSpacing,
      setWarningNumberColumnSpacing,
      numberColumnSpacing,
      setNumberColumnSpacing,
    ],
  ];

  {
    /* This one is to send the states to the previewer */
  }
  let statesToShow: [
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
    number
  ] = [
    characters,
    numberOfBoxesPerRow,
    numberOfRowsPerCharacter,
    numberPracticeSquares,
    font,
    numberRowSpacing,
    numberColumnSpacing,
    gridName,
    showDefinition,
    showPinyin,
    letterOpacity,
  ];

  {
    /* This array is to later check that every warning is false */
  }
  let warningArr = [
    warningNumberOfBoxesPerRow,
    warningNumberOfRowsPerCharacter,
    warningNumberPracticeSquares,
    warningNumberMarginLeft,
    warningNumberMarginRight,
    warningNumberMarginTop,
    warningNumberMarginBottom,
    warningNumberRowSpacing,
    warningNumberColumnSpacing,
  ];

  // Style for the margins previewer
  const marginStylePreview = {
    margin: `${numberMarginTop}px ${numberMarginRight}px ${numberMarginBottom}px ${numberMarginLeft}px`,
  };

  return (
    <>
      <div className="border-gray-300 z-10">
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
                label="Show Previewer"
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
                label={changeToPreviewer ? "Previewer" : "Options"}
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
                otherSetFunctions={[
                  setCharacters,
                  setFont,
                  setGridName,
                  setShowDefinition,
                  setShowPinyin,
                ]}
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
        onClose={() => setOpenModal(false)}
        className="!bg-black/70"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="overflow-auto border border-gray-300 rounded-lg shadow-lg p-5">
            <ReactPDFViewer
              id={"previewer"}
              allStates={statesToShow}
              widthOfTheSquaresInPx={calculateNewWidth(595)}
              marginTop={numberMarginTop}
              marginRight={numberMarginRight}
              marginBottom={numberMarginBottom}
              marginLeft={numberMarginLeft}
            ></ReactPDFViewer>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
