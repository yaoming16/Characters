import SquareReactPdf from "./SquareReactPdf";
import { v4 as uuidv4 } from "uuid";
import CharactersInfoImport from "../data/dictionary.json";
import { createTw } from "react-pdf-tailwind";

import FangSong from "../Fonts/FangSong.ttf";
import KaiTi from "../Fonts/KaiTi.ttf";
import SimSun from "../Fonts/SimSun.ttf";

const CharactersInfo: characterInfoType[] = CharactersInfoImport.CharactersInfo;
const tw = createTw({});

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Canvas,
} from "@react-pdf/renderer";

// Register Chinese fonts for react-pdf
Font.register({
  family: "FangSong",
  src: FangSong,
});

Font.register({
  family: "KaiTi",
  src: KaiTi,
});

Font.register({
  family: "SimSun",
  src: SimSun,
});

type characterInfoType = {
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
    number
  ];
  widthOfTheSquaresInPx: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}

function ReactPDFViewer({
  id,
  className = "",
  allStates,
  widthOfTheSquaresInPx,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
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
  ] = allStates;

  const listCharacters = characters.split("").map((character) => (
    <View key={uuidv4()}>
      <View
        style={{
          marginTop: numberRowSpacing + 10,
        }}
      >
        {showDefinition ? (
          <Text>
            <Text style={tw(`font-bold mr-2`)}>Definition:</Text>
            {returnInfoOrNotFound(
              CharactersInfo,
              character,
              "definition",
              "Could not find the character definition"
            )}
          </Text>
        ) : null}
        {showPinyin ? (
          <Text>
            <Text style={tw(`font-bold mr-2`)}>Pinyin:</Text>
            {returnInfoOrNotFound(
              CharactersInfo,
              character,
              "pinyin",
              "Could not find the Pinyin"
            )}
          </Text>
        ) : null}
      </View>
      <View>
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
      </View>
    </View>
  ));

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
      <View
        key={uuidv4()}
        wrap={false}
        style={{
          marginTop: rowSpacing,
          ...tw("flex flex-row"),
        }}
      >
        {[...Array(numberOfBoxesPerRow).keys()].map((index) => (
          // We need to have a character in the square only for the number of practice squares the user wants
          // We also need to know if it is the first character we show to show it bold
          <SquareReactPdf
            key={uuidv4()}
            widthInPx={widthOfTheSquaresInPx}
            character={
              index < numberPracticeSquares && firstLine ? character : ""
            }
            firstCharacter={index === 0 ? true : false}
            font={font}
            columnSpacing={columnSpacing}
            gridName={gridName}
            letterOpacity={letterOpacity}
          />
        ))}
      </View>
    );
  }

  // Style for the pdf Download preview
  const styles = StyleSheet.create({
    page: {
      paddingTop: `${marginTop}`,
      paddingRight: `${marginRight}`,
      paddingBottom: `${marginBottom}`,
      paddingLeft: `${marginLeft}`,
    },
  });

  //PDF width

  return (
    <PDFViewer style={{ width: "100%", height: "70vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={{ width: "595" }}>{listCharacters}</View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default ReactPDFViewer;
