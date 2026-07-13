import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { clearText } from "../../Aux/previewerFunctions";
import InputWLabel from "../Form/InputWLabel";
import Accordion from "./Accordion";

interface AllAvailableCharactersProps {
  charactersInfo: any;
  setCharacters: Dispatch<SetStateAction<string>>;
}

function AllAvailableCharacters({
  charactersInfo,
  setCharacters,
}: AllAvailableCharactersProps) {
  const { t } = useTranslation("global");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  function handleCLick(character: string) {
    setCharacters((prevState) => prevState + character);
    dialogRef.current?.close();
  }

  // We need to remove the accents from the pinyin and also any non-alphanumeric characters to make the search more flexible. For example, searching for "ma" should match "mǎ", "mà", "mā", etc.
  const filteredCharacters =
    searchTerm !== ""
      ? charactersInfo.filter((charInfo: any) => {
          const pinyin = charInfo.pinyin[0];
          const cleanedPinyin = clearText(pinyin);
          const cleanedSearchTerm = clearText(searchTerm);

          if (searchTerm.trim() === cleanedSearchTerm) {
            if (searchTerm.endsWith(" ")) {
              return cleanedPinyin === cleanedSearchTerm;
            }
            return cleanedPinyin
              ? cleanedPinyin.startsWith(cleanedSearchTerm)
              : false;
          } else {
            if (searchTerm.endsWith(" ")) {
              return pinyin === searchTerm;
            }
            return pinyin ? pinyin.startsWith(searchTerm) : false;
          }
        })
      : charactersInfo;

  // We can sort the characters alphabetically by their pinyin to make it easier for users to find them.
  const sortedCharacters = [...filteredCharacters].sort((a: any, b: any) => {
    const pinyinA = clearText(a.pinyin[0]);
    const pinyinB = clearText(b.pinyin[0]);
    if (pinyinA < pinyinB) return -1;
    if (pinyinA > pinyinB) return 1;
    return 0;
  });

  // We need to filter unique pinyings from the filtered array to get all available tones for the pinyin search
  const uniquePinyins =
    searchTerm !== ""
      ? [
          ...new Set(
            filteredCharacters.map((charInfo: any) => charInfo.pinyin[0]),
          ),
        ]
      : [];

  return (
    <dialog
      id="all-characters-dialog"
      ref={dialogRef}
      closedby="any"
      className="m-auto w-[min(92vw,72rem)] max-h-[88vh] overflow-hidden rounded-3xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/50"
    >
      <div className="flex max-h-[88vh] flex-col bg-gradient-to-b from-slate-50 to-white">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                {t("allCharModal.title")}
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {t("allCharModal.title")}
              </h1>
            </div>
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
              commandfor="all-characters-dialog"
              command="close"
            >
              {t("allCharModal.close")}
            </button>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            {t("allCharModal.description")}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {t("allCharModal.instruction")}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
          <div className="max-w-xl">
            <InputWLabel
              text={t("allCharModal.search")}
              type="text"
              id="allChar-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="mt-5">
            {uniquePinyins.length > 0 && (
              <Accordion
                className="border-slate-200 bg-white shadow-sm"
                titleStyle="text-sm font-semibold text-slate-800"
                title={t("allCharModal.pinyinTones")}
              >
                <div className="mt-2 flex flex-wrap gap-2">
                  {uniquePinyins.map((pinyin: any, index: number) => (
                    <button
                      type="button"
                      key={pinyin + index}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800"
                      onClick={() => setSearchTerm(pinyin)}
                    >
                      {pinyin}
                    </button>
                  ))}
                </div>
              </Accordion>
            )}
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm text-slate-600">
                {t("allCharModal.results", {
                  count: sortedCharacters.length,
                })}
              </p>
              {searchTerm && (
                <button
                  type="button"
                  className="text-sm font-medium text-sky-700 transition hover:text-sky-900"
                  onClick={() => setSearchTerm("")}
                >
                  {t("allCharModal.clearSearch")}
                </button>
              )}
            </div>

            {sortedCharacters.length > 0 ? (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
                {sortedCharacters.map((charInfo: any) => (
                  <button
                    key={charInfo.character}
                    className="group flex flex-col items-center gap-1 rounded-2xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                    type="button"
                    onClick={() => handleCLick(charInfo.character)}
                  >
                    <div className="text-3xl leading-none text-slate-900 transition group-hover:text-sky-800">
                      {charInfo.character}
                    </div>
                    <div className="text-xs font-medium uppercase tracking-wide text-slate-500 transition group-hover:text-sky-700">
                      {charInfo.pinyin}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                {t("allCharModal.noResults")}
              </div>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default AllAvailableCharacters;
