import { Label, Checkbox } from "flowbite-react";
import type { CheckboxModOption } from "../../Types/types";

interface CheckboxModProps {
  options: CheckboxModOption[];
}

export default function CheckboxMod({ options }: CheckboxModProps) {

  return (
    <div className="flex flex-col justify-around">
      {options.map((option: CheckboxModOption, index: number) => (
          <div
            className="flex flex-row justify-between mt-5 items-center"
            key={option.text + "-checkbox-" + index}
          >
            <Label
              htmlFor={option.text + "-" + index}
              className="dark:text-black mr-2"
            >
              {option.text}
            </Label>
            <Checkbox
              id={option.text + "-" + index}
              onChange={(e) => {
                option.setFunction(e.target.checked);
              }}
              checked={option.checked}
            ></Checkbox>
          </div>
      ))}
    </div>
  );
}
