import Square from "./Square";
import { v4 as uuidv4 } from "uuid";
import { CharactersInfo } from "../data/dictionary";

function findCharacterInfo(CharactersInfo, character) {
  let elementToReturn = [false, {}];
  CharactersInfo.forEach((element) => {
    if (element["character"] === character) {
      elementToReturn = [true, element];
      return elementToReturn;
    }
  });
  return elementToReturn;
}

function returnInfoOrNotFound(
  CharactersInfo,
  character,
  infoNeeded,
  errorMessage
) {
  let characterInfo = findCharacterInfo(CharactersInfo, character);
  if (characterInfo[0]) {
    return characterInfo[1][infoNeeded];
  } else {
    return errorMessage;
  }
}

function Preview({ id, className = "", allStates, widthOfTheSquaresInPx }) {
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
  ] = allStates;

  const listCharacters = characters.split("").map((character) => (
    <div key={uuidv4()}>
      <div
        style={{
          marginTop: numberRowSpacing + 10 + "px",
        }}
      >
        <p className={"" + (showDefinition ? "" : "hidden")}>
          <span className="font-bold mr-2">Definition:</span>
          {returnInfoOrNotFound(
            CharactersInfo,
            character,
            "definition",
            "Could not find the character definition"
          )}
        </p>
        <p className={"" + (showPinyin ? "" : "hidden")}>
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
          index === 0 ? true : false,
          widthOfTheSquaresInPx
        )
      )}
    </div>
  ));

  function createOneLine(
    character = "",
    font,
    numberOfBoxesPerRow,
    numberPracticeSquares,
    rowSpacing,
    columnSpacing,
    firstLine = false,
    widthOfTheSquaresInPx
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
