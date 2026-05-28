import InputWLabel from "../Components/Form/InputWLabel";
import type {
  allNumberInputsStatesType,
  NumberInputInfoType,
} from "../Types/types";

/* Function to check if conditions are met for the input value. Then change the values and the warning */
export function checkNumbers(
  setFunction: React.Dispatch<React.SetStateAction<number>>,
  newState: number,
  setWarning: React.Dispatch<React.SetStateAction<boolean>>,
  minVal = 1,
  maxVal = Infinity,
): void {
  /* state is a number above minVal and below maxVal */
  if (newState >= minVal && !isNaN(newState) && newState <= maxVal) {
    setWarning(false);
  } else {
    setWarning(true);
  }
  setFunction(newState);
}

/* We pass as parameters the states for the input values and the warning. 
  We also pass the min, max, label of the input, warning text and the key of the input to know which state we have to change. All is passed as an object. 
  */

export function inputsHTML(
  infoArray: NumberInputInfoType[],
  allNumberInputsStates: allNumberInputsStatesType,
) {
  return infoArray.map((inputInfo, index) => (
    <InputWLabel
      className="mt-3"
      id={inputInfo.text}
      key={`${inputInfo.text}-input-${index}`}
      type="number"
      onChange={(e) =>
        checkNumbers(
          allNumberInputsStates[inputInfo.name].setValue,
          parseInt(e.target.value),
          allNumberInputsStates[inputInfo.name].setWarning,
          inputInfo.minVal,
          inputInfo.maxVal,
        )
      }
      step={
        // If opacity input set step to 10 else 1
        inputInfo.text === "Letter Opacity" ? "10" : "1"
      }
      text={inputInfo.text}
      value={allNumberInputsStates[inputInfo.name].value}
      warning={allNumberInputsStates[inputInfo.name].warning}
      warningMessage={inputInfo.warningText}
    ></InputWLabel>
  ));
}
