import { Label } from "flowbite-react";
import PropTypes from "prop-types";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function SelectMod({ setFunction, selectInfo, id }) {
  // We Use UseRef so the options don´t reRender when the user changes the font. This is to stop a bug that consisted in that the user selected option didt show correctly in the interface
  let options = useRef(
    selectInfo.values.map((value, index) => (
      <option
        key={uuidv4()}
        className="dark:text-black"
        value={value}
        style={{
          fontFamily: value,
          fontSize: "16px",
        }}
      >
        {selectInfo.text[index]}
      </option>
    ))
  );

  return (
    <div
      className="max-w-md bg-gray-50 mt-3"
      style={{ backgroundColor: "#f9fafb" }}
    >
      <Label
        htmlFor={id}
        value="Select the font"
        className="text-black"
        style={{ color: "black" }}
      />

      <select
        id={id}
        className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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

SelectMod.propTypes = {
  setFunction: PropTypes.func.isRequired,
  selectInfo: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default SelectMod;
