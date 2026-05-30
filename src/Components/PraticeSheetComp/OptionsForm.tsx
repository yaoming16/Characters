import InputWLabel from "../Form/InputWLabel";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

import SelectMod from "../Form/SelectMod";
import RadioMod from "../Form/RadioMod";
import CheckboxMod from "../Form/CheckboxMod";

import type {
  OtherSetFunctions,
  allNumberInputsStatesType,
} from "../../Types/types";

import {
  createMainInputsInfo,
  createStyleInputsInfo,
  createExtraOptionsInputsInfo,
  fontInfo,
  gridOptions,
} from "../../Aux/InputsInfo";

import { inputsHTML } from "../../Aux/optionsFormFunctions";

interface OptionsFormProps {
  className?: string;
  allNumberInputsStates: allNumberInputsStatesType;
  otherSetFunctions: OtherSetFunctions;
  characters: string;
  charactersInfoResponse: any;
}

function OptionsForm({
  className,
  allNumberInputsStates,
  otherSetFunctions,
  charactersInfoResponse,
  characters,
}: OptionsFormProps) {
  const { t } = useTranslation("global");

  const {
    setCharacters,
    setFont,
    setGridName,
    setShowDefinition,
    setShowPinyin,
    setShowStrokesOrder,
    setShowRadical,
    setShowDecomposition,
    setTitle,
    setTitleItalic,
    setTitleBold,
    setTitleUnderline,
    setSeparationLine,
  } = otherSetFunctions;

  //Create main input information array using the function from the aux file.
  const mainInputsInfo = createMainInputsInfo(allNumberInputsStates, t);
  const styleInputsInfo = createStyleInputsInfo(t);
  const extraOptionsInputsInfo = createExtraOptionsInputsInfo(t);

  return (
    <div className={className}>
      <h2>{t("optionsForm.titles.main")}</h2>

      <InputWLabel
        type="text"
        className=""
        value={characters}
        onChange={(e) => setCharacters(e.target.value.trim())}
        text={t("optionsForm.otherInputsText.charactersInput")}
        id="CharactersInput"
        lang="zh-CN"
      ></InputWLabel>

      {/* Title input */}
      <InputWLabel
        type="text"
        className="mt-3"
        onChange={(e) => setTitle(e.target.value.trim())}
        text={t("optionsForm.otherInputsText.titleInput")}
        id="TitleInput"
      ></InputWLabel>

      {/* Main options */}
      <Accordion className="mt-10 bg-white " alwaysOpen={false}>
        <AccordionPanel className="">
          <AccordionTitle className="text-center bg-white dark:text-black text-black dark:bg-white dark:hover:bg-grey-500  dark:focus:ring-gray-100 dark:focus:bg-white ">
            {t("optionsForm.accordionTitles.mainOptions")}
          </AccordionTitle>
          <AccordionContent className="dark:bg-white">
            {/* Input for Characters */}
            {inputsHTML(mainInputsInfo, allNumberInputsStates)}

            {/* We will add some other option 
      First one is to change the font*/}
            <SelectMod
              setFunction={setFont}
              selectInfo={fontInfo}
              label={t("optionsForm.otherInputsText.fontSelect")}
              id="fontSelect"
            />

            {/* We want an options to be able to select the bg grid */}
            <fieldset className="flex flex-row justify-evenly mt-5 border-1 p-5">
              <legend className="mb-5 text-center">
                {t("optionsForm.otherInputsText.gridType")}
              </legend>
              <RadioMod
                options={gridOptions}
                onChange={(e) => setGridName(e.target.value)}
              ></RadioMod>
            </fieldset>

            {/* Now we need an option  so the user can show te definition of the character,the pinyin or stroke order*/}
            {!charactersInfoResponse.loading &&
            !charactersInfoResponse.error ? (
              <CheckboxMod
                setFunctions={[
                  setShowDefinition,
                  setShowPinyin,
                  setShowRadical,
                  setShowDecomposition,
                  setShowStrokesOrder,
                ]}
                texts={[
                  t("optionsForm.otherInputsText.showDefinition"),
                  t("optionsForm.otherInputsText.showPinyin"),
                  t("optionsForm.otherInputsText.showRadical"),
                  t("optionsForm.otherInputsText.showDecomposition"),
                  t("optionsForm.otherInputsText.showStrokesOrder"),
                ]}
              ></CheckboxMod>
            ) : null}
          </AccordionContent>
        </AccordionPanel>
      </Accordion>

      {/* Title options */}
      <Accordion className="mt-10 bg-white " alwaysOpen={false}>
        <AccordionPanel className="">
          <AccordionTitle className="text-center bg-white dark:text-black text-black dark:bg-white dark:hover:bg-grey-500  dark:focus:ring-gray-100 dark:focus:bg-white ">
            {t("optionsForm.accordionTitles.styleOptions")}
          </AccordionTitle>
          <AccordionContent className="dark:bg-white">
            <h3 className="text-center">
              {t("optionsForm.titles.titleOptions")}
            </h3>
            {inputsHTML(styleInputsInfo, allNumberInputsStates)}
            {/* Bold, italic, undeline options*/}
            <CheckboxMod
              setFunctions={[setTitleItalic, setTitleBold, setTitleUnderline]}
              texts={[
                t("optionsForm.otherInputsText.italic"),
                t("optionsForm.otherInputsText.bold"),
                t("optionsForm.otherInputsText.underline"),
              ]}
            ></CheckboxMod>
            <h3 className="mt-5 text-center">
              {t("optionsForm.titles.otherOptions")}
            </h3>
            <CheckboxMod
              setFunctions={[setSeparationLine]}
              texts={[t("optionsForm.otherInputsText.separationLine")]}
            ></CheckboxMod>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>

      {/* Here are the advanced options (Like margins and column and row spacing) */}
      <Accordion className="mt-10 bg-white " alwaysOpen={false}>
        <AccordionPanel className="">
          <AccordionTitle className="text-center bg-white dark:text-black text-black dark:bg-white dark:hover:bg-grey-500  dark:focus:ring-gray-100 dark:focus:bg-white ">
            {t("optionsForm.accordionTitles.advancedOptions")}
          </AccordionTitle>
          <AccordionContent className="dark:bg-white">
            {/*  Here we add the other inputs */}
            {inputsHTML(extraOptionsInputsInfo, allNumberInputsStates)}
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  );
}

export default OptionsForm;
