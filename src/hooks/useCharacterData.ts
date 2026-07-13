import { useState, useEffect } from "react";
import { characterInfoType, characterSVGType } from "../Types/types";

interface CharacterData {
  charactersInfo: characterInfoType[];
  characterSVGData: characterSVGType[];
  pinyinDic: any;
  loading: boolean;
  error: Error | null;
}

export function useCharacterData(): CharacterData {
  const [charactersInfo, setCharactersInfo] = useState<characterInfoType[]>([]);
  const [characterSVGData, setCharacterSVGData] = useState<characterSVGType[]>(
    [],
  );
  const [pinyinDic, setPinyinDic] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        //throw new Error("Simulated error loading character data");
        // Load from public directory (served as static assets, not bundled)
        const [
          dictionaryResponse,
          graphicsPart1Response,
          graphicsPart2Response,
          pinyinDictionaryResponse,
        ] = await Promise.all([
          fetch("/data/dictionary.json"),
          fetch("/data/graphics-part1.json"),
          fetch("/data/graphics-part2.json"),
          fetch("/data/pinyin-dict.json"),
        ]);

        if (
          !dictionaryResponse.ok ||
          !graphicsPart1Response.ok ||
          !graphicsPart2Response.ok ||
          !pinyinDictionaryResponse.ok
        ) {
          throw new Error("Failed to load character data");
        }

        const dictionaryData = await dictionaryResponse.json();
        const pinyinDictionaryData = await pinyinDictionaryResponse.json();
        const graphicsPart1Data = await graphicsPart1Response.json();
        const graphicsPart2Data = await graphicsPart2Response.json();

        // Merge both parts of graphics data
        const combinedGraphicsData = [
          ...graphicsPart1Data.charactersSVGInfo,
          ...graphicsPart2Data.charactersSVGInfo,
        ];

        setCharactersInfo(dictionaryData.CharactersInfo);
        setCharacterSVGData(combinedGraphicsData);
        setPinyinDic(pinyinDictionaryData);
        setLoading(false);
      } catch (err) {
        console.error("Error loading character data:", err);
        setError(err as Error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { charactersInfo, characterSVGData, pinyinDic, loading, error };
}
