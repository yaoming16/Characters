import React, { useRef } from "react";
import { Label, Checkbox } from "flowbite-react";
import { v4 as uuidv4 } from "uuid";

interface CheckboxModProps {
  setFunctions: React.Dispatch<React.SetStateAction<boolean>>[];
  texts: string[];
}

export default function CheckboxMod ({ setFunctions, texts }: CheckboxModProps) {
  let checkboxsToReturn = useRef(
    setFunctions.map((setFunction: React.Dispatch<React.SetStateAction<boolean>>, index : number) => (
      <div
        className="flex flex-row justify-between mt-5 items-center"
        key={uuidv4()}
      >
        <Label
          htmlFor={"showDefinitionInput" + index}
          className="dark:text-black mr-2"
        >
          {texts[index]}
        </Label>
        <Checkbox
          id={"showDefinitionInput" + index}
          onChange={(e) => setFunction(e.target.checked)}
        ></Checkbox>
      </div>
    ))
  );
  return <>{checkboxsToReturn.current}</>;
}
