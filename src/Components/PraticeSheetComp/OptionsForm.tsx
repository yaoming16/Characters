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
  CheckboxModOption,
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
  checkboxStates: {
    showDefinition: boolean;
    showPinyin: boolean;
    showRadical: boolean;
    showDecomposition: boolean;
    showStrokesOrder: boolean;
    titleItalic: boolean;
    titleBold: boolean;
    titleUnderline: boolean;
    separationLine: boolean;
  };
  characters: string;
  charactersInfoResponse: any;
  pinyinDic: any;
}

function OptionsForm({
  className,
  allNumberInputsStates,
  otherSetFunctions,
  checkboxStates,
  charactersInfoResponse,
  characters,
  pinyinDic,
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

  const mainCheckboxOptions: CheckboxModOption[] = [
    {
      checked: checkboxStates.showDefinition,
      setFunction: setShowDefinition,
      text: t("optionsForm.otherInputsText.showDefinition"),
    },
    {
      checked: checkboxStates.showPinyin,
      setFunction: setShowPinyin,
      text: t("optionsForm.otherInputsText.showPinyin"),
    },
    {
      checked: checkboxStates.showRadical,
      setFunction: setShowRadical,
      text: t("optionsForm.otherInputsText.showRadical"),
    },
    {
      checked: checkboxStates.showDecomposition,
      setFunction: setShowDecomposition,
      text: t("optionsForm.otherInputsText.showDecomposition"),
    },
    {
      checked: checkboxStates.showStrokesOrder,
      setFunction: setShowStrokesOrder,
      text: t("optionsForm.otherInputsText.showStrokesOrder"),
    },
  ];

  const titleCheckboxOptions: CheckboxModOption[] = [
    {
      checked: checkboxStates.titleItalic,
      setFunction: setTitleItalic,
      text: t("optionsForm.otherInputsText.italic"),
    },
    {
      checked: checkboxStates.titleBold,
      setFunction: setTitleBold,
      text: t("optionsForm.otherInputsText.bold"),
    },
    {
      checked: checkboxStates.titleUnderline,
      setFunction: setTitleUnderline,
      text: t("optionsForm.otherInputsText.underline"),
    },
  ];

  const otherCheckboxOptions: CheckboxModOption[] = [
    {
      checked: checkboxStates.separationLine,
      setFunction: setSeparationLine,
      text: t("optionsForm.otherInputsText.separationLine"),
    },
  ];

  //Create main input information array using the function from the aux file.
  const mainInputsInfo = createMainInputsInfo(allNumberInputsStates, t);
  const styleInputsInfo = createStyleInputsInfo(t);
  const extraOptionsInputsInfo = createExtraOptionsInputsInfo(t);

  //Function to get recommendations
  function getRecommendations() {
    let recommendations = [];
    if (pinyinDic && pinyinDic[characters]) {
      recommendations = pinyinDic[characters];
    }
    return recommendations;
  }

  return (
    <div className={className}>
      <h2>{t("optionsForm.titles.main")}</h2>
      {getRecommendations().length > 0 && <div>{getRecommendations()}</div>}

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
              <CheckboxMod options={mainCheckboxOptions}></CheckboxMod>
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
            <CheckboxMod options={titleCheckboxOptions}></CheckboxMod>
            <h3 className="mt-5 text-center">
              {t("optionsForm.titles.otherOptions")}
            </h3>
            <CheckboxMod options={otherCheckboxOptions}></CheckboxMod>
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
