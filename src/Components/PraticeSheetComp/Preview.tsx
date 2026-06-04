import Square from "./Square";
import {
  allUsedCharacterInfo,
  createSVGStrokes,
} from "../../Aux/previewerFunctions";

import { useTranslation } from "react-i18next";

import { usePracticeSheet } from "../../context/PracticePageContext";

import Loading from "../General/Loading";

interface PreviewPropsType {
  id: string;
  className?: string;
  charactersInfoResponse: any;
}

function Preview({
  id,
  className = "",
  charactersInfoResponse,
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
   } = ps;

  const { t } = useTranslation("global");

  const errorMessages = {
    definitionNotFound: t("other.definitionNotFound"),
    pinyinNotFound: t("other.pinyinNotFound"),
    decompositionNotFound: t("other.decompositionNotFound"),
    radicalNotFound: t("other.radicalNotFound"),
  };

  const listCharacters = characters.split("").map((character, i) => {
    const { pinyin, decomposition, radical } = allUsedCharacterInfo(
      character,
      CharactersInfo,
      errorMessages,
    );
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
              <span className="font-bold mr-2">{t("other.definition")}:</span>
              {t(`definitions.${character}`)}
            </p>
            <p
              className={
                "border border-solid p-2 text-[0.8rem] border-l-0 " +
                (showPinyin ? "" : " hidden") +
                (showDefinition ? "" : " border-l-1")
              }
            >
              <span className={"font-bold mr-2"}>{t("other.pinyin")}:</span>
              {pinyin}
            </p>
            <p
              className={
                "border border-solid p-2 text-[0.8rem] border-l-0 " +
                (showRadical ? "" : " hidden") +
                (showPinyin ? "" : " border-l-1")
              }
            >
              <span className={"font-bold mr-2"}>{t("other.radical")}:</span>
              {radical}
            </p>
            <p
              className={
                "border border-solid p-2 text-[0.8rem] border-l-0 " +
                (showDecomposition ? "" : " hidden") +
                (showRadical ? "" : " border-l-1")
              }
            >
              <span className={"font-bold mr-2"}>
                {t("other.decomposition")}:
              </span>
              {decomposition}
            </p>
          </div>
          <div>
            {createSVGStrokes(
              character,
              characterSVGData,
              showStrokesOrder,
              false,
              t("other.strokesOrderNotFound"),
            )}
          </div>
          {[...Array(numberOfRowsPerCharacter).keys()].map((index) =>
            createOneLine(
              character,
              /* For the first character we send the spacing the user selected plus an extra so we can differentiate between the lines corresponding to  the same character*/
              index === 0 ? numberRowSpacing + 10 : numberRowSpacing,
              index < numberOfPracticeLines ? true : false,
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
    rowSpacing: number,
    firstLine = false,
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
        {[...Array(numberOfSquaresPerRow).keys()].map((i) => (
          // We need to have a character in the square only for the number of practice squares the user wants
          // We also need to know if it is the first character we show to show it bold
          <Square
            character={i < numberPracticeSquares && firstLine ? character : ""}
            firstCharacter={i === 0 ? true : false}
            key={`${character}-square-${i}`}
          ></Square>
        ))}
      </div>
    );
  }

  if (loading) {
    return <Loading error={error} loading={loading} />;
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
        {error && <Loading error={error} loading={loading} />}
        <div>{listCharacters}</div>
      </div>
    </>
  );
}

export default Preview;
