import Square from "./Square";
import { characterInfoType, characterSVGType, allStatesType } from "../Types/types";
import CharactersInfoImport from "../data/dictionary.json";
import characterSVGInfoImport from "../data/graphics.json";
import {returnInfoOrNotFound, createSVGStrokes} from "../Functions/previewerFunctions";

const CharactersInfo: characterInfoType[] =
  CharactersInfoImport.CharactersInfo as characterInfoType[];

// Type assertion for graphics.json structure to avoid '{}' implicit type error
const characterSVGData: characterSVGType[] = (
  characterSVGInfoImport as {
    charactersSVGInfo: characterSVGType[];
  }
).charactersSVGInfo;

interface PreviewPropsType {
  id: string;
  className?: string;
  allStates: allStatesType;
  widthOfTheSquaresInPx: number;
}

function Preview({
  id,
  className = "",
  allStates,
  widthOfTheSquaresInPx,
}: PreviewPropsType) {
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
                "Could not find the character definition"
              )}
            </p>
            <p
              className={
                "border border-solid p-2 text-[0.8rem] border-l-0 " +
                (showPinyin ? "" : " hidden") +
                (showDefinition ? "" : " border-l-1")
              }
            >
              <span className="font-bold mr-2">Pinyin:</span>
              {returnInfoOrNotFound(
                CharactersInfo,
                character,
                "pinyin",
                "Could not find the Pinyin"
              )}
            </p>
            {createSVGStrokes(character, characterSVGData, showStrokesOrder, false)}
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
              index
            )
          )}
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
    index: number
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
            character={
              i < numberPracticeSquares && firstLine ? character : ""
            }
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
      <p className="text-center text-[50px] font-bold text-wrap" style={{ fontFamily: font }}>{title}</p>
      <div id={id} className={className}>
        <div>{listCharacters}</div>
      </div>
    </>
  );
}

export default Preview;
