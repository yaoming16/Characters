import { useState, useEffect } from 'react';
import { characterInfoType, characterSVGType } from '../Types/types';

interface CharacterData {
  charactersInfo: characterInfoType[];
  characterSVGData: characterSVGType[];
  loading: boolean;
  error: Error | null;
}

export function useCharacterData(): CharacterData {
  const [charactersInfo, setCharactersInfo] = useState<characterInfoType[]>([]);
  const [characterSVGData, setCharacterSVGData] = useState<characterSVGType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load from public directory (served as static assets, not bundled)
        const [dictionaryResponse, graphicsPart1Response, graphicsPart2Response] = await Promise.all([
          fetch('/data/dictionary.json'),
          fetch('/data/graphics-part1.json'),
          fetch('/data/graphics-part2.json')
        ]);

        if (!dictionaryResponse.ok || !graphicsPart1Response.ok || !graphicsPart2Response.ok) {
          throw new Error('Failed to load character data');
        }

        const dictionaryData = await dictionaryResponse.json();
        const graphicsPart1Data = await graphicsPart1Response.json();
        const graphicsPart2Data = await graphicsPart2Response.json();

        // Merge both parts of graphics data
        const combinedGraphicsData = [
          ...graphicsPart1Data.charactersSVGInfo,
          ...graphicsPart2Data.charactersSVGInfo
        ];

        setCharactersInfo(dictionaryData.CharactersInfo);
        setCharacterSVGData(combinedGraphicsData);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { charactersInfo, characterSVGData, loading, error };
}
