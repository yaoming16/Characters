import InputWLabel from "./Form/InputWLabel";
import { Accordion } from "flowbite-react";
import SelectMod from "./Form/SelectMod";
import RadioMod from "./Form/RadioMod";
import CheckboxMod from "./Form/CheckboxMod";

// Tuple type for each allNumberInputsStates element
type allNumberInputsStatesType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  number,
  React.Dispatch<React.SetStateAction<number>>
];

type OtherSetFunctionsType = [
  React.Dispatch<React.SetStateAction<string>>, // setCharacters
  React.Dispatch<React.SetStateAction<string>>, // setFont
  React.Dispatch<React.SetStateAction<string>>, // setGridName
  React.Dispatch<React.SetStateAction<boolean>>, // setShowDefinition
  React.Dispatch<React.SetStateAction<boolean>>, // setShowPinyin
  React.Dispatch<React.SetStateAction<boolean>>  // setShowStrokesOrder
];

interface OptionsFormProps {
  className?: string;
  allNumberInputsStates: allNumberInputsStatesType[];
  otherSetFunctions: OtherSetFunctionsType;
}

function OptionsForm({
  className,
  allNumberInputsStates,
  otherSetFunctions,
}: OptionsFormProps) {
  let [setCharacters, setFont, setGridName, setShowDefinition, setShowPinyin, setShowStrokesOrder] =
    otherSetFunctions;

  /* Function to check if conditions are met for the input value. Then change the values and the warning */
  function checkNumbers(
    setFunction: React.Dispatch<React.SetStateAction<number>>,
    newState: number,
    setWarning: React.Dispatch<React.SetStateAction<boolean>>,
    minVal = 1,
    maxVal = Infinity
  ): void {
    /* state is a number and above 0 */
    if (newState >= minVal && !isNaN(newState) && newState <= maxVal) {
      setWarning(false);
    } else {
      setWarning(true);
    }
    setFunction(newState);
  }

  //Function to change the value on the input on change. If the value is not valid return empty string to clear the input
  /*
  function valueNumberInput(newState: number): number | string {
    if (newState >= 0 && !isNaN(newState)) {
      return newState;
    } else {
      return "";
    }
  }
*/

  /* allNumberInputsStates contains the states needed fot all number inputs as follows
          index 0: warning
          index 1: setWarning
          index 2: value needed  (state)
          index 3: setState 
      This function return the HTML for the input from the arry with the info of the desired input. The array must be of the format described above*/
  function inputsHTML(
    infoArray: allNumberInputsStatesType[],
    textsArray: string[],
    warningTexts: string[],
    minVal: number[]
  ) {
    return infoArray.map((arrayWithInputStates, index) => (
      <InputWLabel
        className="mt-3"
        id={textsArray[index]}
        key={`${textsArray[index]}-input-${index}`}
        type="number"
        onChange={(e) =>
          checkNumbers(
            arrayWithInputStates[3],
            parseInt(e.target.value),
            arrayWithInputStates[1],
            minVal[index],
            textsArray[index] === "Letter Opacity"
              ? 100
              : textsArray[index] === "Practice Lines"
              ? allNumberInputsStates[1][2]
              : Infinity
          )
        }
        step={
          // If opacity input set step to 10 else 1
          textsArray[index] === "Letter Opacity" ? "10" : "1"
        }
        text={textsArray[index]}
        value={arrayWithInputStates[2]}
        warning={arrayWithInputStates[0]}
        warningMessage={warningTexts[index]}
      ></InputWLabel>
    ));
  }

  // Mins for inputs
  const minValues = [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0];

  // warnings texts
  let warningTexts = [
    "Enter a number greater than or equal to 1",
    "Enter a number greater than or equal to 1",
    "Enter a number greater than or equal to 0",
    "Enter a number greater than or equal to 1 and less than or equal to Rows Per Character",
    "Enter a number between 0 and 100",
    "Enter a number greater than or equal to 0",
    "Enter a number greater than or equal to 0",
    "Enter a number greater than or equal to 0",
    "Enter a number greater than or equal to 0",
    "Enter a number greater than or equal to 0",
    "Enter a number greater than or equal to 0",
  ];

  // Text for all inputs
  let numberInputTexts = [
    "Boxes Per Row",
    "Rows Per Character",
    "Practice Squares per line",
    "Practice Lines",
    "Letter Opacity",
    "Margin Left",
    "Margin Right",
    "Margin Top",
    "Margin Bottom",
    "Row Spacing",
    "Column Spacing",
  ];

  let fontInfo = {
    text: [" FangSong (欢迎)", "Kaiti (欢迎)", "SimSun (欢迎)"],
    values: [`FangSong`, `KaiTi`, `SimSun`],
  };

  // A list with the name of all the grid options/files
  let gridOptions = ["basic-grid.jpg", "cross.jpg", "square.jpg"];

  return (
    <div className={className}>
      <h2>Characters</h2>

      {/* Input for Characters */}
      <InputWLabel
        type="text"
        className=""
        onChange={(e) => setCharacters(e.target.value.trim())}
        text="Enter the characters you wish to practice"
        id="CharactersInput"
      ></InputWLabel>

      {/* We need to have two arrays, one with the info of the important array and another with the one with the advance options. This is needed to put the advanced option in an acordeon
      That is why we will call two times inputsHTML depending which inputs we want to show in that part*/}

      {inputsHTML(
        allNumberInputsStates.slice(0, 4),
        numberInputTexts.slice(0, 4),
        warningTexts.slice(0, 4),
        minValues.slice(0, 4)
      )}

      {/* We will add some other option 
      First one is to change the font*/}

      <SelectMod setFunction={setFont} selectInfo={fontInfo} id="fontSelect" />

      {/* We want an options to be able to select the bg grid */}
      <fieldset className="flex flex-row justify-evenly mt-5 border-1 p-5">
        <legend className="mb-5 text-center">Select the grid type</legend>
        <RadioMod
          options={gridOptions}
          onChange={(e) => setGridName(e.target.value)}
        ></RadioMod>
      </fieldset>

      {/* Now we need an option  so the user can show te definition of the character or the pinyin*/}
      <div className="flex flex-row justify-around">
        <CheckboxMod
          setFunctions={[setShowDefinition, setShowPinyin, setShowStrokesOrder]}
          texts={["Show definition", "Show Pinyin", "Show Strokes Order"]}
        ></CheckboxMod>
      </div>

      {/* Here are the advanced options (Like margins and column and row spacing) */}
      <Accordion
        className="mt-10 bg-white "
        alwaysOpen={false}
        collapseAll={true}
      >
        <Accordion.Panel className="">
          <Accordion.Title className="text-center bg-white dark:text-black text-black dark:bg-white dark:hover:bg-grey-500  dark:focus:ring-gray-100 dark:focus:bg-white ">
            Advanced Options
          </Accordion.Title>
          <Accordion.Content className="dark:bg-white">
            {/*  Here we add the other inputs, for this options the minVal is 0 so we will specify to override the 1 default minVal*/}
            {inputsHTML(
              allNumberInputsStates.slice(4),
              numberInputTexts.slice(4),
              warningTexts.slice(4),
              minValues.slice(4)
            )}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}

export default OptionsForm;
