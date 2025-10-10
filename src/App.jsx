import html2pdf from "html2pdf.js";
import Preview from "./Components/Preview";
import OptionsForm from "./Components/OptionsForm";
//
import { useState } from "react";

function App() {
  const options = {
    margin: [0, 0, 0, 0],
    filename: "characters.pdf",
    image: {
      type: "png", // Change to PNG for better quality of images with transparency
      quality: 1.0, // Maximum image quality
    },
    html2canvas: {
      scale: 4, // Reduced from 4 to 2 so the grid can be seen
      useCORS: true, // Allows loading external fonts
      allowTaint: true, // Allows "tainted" content
      letterRendering: true, // Improves text rendering
      logging: false, // Disables logs for better performance
      width: null, // Automatic width based on content
      height: null, // Automatic height
      scrollX: 0,
      scrollY: 0,
      imageTimeout: 15000, // More time to load background images
      removeContainer: true, // Improves capture
      pagebreak: { mode: "avoid-all" },
    },
    jsPDF: {
      unit: "pt", // Points for greater precision than inches
      format: "a4",
      orientation: "portrait",
      compress: false, // No compression for higher quality
      precision: 16, // Greater decimal precision
    },
    pagebreak: {
      mode: ["avoid-all", "css", "legacy"], // Better page breaks
    },
  };

  async function downloadPDF(id, options, warningsArr) {
    // Check for warnings before generating PDF
    if (warningsArr.some((warning) => warning)) {
      console.error("Cannot generate PDF due to warnings.");
      return;
    }

    let originalElement = document.getElementById(id);
    await html2pdf().from(originalElement).set(options).save();

    /*// Clone the element
    let clonedElement = originalElement.cloneNode(true);
    clonedElement.id = id + "-pdf-clone";

    // Add to DOM temporarily
    document.body.appendChild(clonedElement);

    try {
      await html2pdf().from(clonedElement).set(options).save();
    } finally {
      document.body.removeChild(clonedElement);
    }*/
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

  // All states of number inputs will be stored here so is easier to send them  to the Options form

  let allNumberInputsStates = [
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
  let statesToShow = [
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

  // Style for the margins
  const marginStyle = {
    margin: `${numberMarginTop}px ${numberMarginRight}px ${numberMarginBottom}px ${numberMarginLeft}px`,
  };

  // We need to calculate the width of the squares based on the amount of squares the user wants to have on the file
  const previewDivContainer = document.getElementById(
    "previewer-container"
  )?.offsetWidth;
  const spaceBetweenSquares = numberColumnSpacing * (numberOfBoxesPerRow - 1);
  const widthOfTheSquaresInPx = Math.floor(
    (previewDivContainer -
      spaceBetweenSquares -
      numberMarginRight -
      numberMarginLeft) /
      numberOfBoxesPerRow
  );

  return (
    <>
      <div className=" border-gray-300 ">
        <div
          id="container"
          className="w-3/4 m-auto flex flex-row mt-10 mb-10 border border-gray-300 p-10 rounded-lg shadow-lg "
        >
          <div className="flex flex-col max-w-1/3">
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
              showDefinition={showDefinition}
            ></OptionsForm>
            <div>
              <button
                className="w-full mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={() => {
                  downloadPDF("previewer-div", options, warningArr);
                }}
              >
                Download
              </button>
              {warningArr.some((val) => val === true) ? (
                <p className="text-red-600 text-center">
                  Please fix the errors in the form to be able to download the
                  PDF
                </p>
              ) : null}
            </div>
          </div>
          <div
            className={`ml-10  w-2/3 rounded-lg shadow-lg border 
              border-gray-300 overflow-auto `}
            id="previewer-container"
          >
            <div
              style={marginStyle}
              id="previewer-div"
              className="overflow-auto"
            >
              {/* We need to check if every warning is false to know if the previewer should be shown or not */}
              {warningArr.every((val) => val === false) ? (
                <Preview
                  id={"previewer"}
                  characters={characters}
                  allStates={statesToShow}
                  widthOfTheSquaresInPx={widthOfTheSquaresInPx}
                  className="overflow-hidden"
                ></Preview>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
