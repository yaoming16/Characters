import Input from "./Input";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";

interface RadioModProps {
  options: string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function RadioMod({ options, onChange } : RadioModProps) {
  // We Use UseRef so the inputs don´t reRender when the user changes the selected grid. This is to stop a bug that consisted in that the user selected option didnt show correctly in the interface
  let inputs = useRef(
    options.map((option : string) => (
      <div className=" flex flex-row max-w-[75px] mr-5" key={uuidv4()}>
        <label htmlFor={option} className="mr-2">
          <img src={option} className="object-cover" />
        </label>
        <Input
          type="radio"
          id={option}
          name={"grid-input"}
          onChange={onChange}
          value={option}
        ></Input>
      </div>
    ))
  );
  return <>{inputs.current}</>;
}

export default RadioMod;
