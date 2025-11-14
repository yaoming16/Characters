import SquareReactPdf from "./SquareReactPdf";
import CharactersInfoImport from "../data/dictionary.json";
import { createTw } from "react-pdf-tailwind";
import { characterInfoType, allStatesType } from "../Types/types";
import {returnInfoOrNotFound, createSVGStrokes} from "../Functions/previewerFunctions";
import characterSVGInfoImport from "../data/graphics.json";
import { characterSVGType } from "../Types/types";

import FangSong from "../Fonts/FangSong.ttf";
import KaiTi from "../Fonts/KaiTi.ttf";
import SimSun from "../Fonts/SimSun.ttf";

const CharactersInfo: characterInfoType[] = CharactersInfoImport.CharactersInfo;
const tw = createTw({});

// Type assertion for graphics.json structure to avoid '{}' implicit type error
const characterSVGData: characterSVGType[] = (
  characterSVGInfoImport as {
    charactersSVGInfo: characterSVGType[];
  }
).charactersSVGInfo;

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
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

interface PreviewPropsType {
  id: string;
  className?: string;
  allStates: allStatesType;
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
    numberOfPracticeLines,
    showStrokesOrder,
  ] = allStates;

  const listCharacters = characters.split("").map((character, i) => {
    if (character !== " ") {
      return (
        <View key={`${character}-container-PDF-${i}`}>
          <View
            style={{
              marginTop: numberRowSpacing + 10,
              ...tw("flex flex-row"),
            }}
          >
            {showDefinition ? (
              <Text style={tw(`border border-solid p-2 text-[0.8rem]`)}>
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
              <Text
                style={tw(
                  `border border-solid p-2 text-[0.8rem]${
                    showDefinition ? " border-l-0" : ""
                  }`
                )}
              >
                <Text style={tw(`font-bold mr-2`)}>Pinyin:</Text>
                {returnInfoOrNotFound(
                  CharactersInfo,
                  character,
                  "pinyin",
                  "Could not find the Pinyin"
                )}
              </Text>
            ) : null}
            {createSVGStrokes(character, characterSVGData, showStrokesOrder, true)}
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
                index < numberOfPracticeLines ? true : false,
                widthOfTheSquaresInPx,
                index
              )
            )}
          </View>
        </View>
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
      <View
        key={`${character}-line-PDF-container-${index}`}
        wrap={false}
        style={{
          marginTop: rowSpacing,
          ...tw("flex flex-row"),
        }}
      >
        {[...Array(numberOfBoxesPerRow).keys()].map((i) => (
          // We need to have a character in the square only for the number of practice squares the user wants
          // We also need to know if it is the first character we show to show it bold
          <SquareReactPdf
            key={`${character}-square-PDF-${i}`}
            widthInPx={widthOfTheSquaresInPx}
            character={
              i < numberPracticeSquares && firstLine ? character : ""
            }
            firstCharacter={i === 0 ? true : false}
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
      paddingTop: marginTop,
      paddingRight: marginRight,
      paddingBottom: marginBottom,
      paddingLeft: marginLeft,
    },
  });

  //PDF width

  return (
    <PDFViewer style={{ width: "100%", height: "70vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={{ width: 595 }}>{listCharacters}</View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default ReactPDFViewer;
