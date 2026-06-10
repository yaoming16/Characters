import { characterInfoType, characterSVGType } from "../Types/types";
import { Svg, G, Path, Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

// This function is to return all the info of one character. Return an array where the first element is a boolean indicating if
// the character was found and the second element is the character info or an empty object
function findCharacterInfo(
  CharactersInfo: characterInfoType[] | characterSVGType[],
  character: string,
): [boolean, {}] | [boolean, characterInfoType] | [boolean, characterSVGType] {
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

// Function overloads for type safety
export function returnInfoOrNotFound<T extends keyof characterInfoType>(
  CharactersInfo: characterInfoType[],
  character: string,
  infoNeeded: T,
  errorMessage: string,
): characterInfoType[T] | string;

export function returnInfoOrNotFound<K extends keyof characterSVGType>(
  CharactersInfo: characterSVGType[],
  character: string,
  infoNeeded: K,
  errorMessage: string,
): characterSVGType[K] | string;

// Implementation
export function returnInfoOrNotFound<
  T extends keyof characterInfoType | keyof characterSVGType,
>(
  CharactersInfo: characterInfoType[] | characterSVGType[],
  character: string,
  infoNeeded: T,
  errorMessage: string,
):
  | characterInfoType[keyof characterInfoType]
  | characterSVGType[keyof characterSVGType]
  | string {
  let characterInfo = findCharacterInfo(CharactersInfo, character);
  if (characterInfo[0]) {
    return (characterInfo[1] as any)[infoNeeded];
  } else {
    return errorMessage;
  }
}

function createOneCharacterSVG(
  character: string,
  index: number,
  svgDataForCharacter: string[],
  isPDF: boolean = false,
  animated: boolean = false,
) {
  if (isPDF) {
    return (
      <Svg
        viewBox="0 0 1024 1024"
        fill="black"
        key={`${character}-stroke-PDF-${index}`}
        style={tw(`border border-solid  w-12 h-12`)}
      >
        {svgDataForCharacter.map((stroke: string, strokeIndex: number) => (
          <G
            transform="scale(1, -1) translate(0, -900)"
            key={`${character}-stroke-g-PDF-${strokeIndex}`}
            opacity={strokeIndex <= index ? 1 : 0.2}
            fill={strokeIndex === index ? "green" : "black"}
          >
            <Path d={stroke} />
          </G>
        ))}
      </Svg>
    );
  }

  return (
    <svg
      viewBox="0 0 1024 1024"
      key={`${character}-stroke-${index}`}
      className={`border border-solid min-w-12 min-h-12 w-12 h-12`}
    >
      {svgDataForCharacter.map((stroke: string, strokeIndex: number) => (
        <g
          transform="scale(1, -1) translate(0, -900)"
          key={`${character}-stroke-g-${strokeIndex}`}
          opacity={strokeIndex <= index ? 1 : 0.2}
          fill={strokeIndex === index ? "green" : "black"}
        >
          <path
            d={stroke}
            className={`${animated ? `step-by-step step-${strokeIndex}` : ""}`}
          />
        </g>
      ))}
    </svg>
  );
}

export function createOneAnimatedCharacterSVG(
  character: string,
  characterSVGData: characterSVGType[],
  errorMessage: string,
  stopAnimation: boolean = false,
) {
  const svgDataForCharacter = returnInfoOrNotFound(
    characterSVGData,
    character,
    "strokes",
    " ",
  );
  const svgAvailable =
    svgDataForCharacter !== " " &&
    svgDataForCharacter !== null &&
    Array.isArray(svgDataForCharacter);

  if (!svgAvailable) {
    return (
      <p className="border border-solid p-2 text-[0.8rem]">{errorMessage}</p>
    );
  }

  const totalAnimationSeconds = svgDataForCharacter.length + 1;

  return (
    <svg
      viewBox="0 0 1024 1024"
      className={`border border-solid min-w-20 min-h-20 w-20 h-20`}
    >
      <g transform="scale(1, -1) translate(0, -900)">
        {svgDataForCharacter.map((stroke: string, strokeIndex: number) => {
          if (stopAnimation) {
            return (
              <path
                key={`${character}-animated-stroke-static-${strokeIndex}`}
                d={stroke}
                fill="black"
                opacity={1}
              />
            );
          }

          const t1 = strokeIndex / totalAnimationSeconds;
          const t2 = (strokeIndex + 1) / totalAnimationSeconds;

          const opacityValues = strokeIndex === 0 ? "0;1;1" : "0;0;1;1";
          const opacityKeyTimes =
            strokeIndex === 0 ? `0;${t2};1` : `0;${t1};${t2};1`;

          const fillValues =
            strokeIndex === 0 ? "green;black;black" : "green;green;black;black";
          const fillKeyTimes =
            strokeIndex === 0 ? `0;${t2};1` : `0;${t1};${t2};1`;

          return (
            <path
              key={`${character}-animated-stroke-${strokeIndex}`}
              d={stroke}
              fill="black"
              opacity={0}
            >
              <animate
                attributeName="opacity"
                dur={`${totalAnimationSeconds}s`}
                repeatCount="indefinite"
                values={opacityValues}
                keyTimes={opacityKeyTimes}
              />
              <animate
                attributeName="fill"
                dur={`${totalAnimationSeconds}s`}
                repeatCount="indefinite"
                calcMode="discrete"
                values={fillValues}
                keyTimes={fillKeyTimes}
              />
            </path>
          );
        })}
      </g>
    </svg>
  );
}

export function createSVGStrokes(
  character: string,
  characterSVGData: characterSVGType[],
  showStrokesOrder: boolean,
  isPDF: boolean = false,
  errorMessage: string,
) {
  const svgDataForCharacter = showStrokesOrder
    ? returnInfoOrNotFound(characterSVGData, character, "strokes", " ")
    : null;
  const svgAvailable =
    svgDataForCharacter !== " " &&
    svgDataForCharacter !== null &&
    Array.isArray(svgDataForCharacter);

  if (isPDF) {
    // For react-pdf rendering
    return svgAvailable ? (
      <View style={tw(`w-full flex flex-row flex-wrap`)}>
        {svgDataForCharacter.map((stroke: string, index: number) =>
          createOneCharacterSVG(character, index, svgDataForCharacter, true),
        )}
      </View>
    ) : svgDataForCharacter === " " && showStrokesOrder ? (
      <Text style={tw(`border border-solid p-2 text-[0.8rem]`)}>
        {errorMessage}
      </Text>
    ) : null;
  }

  // For web rendering
  return svgAvailable ? (
    <div className="w-full flex flex-row flex-wrap">
      {svgDataForCharacter.map((stroke: string, index: number) =>
        createOneCharacterSVG(character, index, svgDataForCharacter),
      )}
    </div>
  ) : svgDataForCharacter === " " && showStrokesOrder ? (
    <p className="border border-solid p-2 text-[0.8rem]">{errorMessage}</p>
  ) : null;
}

export function allUsedCharacterInfo(
  character: string,
  CharactersInfo: characterInfoType[],
  errorMessages: any,
) {
  const pinyin = returnInfoOrNotFound(
    CharactersInfo,
    character,
    "pinyin",
    errorMessages.pinyinNotFound,
  );
  const decomposition = returnInfoOrNotFound(
    CharactersInfo,
    character,
    "decomposition",
    errorMessages.decompositionNotFound,
  );
  const radical = returnInfoOrNotFound(
    CharactersInfo,
    character,
    "radical",
    errorMessages.radicalNotFound,
  );
  return {
    pinyin,
    decomposition,
    radical,
  };
}

export const decompositionNotToShowREGEX = /⿰|⿱|⿲|⿳|⿴|⿵|⿶|⿷|⿸|⿹|⿺|⿻/;

export function getPinyinOfDecomposition(characters: string, CharactersInfo: characterInfoType[], errorMessages: {[key: string]: string} ) {
  let charactersPinyin = [];
  const charactersArray = characters.split("");
  for (let i = 0; i < charactersArray.length; i++) {
    const character = charactersArray[i];
    const decomposition = allUsedCharacterInfo(
      character,
      CharactersInfo,
      errorMessages,
    ).pinyin;
    charactersPinyin.push(decomposition);
  }
  return charactersPinyin;
}
