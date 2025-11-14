import { characterInfoType, characterSVGType } from "../Types/types";
import {Svg, G, Path, Text, View} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

// This function is to return all the info of one character. Return an array where the first element is a boolean indicating if
// the character was found and the second element is the character info or an empty object
function findCharacterInfo(
  CharactersInfo: characterInfoType[] | characterSVGType[],
  character: string
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
  errorMessage: string
): characterInfoType[T] | string;

export function returnInfoOrNotFound<K extends keyof characterSVGType>(
  CharactersInfo: characterSVGType[],
  character: string,
  infoNeeded: K,
  errorMessage: string
): characterSVGType[K] | string;

// Implementation
export function returnInfoOrNotFound<T extends keyof characterInfoType | keyof characterSVGType>(
  CharactersInfo: characterInfoType[] | characterSVGType[],
  character: string,
  infoNeeded: T,
  errorMessage: string
): characterInfoType[keyof characterInfoType] | characterSVGType[keyof characterSVGType] | string {
  let characterInfo = findCharacterInfo(CharactersInfo, character);
  if (characterInfo[0]) {
    return (characterInfo[1] as any)[infoNeeded];
  } else {
    return errorMessage;
  }
}

function createOneCharacterSVG(character: string, index: number, svgDataForCharacter: string[]) {
  return (
  <svg viewBox="0 0 1024 1024" key={`${character}-stroke-${index}`} className={`border border-solid max-w-15 max-h-15`}>
    {svgDataForCharacter.map((stroke: string, strokeIndex: number) => (
      <g transform="scale(1, -1) translate(0, -900)" 
      key={`${character}-stroke-g-${strokeIndex}`} 
      opacity={strokeIndex <= index ? 1 : 0.2}
      fill={strokeIndex === index ? "green" : "black"}>
          <path
            d={stroke}
            />
      </g>
    ))}
  </svg>
  )
}


export function createSVGStrokes(character: string, characterSVGData : characterSVGType[], showStrokesOrder: boolean, isPDF: boolean = false) {
  const svgDataForCharacter = showStrokesOrder ? returnInfoOrNotFound(characterSVGData, character, "strokes", " "): null;
  const svgAvailable = svgDataForCharacter !== " " && svgDataForCharacter !== null && Array.isArray(svgDataForCharacter);
  
  if (isPDF) {
    // For react-pdf rendering
    return (
      svgAvailable ? (
        <View style={tw(`w-full flex flex-row`)}>
          {svgDataForCharacter.map((stroke: string, index: number) => (
                <Svg viewBox="0 0 1024 1024" fill="black" key={`${character}-stroke-PDF-${index}`}>
                  <G transform="scale(1, -1) translate(0, -900)">
                      <Path
                        d={stroke}
                        />
                  </G>
                </Svg>
              )
            )}
        </View>
          ) : svgDataForCharacter === " " && showStrokesOrder ? (
            <Text style={tw(`border border-solid p-2 text-[0.8rem]`)}>Stroke order not found</Text>
            ) : null
          );
      }
      
      // For web rendering
      return (
        svgAvailable ? (
          <div className="w-full flex flex-row ">
            {svgDataForCharacter.map((stroke: string, index: number) => (
              createOneCharacterSVG(character, index, svgDataForCharacter)
            )
            )}
          </div>
          ) : svgDataForCharacter === " " && showStrokesOrder ? (
            <p className="border border-solid p-2 text-[0.8rem]">Stroke order not found</p>
          ) : null
        );
}