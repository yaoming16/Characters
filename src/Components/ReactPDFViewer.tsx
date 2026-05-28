import SquareReactPdf from "./SquareReactPdf";
import { createTw } from "react-pdf-tailwind";
import { allStatesType } from "../Types/types";
import {
  returnInfoOrNotFound,
  createSVGStrokes,
} from "../Aux/previewerFunctions";
import Loading from "./Loading";

import FangSong from "../Fonts/FangSong.ttf";
import KaiTi from "../Fonts/KaiTi.ttf";
import SimSun from "../Fonts/SimSun.ttf";

const tw = createTw({});

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
  charactersInfoResponse: any;
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
  charactersInfoResponse,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
}: PreviewPropsType) {
  const {
    charactersInfo: CharactersInfo,
    characterSVGData,
    loading,
    error,
  } = charactersInfoResponse;

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
    fontItalic,
    fontBold,
    fontUnderline,
    separationLine,
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
                  "Could not find the character definition",
                )}
              </Text>
            ) : null}
            {showPinyin ? (
              <Text
                style={tw(
                  `border border-solid p-2 text-[0.8rem]${
                    showDefinition ? " border-l-0" : ""
                  }`,
                )}
              >
                <Text style={tw(`font-bold mr-2`)}>Pinyin:</Text>
                {returnInfoOrNotFound(
                  CharactersInfo,
                  character,
                  "pinyin",
                  "Could not find the Pinyin",
                )}
              </Text>
            ) : null}
          </View>
          <View>
            {createSVGStrokes(
              character,
              characterSVGData,
              showStrokesOrder,
              true,
            )}
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
                index,
              ),
            )}
          </View>
          {
            // Add a separation line between characters if the user selected it
            separationLine && i < characters.split("").length - 1 ? (
              <View style={tw("my-4 border-t-2 border-gray-300")} />
            ) : null
          }
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
    index: number,
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
            character={i < numberPracticeSquares && firstLine ? character : ""}
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
      <Document style={{ width: 595 }}>
        <Page size="A4" style={styles.page}>
          <Loading error={error} loading={loading} characters={characters} />
          <Text
            style={{
              fontSize: titleFontSize,
              fontWeight: fontBold ? "bold" : "normal",
              fontStyle: fontItalic ? "italic" : "normal",
              textDecoration: fontUnderline ? "underline" : "none",
              ...tw(`w-full text-center`),
            }}
          >
            {title}
          </Text>
          <View>{listCharacters}</View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default ReactPDFViewer;
