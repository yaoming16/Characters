import Square from "./Square";
import { v4 as uuidv4 } from "uuid";
import { characterInfoType, characterSVGType } from "../Types/types";
import CharactersInfoImport from "../data/dictionary.json";
import characterSVGInfo from "../data/graphics.json";

const CharactersInfo: characterInfoType[] = CharactersInfoImport.CharactersInfo;
//const characterSVGData: characterSVGType[] = characterSVGInfo.charactersSVGInfo as characterInfoType[];

// This function is to return all the info of one character. Return an array where the first element is a boolean indicating if
// the character was found and the second element is the character info or an empty object
function findCharacterInfo(
  CharactersInfo: characterInfoType[],
  character: string
): [boolean, {}] | [boolean, characterInfoType] {
  let found = false;
  let data: {} | characterInfoType = {};
  for (let element of CharactersInfo) {
    if (element["character"] === character) {
      data = element;
      found = true;
      break;
    }
  }
  return [found, data];
}

// T is a generic type that extends the keys of characterInfoType
// This function is to return the info needed (infoNeeded parameter) or an error message if the character or the info for that character is not found
function returnInfoOrNotFound<T extends keyof characterInfoType>(
  CharactersInfo: characterInfoType[],
  character: string,
  infoNeeded: T, // Same as keyof characterInfoType
  errorMessage: string
): characterInfoType[T] | string {
  let characterInfo = findCharacterInfo(CharactersInfo, character);
  if (characterInfo[0]) {
    return (characterInfo[1] as characterInfoType)[infoNeeded];
  } else {
    return errorMessage;
  }
}

interface PreviewPropsType {
  id: string;
  className?: string;
  allStates: [
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
    number
  ];
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
  ] = allStates;

  const listCharacters = characters.split("").map((character) => {
    if (character !== " ") {
      return (
        <div key={uuidv4()}>
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
              widthOfTheSquaresInPx
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
    widthOfTheSquaresInPx: number
  ) {
    return (
      <div
        key={uuidv4()}
        className={"flex flex-row "}
        style={{
          marginTop: rowSpacing + "px",
        }}
      >
        {[...Array(numberOfBoxesPerRow).keys()].map((index) => (
          // We need to have a character in the square only for the number of practice squares the user wants
          // We also need to know if it is the first character we show to show it bold
          <Square
            widthInPx={widthOfTheSquaresInPx}
            character={
              index < numberPracticeSquares && firstLine ? character : ""
            }
            firstCharacter={index === 0 ? true : false}
            key={uuidv4()}
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
    // We need to add the margin
    <div id={id} className={className}>
      <div>{listCharacters}</div>
    </div>
  );
}

export default Preview;
