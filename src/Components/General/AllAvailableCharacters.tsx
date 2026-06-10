import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { clearText } from "../../Aux/previewerFunctions";
import Input from "../Form/Input";
import InputWLabel from "../Form/InputWLabel";

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

          if (searchTerm === cleanedSearchTerm) {
            return cleanedSearchTerm === cleanedPinyin;
          } else {
            return searchTerm === pinyin;
          }
        })
      : charactersInfo;

  // We can sort the characters alphabetically by their pinyin to make it easier for users to find them.
  filteredCharacters.sort((a: any, b: any) => {
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
      className="p-4 min-h-screen h-full min-w-[300px] w-[30%] "
    >
      <div className="p-4 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">{t("allCharModal.title")}</h1>
        <p className="mt-2">{t("allCharModal.description")}</p>
        <p className="mt-2 mb-2">{t("allCharModal.instruction")}</p>

        <div>
          <InputWLabel
            text={t("allCharModal.search")}
            type="text"
            id="allChar-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          {uniquePinyins.length > 0 && (
            <div className="mt-4">
              <p>{t("allCharModal.pinyinTones")}</p>
              <div className="flex flex-row flex-wrap gap-2 mt-2">
                {uniquePinyins.map((pinyin: any, index: number) => (
                  <button
                    type="button"
                    key={pinyin + index}
                    className="border border-gray-300 p-2 rounded"
                    onClick={() => setSearchTerm(pinyin)}
                  >
                    {pinyin}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4">
          {filteredCharacters.map((charInfo: any) => (
            <button
              key={charInfo.character}
              className="flex flex-col items-center"
              type="button"
              onClick={() => handleCLick(charInfo.character)}
            >
              <div className="text-2xl">{charInfo.character}</div>
              <div className="text-sm text-gray-600">{charInfo.pinyin}</div>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="p-4"
          commandfor="all-characters-dialog"
          command="close"
        >
          Close
        </button>
      </div>
    </dialog>
  );
}

export default AllAvailableCharacters;
