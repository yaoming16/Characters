import { useTranslation } from "react-i18next";

interface AllAvailableCharactersProps {
  charactersInfo: any;
}

function AllAvailableCharacters({charactersInfo }: AllAvailableCharactersProps) {
  const { t } = useTranslation("global");

  return (
    <dialog id="all-characters-dialog" className="p-4 h-full w-[30%] ">
      <div className="p-4 min-h-screen">
        <h1>All Available Characters</h1>
        <p>This page will list all the characters available in the dictionary.</p>
        
        <div className="grid grid-cols-4 gap-4 mt-4">
          {charactersInfo.map((charInfo: any) => (
            <div key={charInfo.character} className="flex flex-col items-center">
              <div className="text-2xl">{charInfo.character}</div>
              <div className="text-sm text-gray-600">{charInfo.pinyin}</div>
            </div>
          ))}
        </div>
        <button type="button" className="p-4" commandfor="all-characters-dialog" command="close" >Close</button>
      </div>
    </dialog>
  );
}

export default AllAvailableCharacters;