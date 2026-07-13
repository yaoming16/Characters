import SquareReactPdf from "./SquareReactPdf";
import { createTw } from "react-pdf-tailwind";
import {
  allUsedCharacterInfo,
  createSVGStrokes,
  getPinyinOfDecomposition,
  decompositionNotToShowREGEX,
} from "../../Aux/previewerFunctions";
import Loading from "./../General/Loading";

import FangSong from "../../Fonts/FangSong.ttf";
import KaiTi from "../../Fonts/KaiTi.ttf";
import SimSun from "../../Fonts/SimSun.ttf";
import NotoReg from "../../Fonts/NotoSansSC-Regular.ttf";
import NotoBold from "../../Fonts/NotoSansSC-Bold.ttf";

import { useTranslation } from "react-i18next";

import { usePracticeSheet } from "../../context/PracticePageContext";

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

Font.register({
  family: "NotoSansSC",
  fonts: [
    { src: NotoReg, fontWeight: "normal" },
    { src: NotoBold, fontWeight: "bold" },
  ],
});

interface PreviewPropsType {
  id: string;
  className?: string;
  charactersInfoResponse: any;
  widthOfTheSquaresInPx: number;
}

function ReactPDFViewer({
  id,
  className = "",
  charactersInfoResponse,
  widthOfTheSquaresInPx,
}: PreviewPropsType) {
  const {
    charactersInfo: CharactersInfo,
    characterSVGData,
    loading,
    error,
  } = charactersInfoResponse;

  const ps = usePracticeSheet();

  const {
    characters,
    numberOfSquaresPerRow,
    numberOfRowsPerCharacter,
    numberPracticeSquares,
    numberRowSpacing,
    numberColumnSpacing,
    showDefinition,
    showPinyin,
    showRadical,
    showDecomposition,
    numberOfPracticeLines,
    showStrokesOrder,
    title,
    titleFontSize,
    titleItalic,
    titleBold,
    titleUnderline,
    separationLine,
    numberMarginTop,
    numberMarginRight,
    numberMarginBottom,
    numberMarginLeft,
    font,
    gridName,
    letterOpacity,
  } = ps;

  const { t } = useTranslation("global");
  const errorMessages = {
    definitionNotFound: t("other.definitionNotFound"),
    pinyinNotFound: t("other.pinyinNotFound"),
    decompositionNotFound: t("other.decompositionNotFound"),
    radicalNotFound: t("other.radicalNotFound"),
  };

  //Regex for identify chinese characters.
  const chineseCharacterRegex = /\p{Script=Han}/u;

  const listCharacters = characters.split("").map((character, i) => {
    const { pinyin, decomposition, radical } = allUsedCharacterInfo(
      character,
      CharactersInfo,
      errorMessages,
    );

    const decompositionsPinyin = decomposition
      ? getPinyinOfDecomposition(decomposition, CharactersInfo, errorMessages)
      : null;
    const decompositionCharacters = decomposition
      ? decomposition.split("")
      : null;

    if (character !== " " && chineseCharacterRegex.test(character)) {
      return (
        <View key={`${character}-container-PDF-${i}`}>
          <View
            style={{
              fontFamily: "NotoSansSC",
              marginTop: numberRowSpacing + 10,
              ...tw("flex flex-row flex-wrap gap-2"),
            }}
          >
            {showDefinition && (
              <Text style={tw(`border-b-[1px] p-2 text-[0.8rem]`)}>
                <Text style={tw(`font-bold mr-2`)}>
                  {t("other.definition")}:
                </Text>
                {"  "}
                {t(`definitions.${character}`)}
              </Text>
            )}
            {showPinyin && (
              <Text style={tw(`border-b-[1px] p-2 text-[1rem]`)}>
                <Text style={tw(`font-bold mr-2 text-[0.8rem]`)}>
                  {t("other.pinyin")}:
                </Text>
                {"  "}
                {pinyin}
              </Text>
            )}
            {showRadical && (
              <Text style={tw(`border-b-[1px] p-2 text-[1rem]`)}>
                <Text style={tw(`font-bold mr-2 text-[0.8rem]`)}>
                  {t("other.radical")}:
                </Text>
                {"  "}
                {radical}
              </Text>
            )}
            {showDecomposition && (
              <View style={tw(`border-b-[1px] p-2 text-[1rem]`)}>
                <Text style={tw(`font-bold mr-2 text-[0.8rem]`)}>
                  {t("other.decomposition")}:
                </Text>
                {"  "}
                {showDecomposition &&
                  decompositionsPinyin &&
                  decompositionCharacters &&
                  decompositionCharacters.map(
                    (decompositionCharacter, index) => (
                      <Text
                        key={`${decompositionCharacter}-decomposition-${index}`}
                      >
                        {!decompositionNotToShowREGEX.test(
                          decompositionCharacter,
                        ) && (
                          <>
                            <Text>{decompositionCharacter}</Text>
                            <Text style={tw("text-[0.8rem] text-gray-600")}>
                              {decompositionCharacter !== "？"
                                ? ` ${decompositionsPinyin[index]}  -  ${t(`definitions.${decompositionCharacter}`)}`
                                : " " + t("other.decompositionNotFound")}
                            </Text>
                          </>
                        )}
                      </Text>
                    ),
                  )}
              </View>
            )}
          </View>
          <View style={tw("mt-2")}>
            {createSVGStrokes(
              character,
              characterSVGData,
              showStrokesOrder,
              true,
              t("other.strokesOrderNotFound"),
            )}
          </View>
          <View>
            {[...Array(numberOfRowsPerCharacter).keys()].map((index) =>
              createOneLine(
                character,
                /* For the first character we send the spacing the user selected plus an extra so we can differentiate between the lines corresponding to  the same character*/
                index === 0 ? numberRowSpacing + 10 : numberRowSpacing,
                index < numberOfPracticeLines ? true : false,
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
    rowSpacing: number,
    firstLine = false,
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
        {[...Array(numberOfSquaresPerRow).keys()].map((i) => (
          // We need to have a character in the square only for the number of practice squares the user wants
          // We also need to know if it is the first character we show to show it bold
          <SquareReactPdf
            key={`${character}-square-PDF-${i}`}
            character={i < numberPracticeSquares && firstLine ? character : ""}
            firstCharacter={i === 0 ? true : false}
            font={font}
            columnSpacing={numberColumnSpacing}
            gridName={gridName}
            letterOpacity={letterOpacity}
            widthOfTheSquaresInPx={widthOfTheSquaresInPx}
          />
        ))}
      </View>
    );
  }

  // Style for the pdf Download preview
  const styles = StyleSheet.create({
    page: {
      paddingTop: numberMarginTop,
      paddingRight: numberMarginRight,
      paddingBottom: numberMarginBottom,
      paddingLeft: numberMarginLeft,
    },
  });

  //PDF width

  return (
    <PDFViewer style={{ width: "100%", height: "70vh" }}>
      <Document style={{ width: 595 }}>
        <Page size="A4" style={styles.page}>
          <Loading error={error} loading={loading} />
          <Text
            style={{
              fontSize: titleFontSize,
              fontWeight: titleBold ? "bold" : "normal",
              fontStyle: titleItalic ? "italic" : "normal",
              textDecoration: titleUnderline ? "underline" : "none",
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
