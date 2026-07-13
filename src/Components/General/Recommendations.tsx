interface RecommendationsProps {
  characters: string;
  pinyinDic: any;
  setCharacters: React.Dispatch<React.SetStateAction<string>>;
}

function Recommendations({
  characters,
  pinyinDic,
  setCharacters,
}: RecommendationsProps) {
  // Function to extract western letters from the characters string
  function getWesternLetters(str: string): string | null {
    const hasWesternLetters = /[a-zA-Z]/g;
    const westernLetters =
      [...str.matchAll(hasWesternLetters)]?.join("") || null;
    return westernLetters;
  }

  //Function to get recommendations
  function getRecommendations() {
    let recommendations = [];

    const westernLetters = getWesternLetters(characters);

    if (pinyinDic && westernLetters && pinyinDic[westernLetters]) {
      recommendations = pinyinDic[westernLetters];
    }

    return recommendations.length > 0 ? recommendations : null;
  }

  //Function to handle click on recommendation, which adds the recommendation to the characters input
  function handleRecommendationClick(rec: string) {
    const westernLetters = getWesternLetters(characters);
    const newCharacters = characters.replace(westernLetters || "", rec);

    setCharacters(newCharacters);
  }

  const recommendations = getRecommendations();

  if (!recommendations ) return null;

  return (
    <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      {recommendations &&
        recommendations.map((rec: string, index: number) => (
          <button
            type="button"
            key={`recommendation-${index}`}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-base font-medium text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800 sm:text-lg"
            onClick={() => handleRecommendationClick(rec)}
          >
            {rec}
          </button>
        ))}
    </div>
  );
}

export default Recommendations;
