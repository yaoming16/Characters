import React, { useRef } from "react";
import { Label, Checkbox } from "flowbite-react";

interface CheckboxModProps {
  setFunctions: React.Dispatch<React.SetStateAction<boolean>>[];
  texts: string[];
}

export default function CheckboxMod ({ setFunctions, texts }: CheckboxModProps) {
  let checkboxsToReturn = useRef(
    <div className="flex flex-col justify-around">
      {
        setFunctions.map((setFunction: React.Dispatch<React.SetStateAction<boolean>>, index : number) => (
          <div
            className="flex flex-row justify-between mt-5 items-center"
            key={texts[index] + '-checkbox-' + index}
          >
            <Label
              htmlFor={texts[index] + '-' + index}
              className="dark:text-black mr-2"
            >
              {texts[index]}
            </Label>
            <Checkbox
              id={texts[index] + '-' + index}
              onChange={(e) => setFunction(e.target.checked)}
            ></Checkbox>
          </div>
        ))
      }
    </div>
  );
  return <>{checkboxsToReturn.current}</>;
}
