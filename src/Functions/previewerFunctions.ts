import { characterInfoType, characterSVGType } from "../Types/types";

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
export function returnInfoOrNotFound<T extends keyof characterInfoType>(
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