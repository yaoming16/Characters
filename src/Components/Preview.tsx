import Square from "./Square";
import { allStatesType } from "../Types/types";
import {
  returnInfoOrNotFound,
  createSVGStrokes,
} from "../Functions/previewerFunctions";
import Loading from "./Loading";

interface PreviewPropsType {
  id: string;
  className?: string;
  allStates: allStatesType;
  widthOfTheSquaresInPx: number;
  charactersInfoResponse : any
}

function Preview({
  id,
  className = "",
  allStates,
  widthOfTheSquaresInPx,
  charactersInfoResponse
}: PreviewPropsType) {
  const {
    charactersInfo: CharactersInfo,
    characterSVGData,
    loading,
    error,
  } = charactersInfoResponse

  let [
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
    numberOfPracticeLines,
    showStrokesOrder,
    title,
    titleFontSize,
    titleItalic,
    titleBold,
    titleUnderline,
    separationLine,
  ] = allStates;

  const listCharacters = characters.split("").map((character, i) => {
    if (character !== " ") {
      return (
        <div key={`${character}-container-${i}`}>
          <div
            style={{
              marginTop: numberRowSpacing + 10 + "px",
            }}
            className="flex flex-row"
          >
            <p
              className={
                "border border-solid p-2 text-[0.8rem] " +
                (showDefinition ? "" : " hidden")
              }
            >
              <span className="font-bold mr-2">Definition:</span>
              {returnInfoOrNotFound(
                CharactersInfo,
                character,
                "definition",
                "Could not find the character definition",
              )}
            </p>
            <p
              className={
                "border border-solid p-2 text-[0.8rem] border-l-0 " +
                (showPinyin ? "" : " hidden") +
                (showDefinition ? "" : " border-l-1")
              }
            >
              <span className={"font-bold mr-2"}>Pinyin:</span>
              {returnInfoOrNotFound(
                CharactersInfo,
                character,
                "pinyin",
                "Could not find the Pinyin",
              )}
            </p>
          </div>
          <div>
            {createSVGStrokes(
              character,
              characterSVGData,
              showStrokesOrder,
              false,
            )}
          </div>
          {[...Array(numberOfRowsPerCharacter).keys()].map((index) =>
            createOneLine(
              character,
              font,
              numberOfBoxesPerRow,
              numberPracticeSquares,
              /* For the first character we send the spacing the user selected plus an extra so we can differentiate between the lines corresponding to  the same character*/
              index === 0 ? numberRowSpacing + 10 : numberRowSpacing,
              numberColumnSpacing,
              index < numberOfPracticeLines ? true : false,
              widthOfTheSquaresInPx,
              index,
            ),
          )}

          {
            // Add a separation line between characters if the user selected it
            separationLine && i < characters.split("").length - 1 ? (
              <hr className="my-4 border-t-2 border-gray-300" />
            ) : null
          }
        </div>
      );
    }
  });

  function createOneLine(
    character = "",
    font: string,
    numberOfBoxesPerRow: number,
    numberPracticeSquares: number,
    rowSpacing: number,
    columnSpacing: number,
    firstLine = false,
    widthOfTheSquaresInPx: number,
    index: number,
  ) {
    return (
      <div
        key={`${character}-line-container-${index}`}
        className={"flex flex-row "}
        style={{
          marginTop: rowSpacing + "px",
        }}
      >
        {[...Array(numberOfBoxesPerRow).keys()].map((i) => (
          // We need to have a character in the square only for the number of practice squares the user wants
          // We also need to know if it is the first character we show to show it bold
          <Square
            widthInPx={widthOfTheSquaresInPx}
            character={i < numberPracticeSquares && firstLine ? character : ""}
            firstCharacter={i === 0 ? true : false}
            key={`${character}-square-${i}`}
            font={font}
            columnSpacing={columnSpacing}
            gridName={gridName}
            letterOpacity={letterOpacity}
          ></Square>
        ))}
      </div>
    );
  }

  return (
    <>
      <p
        className={
          "text-center wrap-break-word " +
          (titleItalic ? "italic " : "") +
          (titleBold ? "font-bold " : "") +
          (titleUnderline ? "underline " : "")
        }
        style={{
          fontSize: titleFontSize + "px",
        }}
      >
        {title}
      </p>
      <div id={id} className={className}>
        <Loading error={error} loading={loading} characters={characters} />
        <div>{listCharacters}</div>
      </div>
    </>
  );
}

export default Preview;
