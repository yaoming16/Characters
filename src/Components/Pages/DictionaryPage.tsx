import { useTranslation } from "react-i18next";

import { useCharacterData } from "../../hooks/useCharacterData";
import { useState } from "react";

import {
  allUsedCharacterInfo,
  createSVGStrokes,
} from "../../Aux/previewerFunctions";

import Loading from "../General/Loading";
import InputWLabel from "../Form/InputWLabel";

function DictionaryPage() {
  const { t } = useTranslation("global");
  const { charactersInfo, characterSVGData, loading, error } =
    useCharacterData();

  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null,
  );

  if (loading || error) {
    return <Loading loading={loading} error={error} isDictionary={true} />;
  }

  const errorMessages = {
    definitionNotFound: t("other.definitionNotFound"),
    pinyinNotFound: t("other.pinyinNotFound"),
    decompositionNotFound: t("other.decompositionNotFound"),
    radicalNotFound: t("other.radicalNotFound"),
  };

  return (
    <div className="p-4">
      <h1>{t("dictionary.title")}</h1>

      <section>
        <form>
          <InputWLabel
            text={t("dictionary.search")}
            id="dictionary-search"
            type="text"
            value={selectedCharacter || ""}
            onChange={(e) => setSelectedCharacter(e.target.value)}
          />
        </form>
      </section>

      <section>
        {selectedCharacter ? (
          <ul>
            {selectedCharacter.split("").map((char, index) => {
              const { definition, pinyin, decomposition, radical } =
                allUsedCharacterInfo(char, charactersInfo, errorMessages);

              return (
                <li
                  key={char + index}
                  className="mt-10 p-4 border-b border-gray-300"
                >
                  <h2>
                    {t("dictionary.character")}: {char}
                  </h2>
                  {
                    <div className="flex flex-col gap-5">
                      <div className="">
                        <p>
                          <span className="font-bold mr-2">
                            {t("other.definition")}:
                          </span>
                          {definition}
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
                        <p>
                          <span className={"font-bold mr-2"}>
                            {t("other.decomposition")}:
                          </span>
                          {decomposition}
                        </p>
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
                    </div>
                  }
                </li>
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
