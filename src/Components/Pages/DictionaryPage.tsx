import { useTranslation } from "react-i18next";
import { useBeforeUnload } from "react-router-dom";

import { useCharacterData } from "../../hooks/useCharacterData";
import { useState, useEffect } from "react";

import {
  allUsedCharacterInfo,
  createSVGStrokes,
  createOneAnimatedCharacterSVG,
  getPinyinOfDecomposition,
  decompositionNotToShowREGEX,
} from "../../Aux/previewerFunctions";

import Loading from "../General/Loading";
import InputWLabel from "../Form/InputWLabel";
import Recommendations from "../General/Recommendations";
import AllAvailableCharacters from "../General/AllAvailableCharacters";
import Accordion from "../General/Accordion";

function DictionaryPage() {
  const { t } = useTranslation("global");
  const { charactersInfo, pinyinDic, characterSVGData, loading, error } =
    useCharacterData();

  const [selectedCharacter, setSelectedCharacter] = useState<string>("");

  const [stopAnimation, setStopAnimation] = useState(false);

  // Save the characters the user selected before they leave the page.
  useBeforeUnload(() => {
    localStorage.setItem("selectedCharacters", selectedCharacter);
  });

  // Load the selected characters from localStorage when the component mounts.
  useEffect(() => {
    const savedCharacters = localStorage.getItem("selectedCharacters");
    if (savedCharacters) {
      setSelectedCharacter(savedCharacters);
    }
  }, []);

  if (loading || error) {
    return (
      <div className="p-4 min-h-screen">
        <Loading loading={loading} error={error} isDictionary={true} />;
      </div>
    );
  }

  const errorMessages = {
    definitionNotFound: t("other.definitionNotFound"),
    pinyinNotFound: t("other.pinyinNotFound"),
    decompositionNotFound: t("other.decompositionNotFound"),
    radicalNotFound: t("other.radicalNotFound"),
  };

  return (
    <div className="p-4 min-h-screen">
      <div>
        <h1>{t("dictionary.title")}</h1>
        <button commandfor="all-characters-dialog" command="show-modal">
          See all characters
        </button>
      </div>
      <AllAvailableCharacters
        charactersInfo={charactersInfo}
        setCharacters={setSelectedCharacter}
      />

      <section>
        <form>
          <InputWLabel
            text={t("dictionary.search")}
            id="dictionary-search"
            type="text"
            value={selectedCharacter}
            onChange={(e) => setSelectedCharacter(e.target.value)}
          />
        </form>
        <Recommendations
          characters={selectedCharacter}
          pinyinDic={pinyinDic}
          setCharacters={setSelectedCharacter}
        />
      </section>

      <section>
        {selectedCharacter ? (
          <ul>
            {selectedCharacter.split("").map((char, index) => {
              const { pinyin, decomposition, radical } = allUsedCharacterInfo(
                char,
                charactersInfo,
                errorMessages,
              );

              const chineseCharacterRegex = /^\p{Script=Han}$/u;
              const decompositionsPinyin = decomposition
                ? getPinyinOfDecomposition(
                    decomposition,
                    charactersInfo,
                    errorMessages,
                  )
                : null;
              const decompositionCharacters = decomposition
                ? decomposition.split("")
                : null;

              if (char === " " || !chineseCharacterRegex.test(char)) {
                return null;
              }

              return (
                <Accordion title={`${t("dictionary.character")} ${char}`}>

                <li
                  key={char + index}
                  className="mt-10 p-4 border-b border-gray-300"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedCharacter(selectedCharacter.replace(char, ""))
                    }
                  >
                    X
                  </button>
                  <h2 className="text-2xl font-bold mb-4">
                    {t("dictionary.character")}: {char}
                  </h2>
                  {
                    <div className="flex flex-col gap-5">
                      <div className="">
                        <p>
                          <span className="font-bold mr-2">
                            {t("other.definition")}:
                          </span>
                          {t(`definitions.${char}`)}
                        </p>
                        <p>
                          <span className={"font-bold mr-2"}>
                            {t("other.pinyin")}:
                          </span>
                          {pinyin}
                        </p>
                        <p>
                          <span className={"font-bold mr-2"}>
                            {t("other.radical")}:
                          </span>
                          {radical}
                        </p>
                        <div>
                          <span className={"font-bold mr-2"}>
                            {t("other.decomposition")}:
                          </span>
                          {decompositionsPinyin &&
                            decompositionCharacters &&
                            decompositionCharacters.map(
                              (decompositionCharacter, index) => (
                                <div
                                  key={`${decompositionCharacter}-decomposition-${index}`}
                                >
                                  {!decompositionNotToShowREGEX.test(
                                    decompositionCharacter,
                                  ) && (
                                    <>
                                      <span>{decompositionCharacter}</span>
                                      <span className="text-[0.8rem] text-gray-600">
                                        {"  " +
                                          decompositionsPinyin[index]}{" "}
                                      </span>
                                    </>
                                  )}
                                </div>
                              ),
                            )}
                        </div>
                      </div>
                      <div>
                        {createSVGStrokes(
                          char,
                          characterSVGData,
                          true,
                          false,
                          t("other.strokesOrderNotFound"),
                        )}
                      </div>
                      <div className="flex flex-row flex-wrap gap-2">
                        {createOneAnimatedCharacterSVG(
                          char,
                          characterSVGData,
                          t("other.strokesOrderNotFound"),
                          stopAnimation,
                        )}
                        <div className="flex flex-row items-center gap-2">
                          <input
                            type="checkbox"
                            id={`stop-animation-${char}`}
                            checked={stopAnimation}
                            onChange={() => setStopAnimation(!stopAnimation)}
                          />
                          <label htmlFor={`stop-animation-${char}`}>
                            {t("dictionary.stopAnimation")}
                          </label>
                        </div>
                      </div>
                    </div>
                  }
                </li>
                </Accordion>
              );
            })}
          </ul>
        ) : (
          <p>{t("dictionary.empty")}</p>
        )}
      </section>
    </div>
  );
}

export default DictionaryPage;
