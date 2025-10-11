import { useRef } from "react";
import { Label, Checkbox } from "flowbite-react";
import { v4 as uuidv4 } from "uuid";

export default function CheckboxMod({ setFunctions, texts }) {
  let checkboxsToReturn = useRef(
    setFunctions.map((setFunction, index) => (
      <div className="flex flex-row mt-5" key={uuidv4()}>
        <Label
          htmlFor="showDefinitionInput"
          label="Show definition"
          className="dark:text-black mr-2"
        >
          {texts[index]}
        </Label>
        <Checkbox
          id="showDefinitionInput"
          onChange={(e) => setFunction(e.target.checked)}
        ></Checkbox>
      </div>
    ))
  );
  return <>{checkboxsToReturn.current}</>;
}
