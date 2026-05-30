import { Label } from "flowbite-react";
import { useRef } from "react";

interface SelectModProps {
  setFunction: React.Dispatch<React.SetStateAction<string>>;
  selectInfo: {
    values: string[];
    text: string[];
  };
  label: string;
  id: string;
}

function SelectMod({ setFunction, selectInfo, id, label }: SelectModProps) {
  // We Use UseRef so the options don´t reRender when the user changes the font. This is to stop a bug that consisted in that the user selected option didt show correctly in the interface
  let options = useRef(
    selectInfo.values.map((value, index) => (
      <option
        key={value + index}
        className="dark:text-black"
        value={value}
        style={{
          fontFamily: value,
          fontSize: "16px",
        }}
      >
        {selectInfo.text[index]}
      </option>
    )),
  );

  return (
    <div
      className="max-w-md bg-gray-50 mt-3"
      style={{ backgroundColor: "#f9fafb" }}
    >
      <Label htmlFor={id} className="text-black">
        {label}
      </Label>

      <select
        id={id}
        className="w-full mt-2 p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        style={{
          backgroundColor: "#f9fafb",
          color: "#111827",
          borderColor: "#d1d5db",
        }}
        onChange={(e) => setFunction(e.target.value)}
      >
        {options.current}
      </select>
    </div>
  );
}

export default SelectMod;
