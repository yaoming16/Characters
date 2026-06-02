import InputWLabel from "../Components/Form/InputWLabel";
import type {
  NumberInputInfoType,
  PracticeSheetContextType
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

function capitalizeFirstLetter(str : string): string {
  if (!str) return str; // Handle empty strings safely
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* We pass as parameters the states for the input values and the warning (on the context ps)
  We also pass the min, max, label of the input, warning text and the key of the input to know which state we have to change. All is passed as an object. 
  */

export function inputsHTML(
  infoArray: NumberInputInfoType[],
  ps: PracticeSheetContextType,
) {
  return infoArray.map((inputInfo, index) => {
    const setKey = (`set${capitalizeFirstLetter(
      inputInfo.name as string,
    )}`) as keyof PracticeSheetContextType;
    const setWarningKey = (`set${capitalizeFirstLetter(
      inputInfo.warningName as string,
    )}`) as keyof PracticeSheetContextType;

    const setFunc = ps[setKey] as React.Dispatch<React.SetStateAction<number>>;
    const setWarn = ps[setWarningKey] as React.Dispatch<React.SetStateAction<boolean>>;

    const value = ps[inputInfo.name] as number;
    const warning = ps[inputInfo.warningName] as boolean;

    return (
      <InputWLabel
        className="mt-3"
        id={inputInfo.text}
        key={`${inputInfo.text}-input-${index}`}
        type="number"
        onChange={(e) =>
          checkNumbers(
            setFunc,
            parseInt(e.target.value),
            setWarn,
            inputInfo.minVal,
            inputInfo.maxVal,
          )
        }
        step={
          // If opacity input set step to 10 else 1
          inputInfo.text === "Letter Opacity" ? "10" : "1"
        }
        text={inputInfo.text}
        value={value}
        warning={warning}
        warningMessage={inputInfo.warningText}
      ></InputWLabel>
    );
  });
}
