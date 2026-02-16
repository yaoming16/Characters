import { characterInfoType, characterSVGType } from '../Types/types';
import CharactersInfoImport from "../data/dictionary.json";
import characterSVGPart1Import from "../data/graphics-part1.json";
import characterSVGPart2Import from "../data/graphics-part2.json";

const CharactersInfo: characterInfoType[] =
  CharactersInfoImport.CharactersInfo as characterInfoType[];

// Combine both parts of graphics data
const characterSVGData: characterSVGType[] = [
  ...(characterSVGPart1Import as { charactersSVGInfo: characterSVGType[] }).charactersSVGInfo,
  ...(characterSVGPart2Import as { charactersSVGInfo: characterSVGType[] }).charactersSVGInfo
];

interface CharacterData {
  charactersInfo: characterInfoType[];
  characterSVGData: characterSVGType[];
}

export function useCharacterData(): CharacterData {
  return { charactersInfo: CharactersInfo, characterSVGData };
}
