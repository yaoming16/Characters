import { useTranslation } from "react-i18next";

import { useCharacterData } from "../../hooks/useCharacterData";
import { useState, useEffect } from "react";

import {
  allUsedCharacterInfo,
  createSVGStrokes,
  createOneAnimatedCharacterSVG,
  getPinyinOfDecomposition,
  decompositionNotToShowREGEX,
  addCharacterToSelection,
  removeCharacterFromSelection,
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

  const [selectedCharacter, setSelectedCharacter] = useState<string>(() => {
    return localStorage.getItem("selectedCharacters") ?? "";
  });

  const [stopAnimation, setStopAnimation] = useState(false);

  useEffect(() => {
    localStorage.setItem("selectedCharacters", selectedCharacter);
  }, [selectedCharacter]);

  if (loading || error) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_34%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_100%)] px-4 py-6 sm:px-6 lg:px-8">
        <Loading loading={loading} error={error} isDictionary={true} />
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.14),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col gap-5 border-b border-slate-200 px-5 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                {t("dictionary.heroKicker")}
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {t("dictionary.title")}
              </h1>
              <p className="text-sm leading-6 text-slate-600 sm:text-base">
                {t("dictionary.heroDescription")}
              </p>
            </div>

            <button
              type="button"
              commandfor="all-characters-dialog"
              command="show-modal"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              {t("allCharModal.openModal")}
            </button>
          </div>
        </section>

        <AllAvailableCharacters
          charactersInfo={charactersInfo}
          setCharacters={setSelectedCharacter}
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1.22fr)] lg:items-start xl:gap-8">
          <section className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
            <div className="space-y-5">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                  {t("dictionary.search")}
                </h2>
                <p className="text-sm text-slate-500">
                  {t("dictionary.searchDescription")}
                </p>
              </div>

              <form className="space-y-3">
                <InputWLabel
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
                  text={t("dictionary.search")}
                  id="dictionary-search"
                  type="text"
                  value={selectedCharacter}
                  onChange={(e) => setSelectedCharacter(e.target.value)}
                />
              </form>

              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-3 sm:p-4">
                <Recommendations
                  characters={selectedCharacter}
                  pinyinDic={pinyinDic}
                  setCharacters={setSelectedCharacter}
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                  {t("dictionary.selectionTitle")}
                </h2>
                <p className="text-sm text-slate-500">
                  {selectedCharacter
                    ? t("dictionary.selectionDescription")
                    : t("dictionary.empty")}
                </p>
              </div>
            </div>

            {selectedCharacter ? (
              <ul className="space-y-4">
                {selectedCharacter.split("").map((char, index) => {
                  const { pinyin, decomposition, radical } =
                    allUsedCharacterInfo(char, charactersInfo, errorMessages);

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
                    <Accordion
                      key={char + index}
                      title={`${t("dictionary.character")} ${char}`}
                    >
                      <li className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-5">
                        <div className="mb-4 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                              {t("dictionary.character")}: {char}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                              {t("dictionary.characterDetailsDescription")}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              removeCharacterFromSelection(
                                setSelectedCharacter,
                                char,
                              )
                            }
                            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
                          >
                            {t("dictionary.removeCharacter")}
                          </button>
                        </div>

                        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                            <div className="space-y-3 text-sm leading-6 text-slate-700">
                              <p>
                                <span className="mr-2 font-semibold text-slate-900">
                                  {t("other.definition")}:
                                </span>
                                {t(`definitions.${char}`)}
                              </p>
                              <p>
                                <span className="mr-2 font-semibold text-slate-900">
                                  {t("other.pinyin")}:
                                </span>
                                {pinyin}
                              </p>
                              <p>
                                <span className="mr-2 font-semibold text-slate-900">
                                  {t("other.radical")}:
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    radical
                                      ? addCharacterToSelection(
                                          setSelectedCharacter,
                                          radical,
                                        )
                                      : null
                                  }
                                  className="rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-800 transition hover:bg-sky-100 hover:text-sky-800"
                                >
                                  {radical}
                                </button>
                              </p>
                            </div>

                            <div className="space-y-2 text-sm leading-6 text-slate-700">
                              <p className="font-semibold text-slate-900">
                                {t("other.decomposition")}:
                              </p>
                              {decompositionsPinyin &&
                                decompositionCharacters &&
                                decompositionCharacters.map(
                                  (
                                    decompositionCharacter,
                                    decompositionIndex,
                                  ) => (
                                    <div
                                      key={`${decompositionCharacter}-decomposition-${decompositionIndex}`}
                                      className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                                    >
                                      {!decompositionNotToShowREGEX.test(
                                        decompositionCharacter,
                                      ) && (
                                        <>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              addCharacterToSelection(
                                                setSelectedCharacter,
                                                decompositionCharacter,
                                              )
                                            }
                                            className="font-semibold text-sky-700 transition hover:text-sky-900"
                                          >
                                            {decompositionCharacter}
                                          </button>
                                          <span className="text-xs text-slate-500 sm:text-sm">
                                            {decompositionCharacter !== "？"
                                              ? ` ${decompositionsPinyin[decompositionIndex]} - ${t(`definitions.${decompositionCharacter}`)}`
                                              : ` ${t("other.decompositionNotFound")}`}
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  ),
                                )}
                            </div>
                          </div>

                          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              {createSVGStrokes(
                                char,
                                characterSVGData,
                                true,
                                false,
                                t("other.strokesOrderNotFound"),
                              )}
                            </div>

                            <div className="flex flex-col flex-wrap gap-4 lg:flex-row lg:items-center lg:justify-between">
                              <div className="flex min-h-[6.5rem] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                {createOneAnimatedCharacterSVG(
                                  char,
                                  characterSVGData,
                                  t("other.strokesOrderNotFound"),
                                  stopAnimation,
                                )}
                              </div>

                              <label className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                                <input
                                  type="checkbox"
                                  id={`stop-animation-${char}`}
                                  checked={stopAnimation}
                                  onChange={() =>
                                    setStopAnimation(!stopAnimation)
                                  }
                                  className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                />
                                {t("dictionary.stopAnimation")}
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                    </Accordion>
                  );
                })}
              </ul>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                {t("dictionary.empty")}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default DictionaryPage;
