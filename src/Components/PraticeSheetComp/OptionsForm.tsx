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
import Recommendations from "../General/Recommendations";

import type {
  CheckboxModOption,
} from "../../Types/types";

import {
  createMainInputsInfo,
  createStyleInputsInfo,
  createExtraOptionsInputsInfo,
  fontInfo,
  gridOptions,
} from "../../Aux/InputsInfo";

import { inputsHTML } from "../../Aux/optionsFormFunctions";
import { usePracticeSheet } from "../../context/PracticePageContext";

interface OptionsFormProps {
  className?: string;
  charactersInfoResponse: any;
}

function OptionsForm({
  className,
  charactersInfoResponse,
}: OptionsFormProps) {
  const { t } = useTranslation("global");
  const ps = usePracticeSheet();

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
    gridName,
    showDefinition,
    showPinyin,
    showRadical,
    showDecomposition,
    showStrokesOrder,
    titleItalic,
    titleBold,
    titleUnderline,
    separationLine,
    characters,
    numberOfRowsPerCharacter,
    numberOfSquaresPerRow,
  } = ps;

  

  const mainCheckboxOptions: CheckboxModOption[] = [
    {
      checked: showDefinition,
      setFunction: setShowDefinition,
      text: t("optionsForm.otherInputsText.showDefinition"),
    },
    {
      checked: showPinyin,
      setFunction: setShowPinyin,
      text: t("optionsForm.otherInputsText.showPinyin"),
    },
    {
      checked: showRadical,
      setFunction: setShowRadical,
      text: t("optionsForm.otherInputsText.showRadical"),
    },
    {
      checked: showDecomposition,
      setFunction: setShowDecomposition,
      text: t("optionsForm.otherInputsText.showDecomposition"),
    },
    {
      checked: showStrokesOrder,
      setFunction: setShowStrokesOrder,
      text: t("optionsForm.otherInputsText.showStrokesOrder"),
    },
  ];

  const titleCheckboxOptions: CheckboxModOption[] = [
    {
      checked: titleItalic,
      setFunction: setTitleItalic,
      text: t("optionsForm.otherInputsText.italic"),
    },
    {
      checked: titleBold,
      setFunction: setTitleBold,
      text: t("optionsForm.otherInputsText.bold"),
    },
    {
      checked: titleUnderline,
      setFunction: setTitleUnderline,
      text: t("optionsForm.otherInputsText.underline"),
    },
  ];

  const otherCheckboxOptions: CheckboxModOption[] = [
    {
      checked: separationLine,
      setFunction: setSeparationLine,
      text: t("optionsForm.otherInputsText.separationLine"),
    },
  ];

  const pinyinDic = charactersInfoResponse.pinyinDic;

  //Create main input information array using the function from the aux file.
  const mainInputsInfo = createMainInputsInfo(
    numberOfSquaresPerRow,
    numberOfRowsPerCharacter,
    t,
  );
  const styleInputsInfo = createStyleInputsInfo(t);
  const extraOptionsInputsInfo = createExtraOptionsInputsInfo(t);


  return (
    <div className={`${className ?? ""} space-y-6 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:p-6 lg:p-0 lg:border-0 lg:bg-transparent lg:shadow-none lg:backdrop-blur-0`}>
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          {t("optionsForm.titles.main")}
        </h2>
        <p className="text-sm text-slate-500 sm:text-base">
          {t("main.optionsDescription")}
        </p>
      </div>

      <div className="grid gap-4">
        <InputWLabel
          type="text"
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          value={characters}
          onChange={(e) => setCharacters(e.target.value.trim())}
          text={t("optionsForm.otherInputsText.charactersInput")}
          id="CharactersInput"
          lang="zh-CN"
        ></InputWLabel>

        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-3 sm:p-4">
          <Recommendations
            characters={characters}
            pinyinDic={pinyinDic}
            setCharacters={setCharacters}
          ></Recommendations>
        </div>

        <InputWLabel
          type="text"
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          onChange={(e) => setTitle(e.target.value.trim())}
          text={t("optionsForm.otherInputsText.titleInput")}
          id="TitleInput"
        ></InputWLabel>
      </div>

      {/* Main options */}
      <Accordion className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" alwaysOpen={false}>
        <AccordionPanel className="border-0">
          <AccordionTitle className="rounded-none border-0 bg-gradient-to-r from-slate-50 to-white px-4 py-4 text-left text-base font-semibold text-slate-900 hover:bg-slate-50 focus:ring-0 sm:px-5">
            {t("optionsForm.accordionTitles.mainOptions")}
          </AccordionTitle>
          <AccordionContent className="bg-white px-4 py-5 sm:px-5">
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                {inputsHTML(mainInputsInfo, ps)}
              </div>

              <SelectMod
                setFunction={setFont}
                selectInfo={fontInfo}
                label={t("optionsForm.otherInputsText.fontSelect")}
                id="fontSelect"
              />

              <fieldset className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <legend className="mx-auto px-3 text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {t("optionsForm.otherInputsText.gridType")}
                </legend>
                <div className="mt-4">
                  <RadioMod
                    options={gridOptions}
                    currentValue={gridName}
                    onChange={(e) => setGridName(e.target.value)}
                  ></RadioMod>
                </div>
              </fieldset>

              {!charactersInfoResponse.loading &&
              !charactersInfoResponse.error ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                  <CheckboxMod options={mainCheckboxOptions}></CheckboxMod>
                </div>
              ) : null}
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>

      {/* Title options */}
      <Accordion className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" alwaysOpen={false}>
        <AccordionPanel className="border-0">
          <AccordionTitle className="rounded-none border-0 bg-gradient-to-r from-slate-50 to-white px-4 py-4 text-left text-base font-semibold text-slate-900 hover:bg-slate-50 focus:ring-0 sm:px-5">
            {t("optionsForm.accordionTitles.styleOptions")}
          </AccordionTitle>
          <AccordionContent className="bg-white px-4 py-5 sm:px-5">
            <div className="space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {t("optionsForm.titles.titleOptions")}
            </h3>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                {inputsHTML(styleInputsInfo, ps)}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {t("optionsForm.titles.otherOptions")}
                </h3>
                <CheckboxMod options={titleCheckboxOptions}></CheckboxMod>
                <div className="mt-5">
                  <CheckboxMod options={otherCheckboxOptions}></CheckboxMod>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>

      {/* Here are the advanced options (Like margins and column and row spacing) */}
      <Accordion className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" alwaysOpen={false}>
        <AccordionPanel className="border-0">
          <AccordionTitle className="rounded-none border-0 bg-gradient-to-r from-slate-50 to-white px-4 py-4 text-left text-base font-semibold text-slate-900 hover:bg-slate-50 focus:ring-0 sm:px-5">
            {t("optionsForm.accordionTitles.advancedOptions")}
          </AccordionTitle>
          <AccordionContent className="bg-white px-4 py-5 sm:px-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              {inputsHTML(extraOptionsInputsInfo, ps)}
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  );
}

export default OptionsForm;
