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
    <div className="bg-gray-100 p-3 rounded-md mb-5 flex flex-row flex-wrap gap-2 mt-3">
      {recommendations &&
        recommendations.map((rec: string, index: number) => (
          <button
            type="button"
            key={`recommendation-${index}`}
            className=" text-gray-800 text-xl p-2 border border-gray-300 hover:bg-gray-300 rounded-md transition-colors duration-200"
            onClick={() => handleRecommendationClick(rec)}
          >
            {rec}
          </button>
        ))}
    </div>
  );
}

export default Recommendations;
